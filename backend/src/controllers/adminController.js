import ApiError from "../utils/errorHandling.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Admin } from "../models/adminModal.js";
import validator from "validator"
import jwt from "jsonwebtoken"

const genrateAccessRefreshToken = (findAdmin) => {
    try {
        const accessToken = findAdmin.generateAccessToken()
        const refreshToken = findAdmin.generateRefreshToken()
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("Error while genrating the token", error)
        throw error;
    }
}

const loginAdmin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (!email?.trim()) {
        throw new ApiError(401, "Email is required")
    }
    else if (!validator.isEmail(email)) {
        throw new ApiError(401, "Enter correct email format")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    else if (!passwordRegix.test(password)) {
        throw new ApiError(401, "Invalid password");
    }

    console.log("Email is: ", email)
    console.log("Passowrd is: ", password)

    const findAdmin = await Admin.findOne({
        email: email
    })

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    if (!findAdmin.isActive) {
        throw new ApiError(403, "Admin account is deactivated");
    }

    console.log("Admin is: ", findAdmin)

    const checkPassword = await findAdmin.isPasswordCorrect(password)

    if (!checkPassword) {
        throw new ApiError(400, "Enter correct password")
    }

    const { accessToken, refreshToken } = genrateAccessRefreshToken(findAdmin)
    const lastActive = new Date()

    findAdmin.lastLogin = lastActive
    findAdmin.refreshToken = refreshToken

    await findAdmin.save({
        validateBeforeSave: false,
    });

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    const loggedInAdmin = await Admin.findById(findAdmin._id)
        .select("-password -refreshToken -__v");

    return res.status(200)
        .cookie("adminAccessToken", accessToken, options)
        .cookie("adminRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Admin login Successfully", loggedInAdmin))
})

const createAdmin = asyncHandler(async (req, res, next) => {
    const mainAdmin = req.admin
    if (mainAdmin.role !== "superAdmin") {
        throw new ApiError(403, "Only Super Admin can create a new admin");

    }
    const { fullName, email, password, mobileNumber, joiningdate } = req.body
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    console.log("Email is: ", email)
    console.log("Passowrd is: ", password)
    console.log("Joining Date is: ", joiningdate)
    console.log("Mobile Number is: ", mobileNumber)
    console.log("Full name is: ", fullName)
    if (!fullName?.trim()) {
        throw new ApiError(401, "FullName is required")
    }
    if (!email?.trim()) {
        throw new ApiError(401, "Email is required")
    }
    else if (!validator.isEmail(email)) {
        throw new ApiError(401, "Enter correct email format")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    else if (!passwordRegix.test(password)) {
        throw new ApiError(401, "Invalid password");
    }
    if (!mobileNumber) {
        throw new ApiError(400, "Mobile Number is required")
    }
    else if (!validator.isMobilePhone(mobileNumber.trim(), "en-IN")) {
        throw new ApiError(401, "Enter correct Mobile Number")
    }
    if (!joiningdate) {
        throw new ApiError(401, "Joining Date is required")
    }


    const findAdmin = await Admin.findOne({
        email: email.trim()
    })

    if (findAdmin) {
        throw new ApiError(409, "Admin already found.")
    }

    const admin = await Admin.create({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        mobileNumber: mobileNumber.trim(),
        joiningdate: joiningdate
    })


    if (!admin) {
        throw new ApiError(500, "Error while creating the admin")
    }

    console.log("Admin details created: ", admin)
    const adminDetails = await Admin.findOne({
        email: email
    })
        .select("-password -refreshToken -__v");
    return res.status(201)
        .json(new ApiResponse(201, "Admin Created", adminDetails))

})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies?.adminRefreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "UnAuthorized Admin")
    }
    console.log("Incoming refresh Token: ", incomingRefreshToken)

    const jwtAdminVerify = jwt.verify(incomingRefreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET)
    const findAdmin = await Admin.findById(jwtAdminVerify._id)

    if (!findAdmin) {
        throw new ApiError(404, "No any admin found.")
    }

    if (incomingRefreshToken !== findAdmin.refreshToken) {
        throw new ApiError(401, "Invalid refresh Token")
    }

    const { accessToken, refreshToken } = genrateAccessRefreshToken(findAdmin)

    findAdmin.refreshToken = refreshToken

    await findAdmin.save({
        validateBeforeSave: false,
    })

    console.log("Token refreshed Successfully");

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .cookie("adminAccessToken", accessToken, options)
        .cookie("adminRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Token refreshed Successfully", {
            newAccessToken: accessToken,
            newRefreshToken: refreshToken
        }))



})

const verifyAdmin = asyncHandler(async (req, res, next) => {
    const adminData = req.admin.toObject()
    const { __v, updatedAt, refreshToken, ...adminDetails } = adminData
    console.log("Admin details verified")
    return res.status(200)
        .json(new ApiResponse(200, "Admin Details verified", adminDetails))
})

const logOutAdmin = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (!adminData) {
        throw new ApiError(401, "UnAuthorized Admin")
    }
    console.log("Admin details is: ", adminData)
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    console.log("Admin logOut Successfully")
    return res.status(200)
        .clearCookie("adminAccessToken", options)
        .clearCookie("adminRefreshToken", options)
        .json(new ApiResponse(200, "Admin LogOut", {}))

})

const getAllAdmin = asyncHandler(async (req, res, next) => {
    const superAdminData = req.admin
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    const getAllAdminData = await Admin.find({
        role: "admin"
    })
        .select("-password -__v -updatedAt")

    console.log("All admin data are: ", getAllAdminData)

    return res.status(200)
        .json(new ApiResponse(200, "All admin data retrived", getAllAdminData))
})

const fetchAdminDetails = asyncHandler(async (req, res, next) => {
    const superAdminData = req.admin
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    const { id } = req.params;
    console.log("Admin Id is: ", id)

    const adminDetails = await Admin.findById(id)
        .select("-password -__v")

    if (!adminDetails) {
        throw new ApiError(400, "Admin Id is required")
    }

    console.log("Admin details fetched is: ", adminDetails)

    return res.status(200)
        .json(new ApiResponse(200, "Admin details fetched", adminDetails))


})

const updateAdmin = asyncHandler(async (req, res, next) => {
    const superAdminData = req.admin
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    const { id } = req.params;
    const { fullName, mobileNumber, joiningdate } = req.body;

    if (!id) {
        throw new ApiError(400, "Admin Id is required")
    }
    console.log("Admin id is: ", id)

    const findAdmin = await Admin.findById(id)
        .select("-password -__v")

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    console.log("Admin Details to update is: ", findAdmin)

    if (mobileNumber?.trim() && !validator.isMobilePhone(mobileNumber?.trim(), "en-IN")) {
        throw new ApiError(400, "Enter correct mobile number")
    }
    if (mobileNumber?.trim()) {
        const checkAdminExist = await Admin.findOne(
            {
                $and:
                    [

                        {
                            mobileNumber: mobileNumber.trim()
                        },
                        {
                            role: "admin"
                        }
                    ]
            })
        if (checkAdminExist && checkAdminExist?._id.toString() !== id) {
            throw new ApiError(409, "Another Admin exist with same mobile number.")
        }
    }
    if (mobileNumber?.trim() && findAdmin.mobileNumber !== mobileNumber.trim()) {
        findAdmin.mobileNumber = mobileNumber?.trim()
        console.log("Admin mobile number to update is: ", mobileNumber)
    }

    if (findAdmin.fullName !== fullName && fullName?.trim()) {
        findAdmin.fullName = fullName?.trim()
        console.log("Admin fullname to update is: ", fullName)
    }

    if (joiningdate && findAdmin.joiningdate !== joiningdate) {
        findAdmin.joiningdate = joiningdate
        console.log("Admin Joining date update is: ", joiningdate)
    }

    await findAdmin.save();

    return res.status(200)
        .json(new ApiResponse(200, "Admin details updated successfull", findAdmin))
})

const activateAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const superAdminData = req.admin;
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    console.log("Admin id is: ", id)

    const findAdmin = await Admin.findById(id)
        .select("-password -__v")

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    console.log("Admin Details to update is: ", findAdmin)

    // if(findAdmin.isActive){
    //     throw new ApiError(400, "Admin is already active.")
    // }

    findAdmin.isActive = true;
    await findAdmin.save()

    console.log("Admin is active now")

    return res.status(200)
        .json(new ApiResponse(200, "Admin is active now", findAdmin))

})

const deactivateAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const superAdminData = req.admin;
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }
    console.log("Admin role from middleware is: ", superAdminData.role)

    console.log("Admin id is: ", id)

    const findAdmin = await Admin.findById(id)
        .select("-password -__v")

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    console.log("Admin data is: ", findAdmin)

    if (findAdmin.role === "superAdmin") {
        throw new ApiError(400, "Super Admin account cannot be deactivated")
    }

    if (!findAdmin.isActive) {
        throw new ApiError(400, "Admin already deactivated")
    }

    findAdmin.isActive = false;
    await findAdmin.save();

    console.log("Admin is deactivated")

    return res.status(200)
        .json(new ApiResponse(200, "Admin is deactivated", findAdmin))
})




export { createAdmin, loginAdmin, refreshAccessToken, verifyAdmin, logOutAdmin, getAllAdmin, fetchAdminDetails, updateAdmin, activateAdmin, deactivateAdmin }