import { Router } from 'express';
import { getProductsList } from '../controllers/index.js';

const router = Router();

router.get('/', getProductsList);

export default router;
