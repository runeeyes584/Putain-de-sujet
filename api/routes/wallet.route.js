import express from 'express';
import  requireAuth  from '../middleware/requireAuth.js';
import  { authenticateAndLoadUser, isAdmin}  from '../middleware/getAuth.js';
import {
    getWalletByClerkId,
    updateWalletBalance
} from '../controllers/wallet.controller.js';

const router = express.Router();

// Get wallet by clerk_id (authenticated, admin or owner)
router.get('/:clerk_id', authenticateAndLoadUser, requireAuth, getWalletByClerkId);

// Update wallet balance (admin-only)
router.put('/:clerk_id', requireAuth, isAdmin, updateWalletBalance);

export default router;