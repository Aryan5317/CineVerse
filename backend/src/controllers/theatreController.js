import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandling.js";
import ApiResponse from "../utils/apiResponse.js";
import { Theatre } from "../models/theatreModal.js";
import validator from "validator"
import uploadOnCloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken"

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

    console.log("Theatre user id: ", theatreData._id);

    const { theatreName, theatreIsBookingAvailable, theatreAddress } = theatreData

    console.log("Theatre Name is: ", theatreName)
    console.log("Theatre adress is: ", theatreAddress)
    console.log("Theatre availability is: ", theatreIsBookingAvailable)

    let theatreValue = {
        theatreName: theatreName,
        theatreAddress: theatreAddress,
        theatreAvailability: theatreIsBookingAvailable
    }

    return res.status(200)
        .json(new ApiResponse(200, "Theatre data fetched",  [theatreValue]))

})

export { registerTheatreOwner, loginTheatreOwner, verifytheatreOwner, updateIncomingToken, getUserTheatres }