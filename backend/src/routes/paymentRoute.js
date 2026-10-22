import { Router } from "express";
import jwtVerify from "../middlewares/userJWTMiddleware.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.route("/create-order").post(jwtVerify, createRazorpayOrder);

paymentRouter.route("/verify-payment").post(jwtVerify, verifyRazorpayPayment);

export default paymentRouter;
