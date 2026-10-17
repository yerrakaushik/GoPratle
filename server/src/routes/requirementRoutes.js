import express from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  deleteRequirement,
  getRequirementsStats,
} from '../controllers/requirementController.js';

const router = express.Router();

router.get('/stats/overview', getRequirementsStats);
router.route('/').get(getRequirements).post(createRequirement);
router.route('/:id').get(getRequirementById).delete(deleteRequirement);

export default router;
