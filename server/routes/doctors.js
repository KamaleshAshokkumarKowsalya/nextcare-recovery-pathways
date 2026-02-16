import express from 'express';
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from '../controllers/doctorController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getDoctors)
  .post(protect, admin, createDoctor);

router.route('/:id')
  .put(protect, admin, updateDoctor)
  .delete(protect, admin, deleteDoctor);

export default router;