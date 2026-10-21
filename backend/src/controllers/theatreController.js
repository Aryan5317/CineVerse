import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandling.js";
import ApiResponse from "../utils/apiResponse.js";
import { Theatre } from "../models/theatreModal.js";
import validator from "validator"
import uploadOnCloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken"
import { Screen } from "../models/screenModal.js";

const genrateAccessRefreshToken = async (user) => {
    try {
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("Error while genrating the token: ", error)
        throw error;
    }
}

const registerTheatreOwner = asyncHandler(async (req, res, next) => {

    console.log("Ref body feilds are: ", req.body)
    const { ownerName, ownerEmail, ownerMobileNumber, ownerAlternateMobileNo, ownerCountry, ownerCity, ownerState, ownerDistrict, ownerPinCode, ownerTown, ownerLandMark, ownerAadharNo, ownerPanNumber, theatreName, theatreDescription, theatreCountry, theatreState, theatreDistrict, theatrePinCode, theatreCity, theatreLandMark, theatreIsBookingAvailable, theatreContactNo, theatreGSTNumber } = req.body

    console.log("Req files feilds are: ", req.files)

    const mobileRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

    if (!ownerName?.trim()) {
        throw new ApiError(400, "Owner Name is required")
    }
    if (!ownerEmail?.trim()) {
        throw new ApiError(400, "Owner Email is required")
    }
    else if (!validator.isEmail(ownerEmail?.trim())) {
        throw new ApiError(400, "Enter correct email")
    }
    if (!ownerMobileNumber?.trim()) {
        throw new ApiError(400, "Owner Mobile Number is required")
    }
    else if (!mobileRegex.test(ownerMobileNumber?.trim())) {
        throw new ApiError(400, "Enter correct Mobile Number")
    }
    if (!ownerCountry?.trim()) {
        throw new ApiError(400, "Owner Country name required")
    }
    if (!ownerCity?.trim()) {
        throw new ApiError(400, "Owner City is required")
    }
    if (!ownerState?.trim()) {
        throw new ApiError(400, "Owner State is required")
    }
    if (!ownerDistrict?.trim()) {
        throw new ApiError(400, "Owner District is required")
    }
    if (!ownerPinCode?.trim()) {
        throw new ApiError(400, "Owner PinCode is required")
    }
    else if (!pincodeRegex.test(ownerPinCode?.trim())) {
        throw new ApiError(400, "Enter correct pinCode")
    }
    if (!ownerLandMark?.trim()) {
        throw new ApiError(400, "Owner Landmark is required")
    }
    if (!ownerAadharNo?.trim()) {
        throw new ApiError(400, "Owner Aadhar Number is required")
    }
    else if (!aadharRegex.test(ownerAadharNo?.trim())) {
        throw new ApiError(400, "Enter correct aadhar number")
    }
    if (!ownerPanNumber?.trim()) {
        throw new ApiError(400, "Owner Pan Number is required")
    }
    else if (!panRegex.test(ownerPanNumber?.trim())) {
        throw new ApiError(400, "Enter correct Pan Number")
    }
    if (!theatreName?.trim()) {
        throw new ApiError(400, "Theatre Name is required")
    }
    if (!theatreDescription?.trim()) {
        throw new ApiError(400, "Theatre Description is required")
    }
    if (!theatreCountry?.trim()) {
        throw new ApiError(400, "Theatre Country is required")
    }
    if (!theatreState?.trim()) {
        throw new ApiError(400, "Theatre State is required")
    }
    if (!theatreDistrict?.trim()) {
        throw new ApiError(400, "Theatre District is required")
    }
    if (!theatrePinCode?.trim()) {
        throw new ApiError(400, "Theatre Pincode is required")
    }
    else if (!pincodeRegex.test(theatrePinCode?.trim())) {
        throw new ApiError(400, "Enter correct pincode")
    }
    if (!theatreCity?.trim()) {
        throw new ApiError(400, "Theatre City is required")
    }
    if (!theatreLandMark?.trim()) {
        throw new ApiError(400, "Theatre LandMark is required")
    }
    if (!theatreContactNo?.trim()) {
        throw new ApiError(400, "Theatre Contact Number is required")
    }
    else if (!mobileRegex.test(theatreContactNo?.trim())) {
        throw new ApiError(400, "Enter correct Theatre Contact Number")
    }
    if (!theatreGSTNumber?.trim()) {
        throw new ApiError(400, "Theatre GST Number is required")
    }
    else if (!gstRegex.test(theatreGSTNumber?.trim())) {
        throw new ApiError(400, "Enter correct GST Number")
    }

    const ownerImageFile = req.files?.ownerPhoto?.[0];

    const theatreImagesFiles = req.files?.theatreImages;

    console.log("Owner Photo got in backend is: ", ownerImageFile)
    console.log("Theatre images got in backend is: ", theatreImagesFiles)

    const ownerPhotoLocalPath = ownerImageFile?.path
    if (!ownerPhotoLocalPath) {
        throw new ApiError(400, "Owner Photo is required")
    }

    const theatreImagesLength = theatreImagesFiles.length
    console.log("Theater images Length is: ", theatreImagesLength)

    if (theatreImagesLength === 0) {
        throw new ApiError(400, "Theathre image is required")
    }
    else if (theatreImagesLength < 5) {
        throw new ApiError(400, "Minimum 5 images of theatre are required")
    }
    else if (theatreImagesLength > 8) {
        throw new ApiError(400, "Maximum theatre images exceed. Maximum theatre image is 8")
    }

    const theatreImagesUrl = []

    const findOwner = await Theatre.findOne({
        $or: [
            { ownerEmail: ownerEmail },
            { ownerMobileNumber: ownerMobileNumber },
        ]
    })

    if (findOwner) {
        throw new ApiError(409, "Theatre owner already registered with this email or mobile number.")
    }

    const ownerPhoto = await uploadOnCloudinary(ownerPhotoLocalPath)

    if (!ownerPhoto || !ownerPhoto.secure_url) {
        throw new ApiError(500, "Failed to upload owner photo")
    }
    console.log("Owner photo uploaded details is: ", ownerPhoto)

    for (const image of theatreImagesFiles) {
        if (!image.path) {
            throw new ApiError(400, "Theatre image path is required")
        }
        console.log("Theatre image details are: ", image)
        const theatreImage = await uploadOnCloudinary(image?.path)
        if (!theatreImage || !theatreImage.secure_url) {
            throw new ApiError(500, "Failed to upload theatre image")
        }
        console.log("Theatre image uploaded details is: ", theatreImage)
        theatreImagesUrl.push(theatreImage?.secure_url)
    }

    console.log("Theatre all images url are: ", theatreImagesUrl)

    const newTheaterOwner = await Theatre.create({
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        ownerMobileNumber: ownerMobileNumber,
        ownerAlternateMobileNo: ((ownerAlternateMobileNo !== "") ? ownerAlternateMobileNo : ""),
        ownerAddress: {
            ownerCountry: ownerCountry,
            ownerCity: ownerCity,
            ownerState: ownerState,
            ownerDistrict: ownerDistrict,
            ownerPinCode: ownerPinCode,
            ownerTown: ((ownerTown !== "") ? ownerTown : ""),
            ownerLandMark: ownerLandMark
        },
        ownerImage: ownerPhoto.secure_url,
        ownerAadharNo: ownerAadharNo,
        ownerPanNumber: ownerPanNumber,
        theatreName: theatreName,
        theatreDescription: theatreDescription,
        theatreAddress: {
            theatreCountry: theatreCountry,
            theatreState: theatreState,
            theatreDistrict: theatreDistrict,
            theatrePinCode: theatrePinCode,
            theatreCity: theatreCity,
            theatreLandMark: theatreLandMark,
        },
        theatreStatus: "Pending",
        theatreIsBookingAvailable: theatreIsBookingAvailable === "Available",
        theatreContactNo: theatreContactNo,
        theatreGSTNumber: theatreGSTNumber,
        theatreImages: theatreImagesUrl,
    })

    if (!newTheaterOwner) {
        throw new ApiError(500, "Error while registering theater owner")
    }

    console.log("Theater owner details is: ", newTheaterOwner)
    console.log("Theatre registeration completed")

    await sendEmail({
        to: ownerEmail,
        subject: "CineVerse Theatre Registration Request Received",
        html: `<div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #333; background-color: #ffffff;">

    <h2 style="color: #2563eb; margin-bottom: 20px;">
        Theatre Registration Request Received
    </h2>

    <p>Dear Theatre Owner,</p>

    <p>
        Thank you for registering your theatre with <strong>CineVerse</strong>.
        We have successfully received your theatre registration request.
    </p>

    <div style="background-color: #eff6ff; padding: 15px; margin: 20px 0; border-left: 4px solid #2563eb;">

        <p style="margin: 0 0 8px 0;">
            <strong>Registration Status:</strong> Under Review
        </p>

        <p style="margin: 0;">
            Your application has been submitted successfully and is currently
            awaiting review by the CineVerse administration team.
        </p>

    </div>

    <h3 style="color: #333;">
        What Happens Next?
    </h3>

    <ol style="padding-left: 20px; line-height: 1.8;">

        <li>
            <strong>Your application will be reviewed by CineVerse.</strong>
        </li>

        <li>
            Verification usually takes <strong>12–24 hours</strong>.
        </li>

        <li>
            You will receive updates regarding your application
            <strong>via email</strong>.
        </li>

        <li>
            Once your registration is approved, you will receive your
            <strong>login password through email</strong>.
        </li>

        <li>
            After approval, you can log in to your
            <strong>Theatre Dashboard</strong> from the CineVerse landing page.
        </li>

    </ol>

    <div style="background-color: #f8fafc; padding: 15px; margin: 20px 0; border: 1px solid #e5e7eb;">

        <p style="margin: 0;">
            <strong>Important:</strong>
            Please keep an eye on your registered email address for updates
            regarding your theatre registration.
        </p>

    </div>

    <p>
        Thank you for choosing <strong>CineVerse</strong>.
        We appreciate your interest in joining our platform.
    </p>

    <p>
        Regards,<br>
        <strong>CineVerse Administration Team</strong>
    </p>

</div>`
    })


    return res.status(201)
        .json(new ApiResponse(201, "Owner Registered Successfully", {}))
})

const loginTheatreOwner = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    if (!email || !email?.trim()) {
        throw new ApiError(400, "Enter the email")
    }
    else if (!validator.isEmail(email?.trim())) {
        throw new ApiError(400, "Enter correct email")
    }

    if (!password || !password?.trim()) {
        throw new ApiError(400, "Enter the password")
    }
    else if (!passwordRegex.test(password?.trim())) {
        throw new ApiError(400, "Enter correct password")
    }

    console.log("Email is: ", email)
    console.log("Password is: ", password)

    const findUser = await Theatre.findOne({
        ownerEmail: email?.trim()
    })
        .select(" -ownerAadharNo -ownerPanNumber -theatreGSTNumber -ownerMobileNumber -ownerRefreshToken -ownerAlternateMobileNo -ownerAddress -ownerImage")

    if (!findUser) {
        throw new ApiError(404, "No any user Found.Register First")
    }

    if (findUser.theatreStatus !== "Approved") {
        throw new ApiError(404, "Only Approved theatre user can login. Wait till Admin verify your details.")
    }

    console.log("User details is: ", findUser)

    const { accessToken, refreshToken } = await genrateAccessRefreshToken(findUser)

    findUser.ownerRefreshToken = refreshToken
    await findUser.save();

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .cookie("partnerAccessToken", accessToken, options)
        .cookie("partnerRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Theatre User logined Successfully", { theatreOwnerDetails: findUser }))
})

const verifytheatreOwner = asyncHandler(async (req, res, next) => {
    const theatreData = req.theatre.toObject()
    console.log("Theatre data recived is: ", theatreData)
    const { ownerRefreshToken, updatedAt, createdAt, ...theatreDetails } = theatreData
    return res.status(200)
        .json(new ApiResponse(200, "Theatre Details verified"), theatreDetails)
})

const updateIncomingToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies?.partnerRefreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "UnAuthorized Thetre User")
    }
    console.log("Incoming refresh Token is: ", incomingRefreshToken)

    const theatreUserJwtVerify = await jwt.verify(incomingRefreshToken, process.env.THEATRE_REFRESH_TOKEN_SECRET)
    const getTheatreUser = await Theatre.findById(theatreUserJwtVerify._id)
        .select("-ownerPassword -ownerAadharNo -ownerPanNumber -theatreGSTNumber -ownerMobileNumber  -ownerAlternateMobileNo -ownerAddress -ownerImage")

    if (!getTheatreUser) {
        throw new ApiError(404, "No any Theatre User found")
    }

    if (getTheatreUser.ownerRefreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Invalid Refresh Token")
    }

    const { accessToken, refreshToken } = genrateAccessRefreshToken(findUser)

    getTheatreUser.ownerRefreshToken = refreshToken
    await getTheatreUser.save()

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .cookie("partnerAccessToken", accessToken, options)
        .cookie("partnerRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Tokem refreshed Successfully", { theatreUserDetails: getTheatreUser }))
})

const getUserTheatres = asyncHandler(async (req, res, next) => {

    const theatreData = req.theatre
    if (!theatreData) {
        throw new ApiError(403, "Forbidden User")
    }

    console.log("Theatre user id: ", theatreData._id.toString());

    const { theatreName, theatreIsBookingAvailable, theatreAddress } = theatreData

    console.log("Theatre Name is: ", theatreName)
    console.log("Theatre adress is: ", theatreAddress)
    console.log("Theatre availability is: ", theatreIsBookingAvailable)

    let theatreValue = {
        theatreName: theatreName,
        theatreAddress: theatreAddress,
        theatreAvailability: theatreIsBookingAvailable,
        theatreId: theatreData._id.toString()
    }

    return res.status(200)
        .json(new ApiResponse(200, "Theatre data fetched", [theatreValue]))

})

const addNewScreen = asyncHandler(async (req, res, next) => {

    const theatreData = req.theatre

    if (!theatreData) {
        throw new ApiError(401, "Unauthorized User")
    }

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre ID is required")
    }

    console.log("Theatre Id is: ", theatreId)
    console.log("Theatre user id is: ", theatreData._id)

    const { screenNumber, screenName, screenStatus, screenFormat, seatCategories } = req.body

    if (screenNumber === undefined || screenNumber === null || screenNumber === "") {
        throw new ApiError(400, "Screen Number is required")
    }
    if (!Number.isInteger(Number(screenNumber))) {
        throw new ApiError(400, "Screen number must be a whole number")
    }
    if (Number(screenNumber) < 1 || Number(screenNumber) > 30) {
        throw new ApiError(400, "Enter valid screen number")
    }
    if (!screenName || screenName.trim() === "") {
        throw new ApiError(400, "Screen Name is required")
    }
    if (!screenStatus || screenStatus.trim() === "") {
        throw new ApiError(400, "Screen Status is required")
    }
    if (!screenFormat || screenFormat.trim() === "") {
        throw new ApiError(400, "Screen Format is required")
    }
    if (!Array.isArray(seatCategories) || seatCategories.length === 0) {
        throw new ApiError(400, "Seat Category is required")
    }

    const allowedSeatTypes = ["Normal", "Premium", "Recliner"]

    const seatTypes = []


    for (let i = 0; i < seatCategories.length; i++) {

        const category = seatCategories[i]

        if (!category) {
            throw new ApiError(400, `Seat Category ${i + 1} is invalid`)
        }
        if (!category.seatType || category.seatType.trim() === "") {
            throw new ApiError(400, `Seat Type is required for Seat Category ${i + 1}`)
        }
        if (!allowedSeatTypes.includes(category.seatType)) {
            throw new ApiError(400, `Invalid seat type for Seat Category ${i + 1}`)
        }
        if (category.rows === undefined || category.rows === null || category.rows === "") {
            throw new ApiError(400, `Rows are required for ${category.seatType} seat`)
        }
        if (!Number.isInteger(Number(category.rows))) {
            throw new ApiError(400, `Rows must be a whole number for ${category.seatType} seat`)
        }
        if (Number(category.rows) < 1) {
            throw new ApiError(400, `Rows must be at least 1 for ${category.seatType} seat`)
        }
        if (category.columns === undefined || category.columns === null || category.columns === "") {
            throw new ApiError(400, `Columns are required for ${category.seatType} seat`)
        }
        if (!Number.isInteger(Number(category.columns))) {
            throw new ApiError(400, `Columns must be a whole number for ${category.seatType} seat`)
        }
        if (Number(category.columns) < 1) {
            throw new ApiError(400, `Columns must be at least 1 for ${category.seatType} seat`)
        }
        seatTypes.push(category.seatType)
    }

    const uniqueSeatTypes = new Set(seatTypes)

    if (uniqueSeatTypes.size !== seatTypes.length) {
        throw new ApiError(400, "Duplicate seat categories are not allowed")
    }

    console.log("Screen number is: ", screenNumber)
    console.log("Screen Name is: ", screenName)
    console.log("Screen status is: ", screenStatus)
    console.log("Screen Format is: ", screenFormat)
    console.log("Seat Category is: ", seatCategories)

    const getTheatre = await Theatre.findById(theatreId)

    if (!getTheatre) {
        throw new ApiError(404, "No Theatre found.")
    }

    if (getTheatre._id.toString() !== theatreData._id.toString()) {
        throw new ApiError(403, "You are not authorized to add a screen to this theatre")
    }

    console.log("Theatre Details is: ", getTheatre)

    const existingScreen = await Screen.findOne({
        theatreId: theatreId,
        screenNumber: Number(screenNumber)
    })

    if (existingScreen) {
        throw new ApiError(409, "This screen number already exists for this theatre")
    }

    let totalSeats = 0

    for (let i = 0; i < seatCategories.length; i++) {

        const category = seatCategories[i]

        totalSeats += Number(category.rows) * Number(category.columns)
    }

    const addScreen = await Screen.create({
        theatreId: theatreId,
        screenNumber: Number(screenNumber),
        screenName: screenName,
        screenStatus: screenStatus,
        screenFormat: screenFormat,
        totalSeats: totalSeats,
        seatCategories: seatCategories
    })


    if (!addScreen) {
        throw new ApiError(500, "Error while adding the screen")
    }

    console.log("Screen Details is: ", addScreen)

    return res.status(201)
        .json(new ApiResponse(201, "Screen is added", { screenDetails: addScreen }))
})

const getAllTheatreScreen = asyncHandler(async (req, res, next) => {

    const theatreData = req.theatre
    if (!theatreData) {
        throw new ApiError(401, "UnAuthorized User")
    }

    console.log("Theatre id is: ", theatreData._id)

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id is required")
    }

    console.log("Theatre ID is: ", theatreId)

    if (theatreData._id.toString() !== theatreId.toString()) {
        throw new ApiError(403, "You are not authorized to access this theatre")
    }

    const theatreScreen = await Screen.find({
        theatreId: theatreId
    })

    console.log("Theatre Screen are: ", theatreScreen)

    return res.status(200)
        .json(new ApiResponse(200, "Theatre Screen Fetched", { theatreScreen: theatreScreen }))

})

const theatreScreenDashboardApi = asyncHandler(async (req, res, next) => {
    const theatreData = req.theatre
    if (!theatreData) {
        throw new ApiError(401, "UnAuthorized User")
    }

    console.log("User Theatre ID is: ", theatreData._id)

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id is required")
    }

    console.log("Theatre id recived from params is: ", theatreId)

    if (theatreData._id.toString() !== theatreId.toString()) {
        throw new ApiError(403, "You are not authorized to access this theatre")
    }

    const getTheatreCompleteScreen = await Screen.find({
        theatreId: theatreId
    })

    console.log("Theatre All Screen are: ", getTheatreCompleteScreen)

    const totalScreen = getTheatreCompleteScreen.length

    let availableScreen = 0;
    let maintenanceScreen = 0;
    let closedScreen = 0;

    for (let i = 0; i < totalScreen; i++) {
        console.log("Screen is: ", getTheatreCompleteScreen[i])
        if (getTheatreCompleteScreen[i].screenStatus === "Available") {
            availableScreen++;
        }
        if (getTheatreCompleteScreen[i].screenStatus === "Maintenance") {
            maintenanceScreen++;
        }
        if (getTheatreCompleteScreen[i].screenStatus === "Closed") {
            closedScreen++;
        }
    }

    console.log("Total Screen is: ", totalScreen)
    console.log("Available Screen is: ", availableScreen)
    console.log("Maintainance Screen is: ", maintenanceScreen)
    console.log("Closed Screen is: ", closedScreen)

    const dashboardData = {
        totalScreen: totalScreen,
        availableScreen: availableScreen,
        maintenanceScreen: maintenanceScreen,
        closedScreen: closedScreen,
    }

    console.log("Dashboard Data to return is: ", dashboardData)

    return res.status(200)
        .json(new ApiResponse(200, "Dashboard Data fetched", { data: dashboardData }))
})

const completeTheatreScreenDetails = asyncHandler(async (req, res, next) => {

    const theatreData = req.theatre
    if (!theatreData) {
        throw new ApiError(400, "UnAuthorized User")
    }

    console.log("Theatre Id is: ", theatreData._id)

    const { screenId, theatreId } = req.params
    if (!screenId) {
        throw new ApiError(404, "Screen Id is required")
    }

    console.log("Screen id for complete screen details: ", screenId)

    if (!theatreId) {
        throw new ApiError(404, "Theatre Id is requird")
    }
    if (theatreId !== theatreData._id.toString()) {
        throw new ApiError(404, "Incorrect Theatre Id")
    }

    console.log("Theatre ID is: ", theatreId)

    const getScreenData = await Screen.findOne({
        theatreId: theatreId,
        _id: screenId
    });

    if (!getScreenData) {
        throw new ApiError(400, "No any Screen find")
    }

    console.log("Screen Details is: ", getScreenData)

    return res.status(200)
        .json(new ApiResponse(200, "Screen Details fetched", { screenData: getScreenData }))

})

const updateScreenStatus = asyncHandler(async (req, res, next) => {

    const theatreData = req.theatre

    if (!theatreData) {
        throw new ApiError(401, "Unauthorized User")
    }

    console.log("Theatre Id is: ", theatreData._id)

    const { screenId, theatreId } = req.params

    if (!screenId) {
        throw new ApiError(400, "Screen Id is required")
    }

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id is required")
    }

    if (theatreData._id.toString() !== theatreId.toString()) {
        throw new ApiError(403, "Incorrect Theatre Id")
    }

    console.log("Theatre Id is: ", theatreId)
    console.log("Screen Id is: ", screenId)

    const { screenStatus } = req.body

    if (!screenStatus || screenStatus.trim() === "") {
        throw new ApiError(400, "Screen Status is required")
    }

    const allowedStatuses = [
        "Available",
        "Maintenance",
        "Closed"
    ]

    if (!allowedStatuses.includes(screenStatus)) {
        throw new ApiError(400, "Invalid Screen Status")
    }

    console.log("Updated Screen Status is: ", screenStatus)

    const screenDetails = await Screen.findOne({
        _id: screenId,
        theatreId: theatreId
    })

    if (!screenDetails) {
        throw new ApiError(404, "No Screen Found for this theatre")
    }

    console.log("Screen Details is: ", screenDetails)

    screenDetails.screenStatus = screenStatus

    await screenDetails.save()

    console.log("Screen Status is updated")

    return res.status(200)
        .json(new ApiResponse(200, "Screen Status is updated", { screenData: screenDetails.screenStatus }))
})

export { registerTheatreOwner, loginTheatreOwner, verifytheatreOwner, updateIncomingToken, getUserTheatres, addNewScreen, getAllTheatreScreen, theatreScreenDashboardApi, completeTheatreScreenDetails, updateScreenStatus }