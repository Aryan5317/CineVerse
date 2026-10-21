import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/errorHandling.js";
import { Screen } from "../models/screenModal.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Shows } from "../models/showsModal.js";
import { Movie } from "../models/movieModal.js";

const getAllScreenDetails = asyncHandler(async (req, res, next) => {

    const theatreData = req.theatre

    if (!theatreData) {
        throw new ApiError(401, "Unauthorized User")
    }

    console.log("Theatre User Id is: ", theatreData._id)

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id required")
    }

    if (theatreId !== theatreData._id.toString()) {
        throw new ApiError(403, "Invalid Theatre Id")
    }

    console.log("Theatre Id is: ", theatreId)

    const screenDetails = await Screen.find({
        theatreId: theatreId
    }).select("-seatCategories -totalSeats -screenFormat")

    console.log("Screen Details are: ", screenDetails)

    return res.status(200)
        .json(
            new ApiResponse(
                200, "Screen fetched Successfully", { screens: screenDetails }
            ))
})

const theatreScreens = asyncHandler(async (req, res, next) => {
    const theatreData = req.theatre

    if (!theatreData) {
        throw new ApiError(401, "Unauthorized User")
    }

    console.log("Theatre User Id is: ", theatreData._id)

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id required")
    }

    if (theatreId !== theatreData._id.toString()) {
        throw new ApiError(403, "Invalid Theatre Id")
    }

    console.log("Theatre Id is: ", theatreId)

    const getScreens = await Screen.find({
        theatreId: theatreId,
        screenStatus: "Available"
    }).select("-totalSeats -screenFormat")

    console.log("Screen are: ", getScreens)

    return res.status(200)
        .json(new ApiResponse(200, "Screens fetched", { screens: getScreens }))


})

const addNewShow = asyncHandler(async (req, res, next) => {
    const theatreData = req.theatre

    if (!theatreData) {
        throw new ApiError(401, "Unauthorized Error")
    }

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id is required")
    }

    if (theatreData._id.toString() !== theatreId.toString()) {
        throw new ApiError(403, "Invalid Theatre Id")
    }

    const { movieName, screenNumber, showStatus, showsDate, showsDuration, showsStartTime, seatPrices } = req.body

    if (!movieName || movieName.trim() === "") {
        throw new ApiError(400, "Movie name is required")
    }

    const screenNumberValue = Number(screenNumber)

    if (!screenNumber || !Number.isInteger(screenNumberValue) || screenNumberValue < 1) {
        throw new ApiError(400, "Enter correct screen number")
    }

    const getScreenDetails = await Screen.findOne({
        theatreId: theatreData._id,
        screenNumber: screenNumberValue
    })

    if (!getScreenDetails) {
        throw new ApiError(404, "Screen not found for this theatre")
    }

    const allowedShowStatus = ["Cancelled", "Completed", "Scheduled"]

    if (!showStatus || !allowedShowStatus.includes(showStatus)) {
        throw new ApiError(400, "Enter correct show status")
    }

    if (!showsDate || showsDate.trim() === "") {
        throw new ApiError(400, "Show date is required")
    }

    const selectedDate = new Date(`${showsDate}T00:00:00`)
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    if (isNaN(selectedDate.getTime())) {
        throw new ApiError(400, "Enter a valid show date")
    }

    if (selectedDate < today) {
        throw new ApiError(400, "Selected show date has already passed")
    }

    const duration = Number(showsDuration)

    if (!showsDuration || !Number.isInteger(duration) || duration < 1) {
        throw new ApiError(400, "Enter correct show duration")
    }

    if (!showsStartTime || showsStartTime.trim() === "") {
        throw new ApiError(400, "Show start time is required")
    }

    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/

    if (!timePattern.test(showsStartTime)) {
        throw new ApiError(400, "Enter correct show start time")
    }

    if (!seatPrices || seatPrices.trim() === "") {
        throw new ApiError(400, "Seat prices are required")
    }

    let seatPriceData

    try {
        seatPriceData = JSON.parse(seatPrices)
    } catch (error) {
        throw new ApiError(400, "Invalid seat price data")
    }

    if (!Array.isArray(seatPriceData) || seatPriceData.length === 0) {
        throw new ApiError(400, "Seat prices are required")
    }

    const allowedSeatTypes = ["Normal", "Premium", "Recliner"]

    const receivedSeatTypes = new Set()

    for (const seat of seatPriceData) {
        if (!seat || !seat.seatType || seat.seatType.trim() === "") {
            throw new ApiError(400, "Seat type is required")
        }

        if (!allowedSeatTypes.includes(seat.seatType)) {
            throw new ApiError(400, "Invalid seat type")
        }

        if (receivedSeatTypes.has(seat.seatType)) {
            throw new ApiError(400, "Duplicate seat type is not allowed")
        }

        receivedSeatTypes.add(seat.seatType)

        const price = Number(seat.price)

        if (seat.price === undefined || seat.price === null || seat.price === "" || !Number.isFinite(price) || price < 0) {
            throw new ApiError(400, `Enter correct price for ${seat.seatType} seat`)
        }
        seat.price = price
    }

    for (const seatType of allowedSeatTypes) {
        if (!receivedSeatTypes.has(seatType)) {
            throw new ApiError(400, `${seatType} seat price is required`)
        }
    }

    console.log("Req body are: ", req.body)
    console.log("Req files are", req.file)
    const showImage = req.file
    console.log("Show image is: ", showImage)

    if (!showImage) {
        throw new ApiError(400, "Show image is required")
    }
    const showImagePath = showImage.path

    if (!showImagePath) {
        throw new ApiError(400, "Show image path is missing")
    }

    const movieData = await Movie.findOne({
        title: movieName.trim()
    })

    if (movieData != null) {
        const movieAvailability = movieData.availabilityType;
        if (movieAvailability === "Streaming") {
            movieData.availabilityType = "Both";
        }
        await movieData.save();
    }

    const movieId = movieData ? movieData._id : null
    const [startHours, startMinutes] = showsStartTime.split(":").map(Number)
    const startTotalMinutes = startHours * 60 + startMinutes
    const endTotalMinutes = startTotalMinutes + duration
    const endHours = Math.floor(endTotalMinutes / 60) % 24
    const endMinutes = endTotalMinutes % 60
    const endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`

    const existingShows = await Shows.find({
        theatreId: theatreData._id,
        screenId: getScreenDetails._id,
        showsDate: showsDate,
        showStatus: { $ne: "Cancelled" }
    })

    for (const existingShow of existingShows) {
        const [existingStartHours, existingStartMinutes] = existingShow.showsStartTime.split(":").map(Number)
        const existingStartTotalMinutes = existingStartHours * 60 + existingStartMinutes
        const existingDuration = Number(existingShow.showsDuration)
        const existingEndTotalMinutes = existingStartTotalMinutes + existingDuration
        const newShowStartsBeforeExistingEnds = startTotalMinutes < existingEndTotalMinutes
        const newShowEndsAfterExistingStarts = endTotalMinutes > existingStartTotalMinutes
        if (newShowStartsBeforeExistingEnds && newShowEndsAfterExistingStarts) {
            throw new ApiError(400, `Show overlaps with an existing show from ${existingShow.showsStartTime}`)
        }
    }

    const showImageUrl = await uploadOnCloudinary(showImagePath)

    if (!showImageUrl || !showImageUrl.secure_url) {
        throw new ApiError(500, "Failed to upload show image")
    }

    const createShow = await Shows.create({
        theatreId: theatreData._id,
        screenId: getScreenDetails._id,
        movieId: movieId,
        movieName: movieName.trim(),
        screenNumber: screenNumber,
        showsStartTime: showsStartTime,
        showsDuration: duration,
        movieImage: showImageUrl.secure_url,
        showsDate: showsDate,
        showStatus: showStatus,
        seatPrices: seatPriceData
    })

    if (!createShow) {
        throw new ApiError(500, "Error while creating show")
    }

    console.log("Show created successfully")
    console.log("Show details are: ", createShow)

    return res.status(201)
        .json(new ApiResponse(201, "Show created successfully", { show: createShow }))
})

const getAllScreenShow = asyncHandler(async (req, res, next) => {
    const theatreData = req.theatre
    if (!theatreData) {
        throw new ApiError(401, "Unauthorized Error")
    }

    const { theatreId } = req.params

    if (!theatreId) {
        throw new ApiError(400, "Theatre Id is required")
    }

    if (theatreData._id.toString() !== theatreId.toString()) {
        throw new ApiError(403, "Invalid Theatre Id")
    }

    const { screenNumber, screenStatusData, showDate } = req.query;

    if (!screenNumber && (!showDate || showDate.trim() === "")) {
        throw new ApiError(403, "Screen Data is required")
    }
    console.log("Screen Number is: ", screenNumber)
    console.log("Show Date is: ", showDate)

    const query = {
        theatreId: theatreId,
    }
    if (screenNumber != null && screenNumber != "All") {
        query.screenNumber = screenNumber
    }

    if (showDate == null && showDate == "") {
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        query.showsDate = { $gte: today }
    }
    if (showDate != null && showDate != "") {
        query.showsDate = showDate
    }

    if (screenStatusData != null && screenStatusData != "") {
        query.showStatus = screenStatusData
    }
    console.log("Query is: ", query)

    const shows = await Shows.find(query)
    console.log("Shows data are: ", shows)

    return res.status(200)
        .json(new ApiResponse(200, "Show fetched Successfully", { showsData: shows }))
})

export { getAllScreenDetails, theatreScreens, addNewShow, getAllScreenShow }