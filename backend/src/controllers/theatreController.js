import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandling.js";
import ApiResponse from "../utils/apiResponse.js";
import { Theatre } from "../models/theatreModal.js";
import validator from "validator"
import uploadOnCloudinary from "../utils/cloudinary.js";

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

    return res.status(201)
        .json(new ApiResponse(201, "Owner Registered Successfully", {}))
})

export { registerTheatreOwner }