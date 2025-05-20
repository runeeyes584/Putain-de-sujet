import express from 'express';
import { createVNPayUrl, handleVNPayReturn } from '../controllers/payment.controller.js';
import { authenticateAndLoadUser } from '../middleware/getAuth.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/create-qr', requireAuth, authenticateAndLoadUser, createVNPayUrl);
router.get('/check-payment-vnpay', handleVNPayReturn);

export default router;
