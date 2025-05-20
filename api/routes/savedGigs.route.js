import express from 'express';
import { getSavedGigs, saveGig, unsaveGig } from '../controllers/savedGigs.controller.js';
import { authenticateAndLoadUser } from '../middleware/getAuth.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.use(requireAuth);           
router.use(authenticateAndLoadUser); 

router.get('/', getSavedGigs);
router.post('/:gigId', saveGig);
router.delete('/:gigId', unsaveGig);

export default router;
