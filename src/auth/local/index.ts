import { Router } from "express";
import { loginHandler } from "./local.controller"

const route = Router();

// LOGIN -> POST /auth/local/login
route.post('/login', loginHandler)

export default route;