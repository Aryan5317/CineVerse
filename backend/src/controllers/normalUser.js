import { User } from "../models/userModal.js";
import ApiError from "../utils/errorHandling.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/apiResponse.js"
import validator from "validator"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js";

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body
    console.log("Name is: ", name)
    console.log("Email is: ", email)
    console.log("Phone Number is: ", phoneNumber)
    console.log("Password is: ", password)
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (!name) {
        throw new ApiError(400, "Name is required")
    }
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    else if (!(validator.isEmail(email))) {
        throw new ApiError(400, "Enter correct email")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    else if (!(passwordRegix.test(password))) {
        throw new ApiError(400, "Invalid Password. Enter correct Password")
    }
    if (!phoneNumber) {
        throw new ApiError(400, "Phone Number is required")
    }
    else if (phoneNumber.length != 10) {
        throw new ApiError(400, "Enter correct mobile number")
    }
    const checkUser = await User.findOne(
        {
            $or: [
                { email: email },
                { mobileNumber: phoneNumber }
            ]
        }
    )
    if (checkUser) {
        throw new ApiError(409, "User already exist")
    }
    const newUser = await User.create({
        name: name,
        email: email,
        password: password,
        mobileNumber: phoneNumber
    })
    if (!newUser) {
        throw new ApiError(500, "Error while creating the user")
    }
    console.log("User created is: ", newUser)
    return res.status(201)
        .json(
            new ApiResponse(201, "User created successfully", "")
        )
})

const genrateAccessRefreshToken = async (user) => {
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        return { accessToken, refreshToken };

    } catch (error) {
        console.log("Error while genrating the token", error)
        throw error;
    }
}

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    console.log("Email while login is: ", email)
    console.log("Password while login is: ", password)
    if (!email) {
        throw new ApiError(400, "Email is reqired")
    }
    else if (!(validator.isEmail(email))) {
        throw new ApiError(400, "Enter correct Email")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const findUser = await User.findOne({
        email: email
    })

    if (!findUser) {
        throw new ApiError(404, "No any user found. Register first")
    }

    const userId = findUser._id;
    const checkPassword = await findUser.isPasswordCorrect(password);
    if (!checkPassword) {
        throw new ApiError(401, "Enter correct Password")
    }
    console.log("User for login is: ", findUser)

    const { accessToken, refreshToken } = await genrateAccessRefreshToken(findUser);

    findUser.refreshToken = refreshToken

    await findUser.save({
        validateBeforeSave: false,
    });
    const getUserDetails = await User.findById(userId)
        .select("-refreshToken -password -mobileNumber -otp -otpExpiry")

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, "User login Successfully", { userDetails: getUserDetails, accessToken: accessToken, refreshToken: refreshToken }))
})

const logoutUser = asyncHandler(async (req, res, next) => {
    const userData = req.user;
    if (!userData) {
        throw new ApiError(401, "UnAuthorized User")
    }
    console.log("User data from req.user is: ", userData)
    const findUser = await User.findById(userData._id)
    if (!findUser) {
        throw new ApiError(404, "No any user found. Register first")
    }
    console.log("User details find for logOur: ", findUser)
    findUser.refreshToken = null
    await findUser.save();
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User Logout Successfully", ""))
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies?.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "UnAuthorized User")
    }
    console.log("Incoming refresh Token: ", incomingRefreshToken)

    const verifytoken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const findUser = await User.findById(verifytoken._id)

    if (!findUser) {
        throw new ApiError(404, "No any user found.")
    }

    if (incomingRefreshToken !== findUser.refreshToken) {
        throw new ApiError(401, "Invalid Refresh Token")
    }

    console.log("User details for token genration is: ", findUser)

    const { accessToken, refreshToken } = await genrateAccessRefreshToken(findUser)

    findUser.refreshToken = refreshToken
    await findUser.save();

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Refresh Token refreshed",
            {
                newRefreshToken: refreshToken,
                newAccessToken: accessToken
            }
        ))
})

const verifyUser = asyncHandler(async (req, res, next) => {
    const userData = req.user.toObject();
    console.log("User data recived from middleware: ", userData)
    const { createdAt, updatedAt, __v, ...newUserData } = userData
    return res.status(200)
        .json(new ApiResponse(200, "User logged in verified", newUserData))
})

const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    console.log("Email is for chceked forget password is: ", email)
    if (!email) {
        throw new ApiError(400, "Email field is required")
    }
    else if (!validator.isEmail(email)) {
        throw new ApiError(400, "Enter the correct email")
    }


    console.log("Email is: ", email)

    const userDetails = await User.findOne({
        email: email
    })

    if (!userDetails) {
        throw new ApiError(400, "No User found. Register first")
    }

    console.log("User details is: ", userDetails)

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP to send is: ", otp)

    const currentTime = new Date()
    currentTime.setMinutes(currentTime.getMinutes() + 10)

    userDetails.otp = otp
    userDetails.otpExpiry = currentTime

    await userDetails.save()
    await sendEmail({
        to: email,
        subject: "CineVerse - Password Reset OTP",
        html: `
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>Your OTP for resetting your CineVerse account password is:</p>

        <h1 style="letter-spacing: 5px;">${otp}</h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>

        <br/>

        <p>Regards,</p>
        <h3>CineVerse Team</h3>
    `
    });


    return res.status(200)
        .json(new ApiResponse(200, "OTP Sent Successfully", {}))

})

const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email) {
        throw new ApiError(400, "Email field is empty")
    }
    else if (!validator.isEmail(email)) {
        throw new ApiError(400, "Enter correct email")
    }
    if (!otp) {
        throw new ApiError(400, "Otp field is empty")
    }
    console.log("Email is for otp verificaion is: ", email)
    console.log("Otp for verificatio is: ", otp)

    const findUser = await User.findOne({
        email: email
    })

    if (!findUser) {
        throw new ApiError(400, "No user found. Register first")
    }
    console.log("User details is: ", findUser)

    const currentTime = new Date()

    if (currentTime > findUser.otpExpiry) {
        throw new ApiError(404, "Otp is expired. Click resend otp button again")
    }

    const checkOTP = await findUser.isOTPCorrect(otp)
    if (!checkOTP) {
        throw new ApiError(401, "Enter correct OTP")
    }

    const genrateResetToken = findUser.genrateResetPasswordToken()
    if (!genrateResetToken) {
        throw new ApiError(500, "Error in genrating the password reset token");
    }

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 10 * 60 * 1000
    }

    return res.status(200)
        .cookie("passwordResetToken", genrateResetToken, options)
        .json(new ApiResponse(200, "OTP verified Successfully", {}))


})

const resetPassword = asyncHandler(async (req, res, next) => {
    const userData = req.user
    if (!userData) {
        throw new ApiError(401, "UnAuthorized User")
    }
    console.log("User data for reset password is: ", userData)

    const { newPassword, confirmPassword } = req.body
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (!newPassword) {
        throw new ApiError(400, "Password is required")
    }
    else if (!(passwordRegix.test(newPassword))) {
        throw new ApiError(400, "Invalid Password. Enter correct Password format")
    }

    if (!confirmPassword) {
        throw new ApiError(400, "Confirm Password field is required")
    }
    else if (!(passwordRegix.test(confirmPassword))) {
        throw new ApiError(400, "Invalid Password. Enter correct Password format")
    }
    else if (confirmPassword !== newPassword) {
        throw new ApiError(400, "Confirm Password and New Passowrd must be same");
    }

    console.log("New password is: ", newPassword)
    console.log("Confirm Password is: ", confirmPassword)

    const findUser = await User.findById(userData._id)
    if (!findUser) {
        throw new ApiError(401, "No user found. Register first")
    }

    console.log("User details for passowrd reset is: ", findUser)

    findUser.password = newPassword
    findUser.otp = undefined
    findUser.otpExpiry = undefined

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    await findUser.save();
    return res.status(200)
        .clearCookie("passwordResetToken", options)
        .json(new ApiResponse(200, "Password Updated Successfully", {}))

})



export { registerUser, loginUser, logoutUser, refreshAccessToken, verifyUser, forgetPassword, verifyOTP, resetPassword }
// const testController = asyncHandler(async (req, res, next) => {
//     await sendEmail({
//         to: "aryanraj5317@gmail.com",
//         subject: "Testing CineVerse",
//         html: "<h1>Hello Aryan!</h1>"
//     })
//     return res.status(200)
//         .json(
//             new ApiResponse(200, "Email checked", "")
//         )
// })
