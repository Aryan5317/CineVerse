import { User } from "../models/userModal.js";
import ApiError from "../utils/errorHandling.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/apiResponse.js"
import validator from "validator"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js";
import { Shows } from "../models/showsModal.js";
import { Theatre } from "../models/theatreModal.js";
import { Screen } from "../models/screenModal.js";
import { Movie } from "../models/movieModal.js";
import { Booking } from "../models/bookingModel.js";


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

const movieDetailsBooking = asyncHandler(async (req, res, next) => {
    const userData = req.user;

    if (!userData) {
        throw new ApiError(401, "UnAuthorized User");
    }

    console.log("User data from req.user is: ", userData);

    const { movieId } = req.params;

    if (!movieId) {
        throw new ApiError(400, "Movie Id is required");
    }

    console.log("Movie id is: ", movieId);

    const { state, district } = req.query;

    if (!state?.trim()) {
        throw new ApiError(400, "State is required");
    }

    if (!district?.trim()) {
        throw new ApiError(400, "District is required");
    }

    const getMovieDetails = await Shows.findOne({
        movieId: movieId
    });

    if (!getMovieDetails) {
        throw new ApiError(404, "No Movie found");
    }

    console.log("Movie details is: ", getMovieDetails);

    const theatreId = getMovieDetails.theatreId;
    console.log("Theatre Id is: ", theatreId)

    const getTheatreData = await Theatre.findOne({
        _id: theatreId,
        "theatreAddress.theatreState": state.trim(),
        "theatreAddress.theatreDistrict": district.trim()
    });

    if (!getTheatreData) {
        throw new ApiError(404, "No theatre Found");
    }

    console.log("Theatre Data is: ", getTheatreData);

    const movieData = {
        _id: theatreId,
        MovieName: getMovieDetails.movieName,
        TheatreName: [getTheatreData.theatreName],
        TheatreAddress: getTheatreData.theatreAddress,
        ShowDate: [getMovieDetails.showsDate],
        ShowTimings: [getMovieDetails.showsStartTime]
    };

    console.log("Movie Data is: ", movieData);

    return res.status(200).json(
        new ApiResponse(200, "Movie Data fetched", { data: movieData })
    );
});

const getSeatsLayout = asyncHandler(async (req, res, next) => {
    const userData = req.user;
    if (!userData) {
        throw new ApiError(401, "UnAuthorized User");
    }
    console.log("User data from req.user is: ", userData);
    const { movieId, theatreId } = req.params;
    if (!movieId) {
        throw new ApiError(400, "Movie Id is required");
    }
    console.log("Movie id is: ", movieId);
    if (!theatreId) {
        throw new ApiError(400, "Theatre Id is required");
    }
    console.log("Movie id is: ", theatreId);
    const getMovieDetails = await Shows.findOne({
        movieId: movieId,
        theatreId: theatreId,
    });
    if (!getMovieDetails) {
        throw new ApiError(404, "No Movie found");
    }
    console.log("Movie details is: ", getMovieDetails);
    const screenId = getMovieDetails.screenId
    const getScreenDetails = await Screen.findOne({
        _id: screenId,
        theatreId: theatreId
    })
    if (!getScreenDetails) {
        throw new ApiError(404, "No scrren found");
    }
    console.log("Screen Details is: ", getScreenDetails);
    const seatData = {
        seats: getScreenDetails.seatCategories,
        screenFormat: getScreenDetails.screenFormat,
        seatPrice: getMovieDetails.seatPrices,
    }
    console.log("Seat Data are: ", seatData)
    return res.status(200)
        .json(new ApiResponse(200, "Seat Data fetched", { seatData: seatData }))
})

const verfiyTicketBookingDetails = asyncHandler(async (req, res) => {
    const userData = req.user;

    if (!userData?._id) {
        throw new ApiError(401, "Unauthorized User");
    }

    const { movieId, theatreId, screenId, showId, selectedSeats } = req.body;

    const ids = [movieId, theatreId, screenId, showId];

    if (
        ids.some(id => !id || !mongoose.Types.ObjectId.isValid(id)) ||
        !Array.isArray(selectedSeats) ||
        selectedSeats.length === 0
    ) {
        throw new ApiError(400, "Invalid booking details");
    }

    const seatIds = selectedSeats.map(seat => seat?.seatId);

    if (
        seatIds.some(id => typeof id !== "string" || !id.trim()) ||
        new Set(seatIds).size !== seatIds.length ||
        selectedSeats.some(seat =>
            !seat?.seatLabel ||
            !["Normal", "Premium", "Recliner"].includes(seat?.seatType)
        )
    ) {
        throw new ApiError(400, "Invalid or duplicate selected seats");
    }

    const user = await User.findById(userData._id).select("_id");

    if (!user) {
        throw new ApiError(401, "User account not found");
    }

    const [movie, theatre, screen, show] = await Promise.all([
        Movie.findOne({
            _id: movieId,
            isDeleted: false,
            availabilityType: { $in: ["Theatre", "Both"] }
        }),
        Theatre.findOne({
            _id: theatreId,
            theatreStatus: "Approved",
            theatreIsBookingAvailable: true
        }),
        Screen.findOne({
            _id: screenId,
            theatreId,
            screenStatus: "Available"
        }),
        Shows.findOne({
            _id: showId,
            movieId,
            theatreId,
            screenId,
            showStatus: "Scheduled"
        })
    ]);

    if (!movie) {
        throw new ApiError(404, "Movie not found or unavailable for theatre booking");
    }

    if (!theatre) {
        throw new ApiError(400, "Theatre is unavailable for booking");
    }

    if (!screen) {
        throw new ApiError(400, "Screen is unavailable");
    }

    if (!show) {
        throw new ApiError(404, "Scheduled show not found");
    }

    const now = new Date();
    const showDate = new Date(show.showsDate);
    const [hours, minutes] = show.showsStartTime.split(":").map(Number);

    if (
        Number.isNaN(showDate.getTime()) ||
        !Number.isInteger(hours) ||
        !Number.isInteger(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        throw new ApiError(400, "Invalid show date or time");
    }

    showDate.setHours(hours, minutes, 0, 0);

    if (showDate <= now) {
        throw new ApiError(400, "This show is no longer available for booking");
    }

    const screenCategories = new Set(
        screen.seatCategories.map(category => category.seatType)
    );

    const showPrices = new Map(
        show.seatPrices.map(item => [item.seatType, item.price])
    );

    const verifiedSeats = selectedSeats.map(seat => {
        if (!screenCategories.has(seat.seatType)) {
            throw new ApiError(400, `Invalid seat category: ${seat.seatType}`);
        }

        const price = showPrices.get(seat.seatType);

        if (!Number.isFinite(price) || price < 0) {
            throw new ApiError(400, `Price unavailable for ${seat.seatType} seats`);
        }

        return {
            seatId: seat.seatId.trim(),
            seatLabel: seat.seatLabel.trim(),
            seatType: seat.seatType,
            price
        };
    });

    const ticketSubtotal = verifiedSeats.reduce(
        (total, seat) => total + seat.price,
        0
    );

    const convenienceFee = 0;
    const totalAmount = ticketSubtotal + convenienceFee;

    const activeBookings = await Booking.find({
        showId: show._id,
        "selectedSeats.seatId": { $in: seatIds },
        $or: [
            {
                bookingStatus: "Confirmed",
                paymentStatus: "Paid"
            },
            {
                bookingStatus: "Pending",
                paymentStatus: "Pending",
                seatHoldExpiresAt: { $gt: now }
            }
        ]
    }).select("selectedSeats.seatId");

    const unavailableSeats = new Set(
        activeBookings.flatMap(booking =>
            booking.selectedSeats.map(seat => seat.seatId)
        )
    );

    const conflictingSeats = seatIds.filter(
        seatId => unavailableSeats.has(seatId)
    );

    if (conflictingSeats.length > 0) {
        throw new ApiError(
            409,
            `These seats are no longer available: ${conflictingSeats.join(", ")}`
        );
    }

    res.status(200).json({
        success: true,
        message: "Booking details verified successfully",
        data: {
            movieId: movie._id,
            movieName: movie.title,
            theatreId: theatre._id,
            theatreName: theatre.theatreName,
            screenId: screen._id,
            screenNumber: screen.screenNumber,
            showId: show._id,
            showDate: show.showsDate,
            showTime: show.showsStartTime,
            selectedSeats: verifiedSeats,
            ticketSubtotal,
            convenienceFee,
            totalAmount
        }
    });
});


export { registerUser, loginUser, logoutUser, refreshAccessToken, verifyUser, forgetPassword, verifyOTP, resetPassword, movieDetailsBooking, getSeatsLayout, verfiyTicketBookingDetails }


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
