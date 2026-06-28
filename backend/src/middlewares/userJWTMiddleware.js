import { User } from "../models/userModal.js";
import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandling.js";

const jwtVerify = asyncHandler(async (req, res, next) => {
    const userToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!userToken) {
        throw new ApiError(401, "Unauthorized Request")
    }
    const verifyToken =  jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET)
    const findUser = await User.findById(verifyToken?._id)
    .select("-refreshToken -password -otp -otpExpiry")
    if(!findUser){
        throw new ApiError(404, "User not found")
    }
    req.user = findUser
    next()

})

export default jwtVerify



// verifyToken contains payload things (id, email, role)