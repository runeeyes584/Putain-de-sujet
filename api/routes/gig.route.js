import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGigById,
  updateGig,
  searchGigs,
  updateGigStatus,
} from "../controllers/gig.controller.js";
import requireAuth from '../middleware/requireAuth.js';
import { authenticateAndLoadUser, isAdmin } from '../middleware/getAuth.js';

const router = express.Router();

// router.post("/", createGig);
// router.delete("/:id", deleteGig);
// router.get("/", getAllGigs);
// router.get("/:id", getGigById);
// router.put("/:id", updateGig);
// router.get("/search", searchGigs);

// Public routes (buyers/seekers can access)
router.get('/', getAllGigs);
router.get('/search', searchGigs);
router.get('/:id', getGigById);

// Protected routes (require authentication)
router.post('/', requireAuth, authenticateAndLoadUser, createGig);
router.put('/:id', requireAuth, isAdmin, updateGig); 
router.patch('/:id/status', requireAuth, isAdmin, updateGigStatus); //cập nhật trạng thái gig thay thế cho delete
router.delete('/:id', requireAuth, isAdmin, deleteGig);


export default router;

