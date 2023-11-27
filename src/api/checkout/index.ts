import { Router } from "express";
import { handleCheckout } from "./checkout.controller";
// import { handleCreatePayment } from "./payment.controller";

const router = Router();

router.post("/", handleCheckout)
// router.post("/create-payment", handleCreatePayment)

export default router;
