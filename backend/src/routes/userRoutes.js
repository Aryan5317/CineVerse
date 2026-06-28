import { Router } from "express"
import { registerUser, loginUser, logoutUser, refreshAccessToken, verifyUser, forgetPassword, verifyOTP, resetPassword } from "../controllers/normalUser.js"
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

export default userRouter

// userRouter.route("/test").get(testController)
