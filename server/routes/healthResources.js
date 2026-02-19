import express from 'express';
import { 
  getHealthResources,
  getHealthResource,
  createHealthResource,
  updateHealthResource,
  deleteHealthResource
} from '../controllers/healthResourceController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getHealthResources)
  .post(protect, admin, createHealthResource);

router.route('/:id')
  .get(getHealthResource)
  .put(protect, admin, updateHealthResource)
  .delete(protect, admin, deleteHealthResource);

export default router;
