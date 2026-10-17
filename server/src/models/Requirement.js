import mongoose from 'mongoose';

// Subschema for Event Planner (Steps 2 & 3)
const PlannerDetailsSchema = new mongoose.Schema(
  {
    planningScope: {
      type: String,
      enum: ['full_planning', 'partial_planning', 'day_of_coordination', 'consultation_only'],
      required: true,
    },
    estimatedGuestCount: {
      type: Number,
      required: true,
      min: 1,
    },
    overallBudget: {
      type: String,
      required: true,
      trim: true,
    },
    themeOrVibe: {
      type: String,
      trim: true,
      default: '',
    },
    servicesNeeded: {
      type: [String],
      default: [],
    },
    decorPreferences: {
      type: String,
      trim: true,
      default: '',
    },
    additionalNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

// Subschema for Performer (Steps 2 & 3)
const PerformerDetailsSchema = new mongoose.Schema(
  {
    performerType: {
      type: String,
      enum: [
        'band',
        'solo_vocalist',
        'dj',
        'comedian',
        'dancer',
        'magician',
        'mc_host',
        'instrumentalist',
        'other',
      ],
      required: true,
    },
    genreOrStyle: {
      type: String,
      required: true,
      trim: true,
    },
    performanceDuration: {
      type: String,
      required: true,
      trim: true,
    },
    expectedPerformanceTime: {
      type: String,
      trim: true,
      default: '',
    },
    soundEquipmentProvided: {
      type: String,
      enum: [
        'organizer_provides_full_pa',
        'performer_must_bring_gear',
        'venue_inhouse_basic',
        'needs_discussion',
      ],
      required: true,
      default: 'needs_discussion',
    },
    soundcheckRequired: {
      type: Boolean,
      default: true,
    },
    soundcheckTime: {
      type: String,
      trim: true,
      default: '',
    },
    performanceFeeBudget: {
      type: String,
      required: true,
      trim: true,
    },
    repertoireNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

// Subschema for Crew (Steps 2 & 3)
const CrewDetailsSchema = new mongoose.Schema(
  {
    rolesNeeded: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, 'At least one crew role is required'],
    },
    headcount: {
      type: Number,
      required: true,
      min: 1,
    },
    shiftCallTime: {
      type: String,
      required: true,
      trim: true,
    },
    eventDaysCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    experienceLevel: {
      type: String,
      enum: ['entry_level', 'intermediate', 'expert_certified'],
      default: 'intermediate',
    },
    certificationsRequired: {
      type: String,
      trim: true,
      default: '',
    },
    mealsProvided: {
      type: Boolean,
      default: false,
    },
    transportProvided: {
      type: Boolean,
      default: false,
    },
    dressCode: {
      type: String,
      enum: [
        'all_black_stage_crew',
        'smart_casual',
        'formal_suit',
        'hi_vis_safety',
        'no_preference',
      ],
      default: 'all_black_stage_crew',
    },
    compensationRate: {
      type: String,
      required: true,
      trim: true,
    },
    additionalInstructions: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

// Main Requirement Schema
const RequirementSchema = new mongoose.Schema(
  {
    // Step 1: Event Basics
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      minlength: [3, 'Event name must be at least 3 characters'],
      maxlength: [120, 'Event name cannot exceed 120 characters'],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
    },
    isDateRange: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (val) {
          if (this.isDateRange) {
            return val && val >= this.startDate;
          }
          return true;
        },
        message: 'End date must be equal to or after start date when a date range is selected',
      },
    },
    location: {
      type: String,
      required: [true, 'Location (city / region) is required'],
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['planner', 'performer', 'crew'],
        message: 'Category must be one of: planner, performer, crew',
      },
      index: true,
    },

    // Step 2 & 3: Category-specific nested fields
    plannerDetails: {
      type: PlannerDetailsSchema,
      required: function () {
        return this.category === 'planner';
      },
    },
    performerDetails: {
      type: PerformerDetailsSchema,
      required: function () {
        return this.category === 'performer';
      },
    },
    crewDetails: {
      type: CrewDetailsSchema,
      required: function () {
        return this.category === 'crew';
      },
    },

    // Contact & Organizational Metadata
    contactName: {
      type: String,
      trim: true,
      default: '',
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['open', 'in_review', 'fulfilled', 'archived'],
      default: 'open',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for fast lookup & filtering
RequirementSchema.index({ createdAt: -1 });
RequirementSchema.index({ category: 1, createdAt: -1 });
RequirementSchema.index({ eventName: 'text', location: 'text', venue: 'text' });

export default mongoose.model('Requirement', RequirementSchema);
