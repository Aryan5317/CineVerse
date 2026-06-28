import { User } from "../models/userModal.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/errorHandling.js"
import jwt from "jsonwebtoken"


const resetPasswordTokenVerify = asyncHandler(async (req, res, next) => {
    const resetToken = req.cookies.passwordResetToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!resetToken) {
        throw new ApiError(401, "Unauthorized Request")
    }
    console.log("Reset token is: ", resetToken)
    const verifyToken = jwt.verify(resetToken, process.env.RESET_PASSWORD_TOKEN_SECRET)
    if (verifyToken.purpose !== "password-reset") {
        throw new ApiError(401, "Invalid reset password token");
    }
    console.log("User details from jwt verify for reset token is: ", verifyToken)
    const findUser = await User.findById(verifyToken._id)
        .select("-refreshToken -password -otp -otpExpiry")
    if (!findUser) {
        throw new ApiError(404, "User not found")
    }
    req.user = findUser
    next()
})

export default resetPasswordTokenVerify