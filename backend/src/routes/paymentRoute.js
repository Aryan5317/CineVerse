import { Router } from "express";
import jwtVerify from "../middlewares/userJWTMiddleware.js";
import { createRazorpayOrder, verifyRazorpayPayment, paymentFailed, getMyBookings } from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.route("/create-order").post(jwtVerify, createRazorpayOrder);
paymentRouter.route("/verify-payment").post(jwtVerify, verifyRazorpayPayment);
paymentRouter.route("/payment-failed").post(jwtVerify, paymentFailed);
paymentRouter.route("/my-bookings").get(jwtVerify, getMyBookings);

export default paymentRouter;
