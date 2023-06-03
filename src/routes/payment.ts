import { Router } from 'express';
import { createOrder } from '../controllers/payment.js';

const router = Router();

router.get('/:id/buy', createOrder);

export default router;
