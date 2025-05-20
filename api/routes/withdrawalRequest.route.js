import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { authenticateAndLoadUser, isAdmin } from '../middleware/getAuth.js';
import {
    createWithdrawalRequest,
    getWithdrawalRequestsByClerkId,
    updateWithdrawalRequest
} from '../controllers/withdrawalRequest.controller.js';

const router = express.Router();

// Create a withdrawal request (seller-only)
router.post('/', requireAuth, createWithdrawalRequest);

// Get withdrawal requests by clerk_id (authenticated, admin or owner)
router.get('/:clerk_id', authenticateAndLoadUser, requireAuth, getWithdrawalRequestsByClerkId);

// Update withdrawal request status (admin-only)
router.put('/:id', requireAuth, isAdmin, updateWithdrawalRequest);

export default router;