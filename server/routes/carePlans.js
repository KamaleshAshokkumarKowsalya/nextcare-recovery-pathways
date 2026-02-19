import express from 'express';
import { 
  getCarePlans,
  getCarePlan,
  createCarePlan,
  updateCarePlan,
  deleteCarePlan
} from '../controllers/carePlanController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getCarePlans)
  .post(protect, createCarePlan);

router.route('/:id')
  .get(protect, getCarePlan)
  .put(protect, updateCarePlan)
  .delete(protect, deleteCarePlan);

export default router;
