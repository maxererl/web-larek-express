import { Router } from 'express';
import makeOrder from '../controllers/order';
import { makeOrderValidator } from '../middlewares/validation';

const router = Router();

router.post('/', makeOrderValidator, makeOrder);

export default router;
