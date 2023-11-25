import { Router } from "express";
import { createUserHandler } from "./user.controller";

const router = Router();


// CREATE -> POST /api/user
router.post('/', createUserHandler)


export default router;
