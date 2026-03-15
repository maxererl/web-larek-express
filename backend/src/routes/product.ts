import { Router } from 'express';
import { createProduct, getAllProducts } from '../controllers/product';
import { createProductValidator } from '../middlewares/validation';

const router = Router();

router.get('/', getAllProducts);
router.post('/', createProductValidator, createProduct);

export default router;
