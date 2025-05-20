import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
    createGigPackage,
    getGigPackagesByGigId,
    updateGigPackage,
    deleteGigPackage
} from '../controllers/gigPackage.controller.js';

const router = express.Router();

// Create a gig package (seller-only)
router.post('/', requireAuth, createGigPackage);

// Get gig packages by gig_id (public)
router.get('/:gig_id', getGigPackagesByGigId);

// Update a gig package (seller-only)
router.put('/:id', requireAuth, updateGigPackage);

// Delete a gig package (seller-only)
router.delete('/:id', requireAuth, deleteGigPackage);

export default router;