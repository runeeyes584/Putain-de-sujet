import express from 'express';
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subCategory.controller.js';
import requireAuth from '../middleware/requireAuth.js';
import { authenticateAndLoadUser, isAdmin } from '../middleware/getAuth.js';

const router = express.Router();

// Public routes (buyers/seekers can access)
router.get('/', getAllSubCategories);
router.get('/:id', getSubCategoryById);

// Protected routes (require admin role)
router.post('/', requireAuth, isAdmin, createSubCategory);
router.put('/:id', requireAuth, isAdmin, updateSubCategory);
router.delete('/:id', requireAuth, isAdmin, deleteSubCategory);

export default router;