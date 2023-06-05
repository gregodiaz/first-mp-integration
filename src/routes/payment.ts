import { Router } from 'express';
import { createOrder, receiveWebhook } from '../controllers/payment.js';

const router = Router();

router.get('/:id/buy', createOrder);

router.get('/success', (req, res) => res.json({ message: 'Success' }));
router.get('/pending', (req, res) => res.status(202).json({ message: 'Pending' }));
router.get('/failure', (req, res) => res.status(500).json({ message: 'Failure' }));

router.post('/webhook', receiveWebhook);

export default router;
