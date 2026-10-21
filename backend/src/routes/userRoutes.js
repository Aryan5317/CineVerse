import { Router } from "express"
import { registerUser, loginUser, logoutUser, refreshAccessToken, verifyUser, forgetPassword, verifyOTP, resetPassword, movieDetailsBooking, getSeatsLayout, verfiyTicketBookingDetails } from "../controllers/normalUser.js"
import jwtVerify from "../middlewares/userJWTMiddleware.js"
import resetPasswordTokenVerify from "../middlewares/userResetPasswordMiddleware.js"

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(jwtVerify, logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/current-user").get(jwtVerify, verifyUser)
userRouter.route("/forget-password").post(forgetPassword)
userRouter.route("/verify-otp").post(verifyOTP)
userRouter.route("/reset-password").post(resetPasswordTokenVerify, resetPassword)
userRouter.route("/theatre-movie-details/:movieId").get(jwtVerify, movieDetailsBooking)
userRouter.route("/seat-data/:movieId/:theatreId").get(jwtVerify, getSeatsLayout)
userRouter.route("/booking-det").post(jwtVerify, verfiyTicketBookingDetails);

export default userRouter

// userRouter.route("/test").get(testController)
