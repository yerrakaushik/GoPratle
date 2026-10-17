import Requirement from '../models/Requirement.js';
import { validateRequirement } from '../validators/requirementValidator.js';

// @desc    Create a new event requirement
// @route   POST /api/requirements
// @access  Public
export const createRequirement = async (req, res, next) => {
  try {
    const validationResult = validateRequirement(req.body);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed for requirement submission',
        errors: formattedErrors,
      });
    }

    const validData = validationResult.data;

    // Data hygiene: Strip unused category subdocuments so MongoDB retains only the chosen category's data
    const sanitizedPayload = {
      eventName: validData.eventName,
      eventType: validData.eventType,
      isDateRange: Boolean(validData.isDateRange),
      startDate: validData.startDate,
      endDate: validData.isDateRange ? validData.endDate : undefined,
      location: validData.location,
      venue: validData.venue || '',
      category: validData.category,
      contactName: validData.contactName || '',
      contactEmail: validData.contactEmail || '',
      contactPhone: validData.contactPhone || '',
    };

    if (validData.category === 'planner') {
      sanitizedPayload.plannerDetails = validData.plannerDetails;
    } else if (validData.category === 'performer') {
      sanitizedPayload.performerDetails = validData.performerDetails;
    } else if (validData.category === 'crew') {
      sanitizedPayload.crewDetails = validData.crewDetails;
    }

    const requirement = await Requirement.create(sanitizedPayload);

    return res.status(201).json({
      success: true,
      message: `Requirement successfully posted under category '${validData.category}'`,
      data: requirement,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Mongoose schema validation failed',
        errors: messages,
      });
    }
    next(error);
  }
};

// @desc    Get all requirements with optional category filtering, search, and pagination
// @route   GET /api/requirements
// @access  Public
export const getRequirements = async (req, res, next) => {
  try {
    const { category, search, eventType, status, page = 1, limit = 20 } = req.query;

    const query = {};

    // Filter by category
    if (category && ['planner', 'performer', 'crew'].includes(category)) {
      query.category = category;
    }

    // Filter by event type
    if (eventType) {
      query.eventType = { $regex: eventType, $options: 'i' };
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search query
    if (search && search.trim() !== '') {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { eventName: searchRegex },
        { location: searchRegex },
        { venue: searchRegex },
        { eventType: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [requirements, total] = await Promise.all([
      Requirement.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Requirement.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      count: requirements.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      data: requirements,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single requirement by ID
// @route   GET /api/requirements/:id
// @access  Public
export const getRequirementById = async (req, res, next) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: `Requirement not found with ID ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid requirement ID format: ${req.params.id}`,
      });
    }
    next(error);
  }
};

// @desc    Delete a requirement (for testing/cleanup)
// @route   DELETE /api/requirements/:id
// @access  Public
export const deleteRequirement = async (req, res, next) => {
  try {
    const requirement = await Requirement.findByIdAndDelete(req.params.id);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: `Requirement not found with ID ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Requirement deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get aggregate category metrics & counts
// @route   GET /api/requirements/stats/overview
// @access  Public
export const getRequirementsStats = async (req, res, next) => {
  try {
    const [total, plannerCount, performerCount, crewCount] = await Promise.all([
      Requirement.countDocuments(),
      Requirement.countDocuments({ category: 'planner' }),
      Requirement.countDocuments({ category: 'performer' }),
      Requirement.countDocuments({ category: 'crew' }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        categories: {
          planner: plannerCount,
          performer: performerCount,
          crew: crewCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
