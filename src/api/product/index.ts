import { Router } from "express";
import {
  createProductHandler,
  getAllProductsHandler,
  updateProductHandler,
  deleteProductHandler
} from "./product.controller";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";

const router = Router();


// CREATE -> POST /api/product
router.post('/', isAuthenticated, hasRole(['ADMIN']), createProductHandler)

// READ -> GET /api/product
router.get("/", getAllProductsHandler)

// UPDATE -> PUT /api/product
router.put('/', isAuthenticated, hasRole(['ADMIN']), updateProductHandler)

// DELETE -> DELETE /api/product/:id
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteProductHandler)


export default router;
