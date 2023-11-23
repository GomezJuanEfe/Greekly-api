import { Router } from "express";
import { getAllOrders } from "./order.controller";

const router = Router();


// CREATE

// READ
router.get("/", getAllOrders);

// UPDATE

// DELETE


export default router;
