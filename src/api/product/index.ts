import { Router } from "express";
import { getAllProducts } from "./product.controller";

const router = Router();


// CREATE

// READ
router.get("/", getAllProducts)

// UPDATE

// DELETE


export default router;
