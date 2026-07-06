import { Admin } from "../models/adminModal.js";
import jwt from "jsonwebtoken"
import ApiError from "../utils/errorHandling.js";
import asyncHandler from "../utils/asyncHandler.js";

const adminJWTVerify = asyncHandler(async (req, res, next) => {
    const adminToken = req.cookies?.adminAccessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!adminToken) {
        throw new ApiError(401, "Unauthorized Request")
    }
    const verifyToken = jwt.verify(adminToken, process.env.ADMIN_ACCESS_TOKEN_SECRET)
    const findAdmin = await Admin.findById(verifyToken?._id)
        .select("-password")
    if (!findAdmin) {
        throw new ApiError(404, "Admin not found")
    }
    if (!findAdmin.isActive) {
        throw new ApiError(403, "Admin account is deactivated");
    }
    req.admin = findAdmin
    next()
})

export default adminJWTVerify