import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";
import {
  getAllOrdersHandler,
  createOrderHandler,
  getOrdersByUserHandler,
  getOrderByIdHandler
} from "./order.controller";

const router = Router();

// CREATE -> POST api/order
router.post("/", isAuthenticated, createOrderHandler)

// READ -> GET api/order
router.get("/", isAuthenticated, hasRole(['ADMIN']), getAllOrdersHandler);
// READ -> GET api/order/getOrdersByUser
router.get("/getOrdersByUser", isAuthenticated, getOrdersByUserHandler);
// READ -> GET api/order/getOrdersById
router.get("/getOrderById/:productId", isAuthenticated, getOrderByIdHandler);


export default router;
