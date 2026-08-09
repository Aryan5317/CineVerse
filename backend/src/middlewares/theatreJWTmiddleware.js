import { Theatre } from "../models/theatreModal.js"
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import ApiError from "../utils/errorHandling.js"

const theatreJwtVerify = asyncHandler(async (req, res, next) => {

    const theatreToken = req.cookies?.partnerAccessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!theatreToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    console.log("Theatre token is: ", theatreToken)

    const verifyToken = await jwt.verify(theatreToken, process.env?.THEATRE_ACCESS_TOKEN_SECRET)
    const theatreUser = await Theatre.findById(verifyToken._id)
        .select("-ownerPassword")

    if (!theatreUser) {
        throw new ApiError(404, "User not found")
    }

    req.theatre = theatreUser
    next()

})

export default theatreJwtVerify