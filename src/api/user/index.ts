import { Router } from "express";
import { getAllUsers } from "./user.controller";

const router = Router();


// CREATE

// READ
router.get("/", getAllUsers)

// UPDATE

// DELETE


export default router;
