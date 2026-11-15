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
import mongoose from "mongoose";


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
        throw new ApiError(401, "Unauthorized User");
    }

    const { movieId } = req.params;

    if (!movieId) {
        throw new ApiError(400, "Movie Id is required");
    }

    const { state, district } = req.query;

    if (!state?.trim() || !district?.trim()) {
        throw new ApiError(400, "State and District are required");
    }

    const allShows = await Shows.find({
        movieId,
        showStatus: "Scheduled"
    }).sort({ showsDate: 1 });

    if (!allShows.length) {
        throw new ApiError(404, "No upcoming shows found");
    }

    const now = new Date();

    const upcomingShows = allShows.filter((show) => {
        const datePart = new Date(show.showsDate)
            .toISOString()
            .slice(0, 10);

        const showDateTime = new Date(
            `${datePart}T${show.showsStartTime}:00+05:30`
        );

        return showDateTime > now;
    });

    if (!upcomingShows.length) {
        throw new ApiError(404, "No upcoming shows available");
    }

    const theatreIds = [
        ...new Set(
            upcomingShows.map(show => String(show.theatreId))
        )
    ];

    const theatres = await Theatre.find({
        _id: { $in: theatreIds },
        "theatreAddress.theatreState": state.trim(),
        "theatreAddress.theatreDistrict": district.trim()
    });

    if (!theatres.length) {
        throw new ApiError(404, "No Theatre Found");
    }

    const getTheatreData = theatres[0];

    const theatreShows = upcomingShows.filter(
        show =>
            String(show.theatreId) === String(getTheatreData._id)
    );

    if (!theatreShows.length) {
        throw new ApiError(404, "No upcoming shows found for this theatre");
    }

    const showDateMap = new Map();

    theatreShows.forEach(show => {
        const date = new Date(show.showsDate)
            .toISOString()
            .slice(0, 10);

        if (!showDateMap.has(date)) {
            showDateMap.set(date, {
                date: show.showsDate,
                timings: []
            });
        }

        showDateMap.get(date).timings.push({
            _id: show._id,
            showId: show._id,
            screenId: show.screenId,
            showDate: show.showsDate,
            startTime: show.showsStartTime,
            showTime: show.showsStartTime
        });
    });

    const groupedDates = [...showDateMap.values()];

    const movieData = {
        _id: getTheatreData._id,
        MovieName: theatreShows[0].movieName,
        TheatreName: [getTheatreData.theatreName],
        TheatreAddress: getTheatreData.theatreAddress,

        ShowDate: groupedDates.map(item => item.date),

        ShowTimings: groupedDates.flatMap(
            item => item.timings
        )
    };

    console.log("Upcoming Theatre Shows:", movieData);

    return res.status(200).json(
        new ApiResponse(200, "Movie Data fetched", {
            data: movieData
        })
    );
});

const getSeatsLayout = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized User");
    }

    const { movieId, theatreId } = req.params;
    const { showId } = req.query;

    if (
        [movieId, theatreId, showId].some(
            (id) => typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)
        )
    ) {
        throw new ApiError(400, "Valid movie, theatre and show are required");
    }

    const show = await Shows.findOne({
        _id: showId,
        movieId,
        theatreId,
        showStatus: "Scheduled",
    });
    if (!show) {
        throw new ApiError(404, "Show not found");
    }

    const screen = await Screen.findOne({ _id: show.screenId, theatreId });
    if (!screen) {
        throw new ApiError(404, "Screen not found");
    }

    const bookings = await Booking.find({
        showId: show._id,
        $or: [
            { bookingStatus: "Confirmed", paymentStatus: "Paid" },
            {
                bookingStatus: "Pending",
                paymentStatus: "Pending",
                seatHoldExpiresAt: { $gt: new Date() },
                userId: { $ne: userId },
            },
        ],
    }).select("selectedSeats.seatId");

    const bookedSeats = [
        ...new Set(
            bookings.flatMap((b) =>
                b.selectedSeats.map((s) => s.seatId.toUpperCase())
            )
        ),
    ];

    return res.status(200).json(
        new ApiResponse(200, "Seat Data fetched", {
            seatData: {
                seats: screen.seatCategories,
                screenFormat: screen.screenFormat,
                seatPrice: show.seatPrices,
                screenId: screen._id,
                showId: show._id,
                bookedSeats,
            },
        })
    );
});

const validateSeatAgainstScreen = (screen, seat) => {
    const seatLabel = seat.seatLabel?.trim().toUpperCase();
    const seatId = seat.seatId?.trim();

    if (!seatLabel || !seatId) {
        throw new ApiError(400, "Seat ID and seat label are required");
    }

    const match = seatLabel.match(/^([A-Z]+)([1-9]\d*)$/);

    if (!match) {
        throw new ApiError(400, `Invalid seat label: ${seatLabel}`);
    }

    const rowLabel = match[1];
    const columnNumber = Number(match[2]);

    const rowToNumber = (label) =>
        [...label].reduce(
            (number, character) =>
                number * 26 + character.charCodeAt(0) - 64,
            0
        );

    const requestedRow = rowToNumber(rowLabel);

    let firstRow = 1;

    for (const category of screen.seatCategories) {
        const rowCount = Number(category.rows);
        const columnCount = Number(category.columns);

        if (
            !Number.isInteger(rowCount) ||
            !Number.isInteger(columnCount) ||
            rowCount < 1 ||
            columnCount < 1
        ) {
            throw new ApiError(500, "Invalid screen seat configuration");
        }

        const lastRow = firstRow + rowCount - 1;

        if (requestedRow >= firstRow && requestedRow <= lastRow) {
            if (columnNumber > columnCount) {
                throw new ApiError(
                    400,
                    `Seat ${seatLabel} does not exist on this screen`
                );
            }

            if (seat.seatType !== category.seatType) {
                throw new ApiError(
                    400,
                    `Invalid seat category for seat ${seatLabel}`
                );
            }

            return category.seatType;
        }

        firstRow = lastRow + 1;
    }

    throw new ApiError(
        400,
        `Seat ${seatLabel} does not exist on this screen`
    );
};

const verfiyTicketBookingDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized User");
    }

    const { movieId, theatreId, screenId, showId, selectedSeats } = req.body;

    const ids = [movieId, theatreId, screenId, showId];

    if (
        ids.some(
            (id) =>
                typeof id !== "string" ||
                !mongoose.Types.ObjectId.isValid(id)
        ) ||
        !Array.isArray(selectedSeats) ||
        selectedSeats.length === 0
    ) {
        throw new ApiError(400, "Invalid booking details");
    }

    if (selectedSeats.length > 20) {
        throw new ApiError(400, "You cannot select more than 20 seats");
    }

    const seatIds = selectedSeats.map((seat) => seat?.seatId);

    if (
        seatIds.some(
            (id) => typeof id !== "string" || !id.trim()
        ) ||
        new Set(seatIds.map((id) => id.trim().toUpperCase())).size !==
        seatIds.length ||
        selectedSeats.some(
            (seat) =>
                typeof seat?.seatLabel !== "string" ||
                typeof seat?.seatType !== "string" ||
                !["Normal", "Premium", "Recliner"].includes(seat.seatType)
        )
    ) {
        throw new ApiError(400, "Invalid or duplicate selected seats");
    }

    const user = await User.findById(userId).select("_id");

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
        throw new ApiError(
            404,
            "Movie not found or unavailable for theatre booking"
        );
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

    if (
        !Array.isArray(screen.seatCategories) ||
        screen.seatCategories.length === 0 ||
        !Array.isArray(show.seatPrices)
    ) {
        throw new ApiError(400, "Screen layout or show pricing is unavailable");
    }

    const showDate = new Date(show.showsDate);
    const timeMatch =
        typeof show.showsStartTime === "string"
            ? show.showsStartTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
            : null;

    if (Number.isNaN(showDate.getTime()) || !timeMatch) {
        throw new ApiError(400, "Invalid show date or time");
    }

    const [hours, minutes] = timeMatch.slice(1).map(Number);
    showDate.setHours(hours, minutes, 0, 0);

    const now = new Date();

    if (showDate <= now) {
        throw new ApiError(400, "This show is no longer available for booking");
    }

    const showPrices = new Map();

    for (const item of show.seatPrices) {
        if (
            !["Normal", "Premium", "Recliner"].includes(item.seatType) ||
            !Number.isFinite(item.price) ||
            item.price < 0 ||
            showPrices.has(item.seatType)
        ) {
            throw new ApiError(500, "Invalid show pricing configuration");
        }

        showPrices.set(item.seatType, item.price);
    }
    console.log("Selected seats received:", selectedSeats);

    const verifiedSeats = selectedSeats.map((seat) => {
        const seatType = validateSeatAgainstScreen(screen, seat);
        const price = showPrices.get(seatType);

        if (price === undefined) {
            throw new ApiError(
                400,
                `Price unavailable for ${seatType} seats`
            );
        }

        return {
            seatId: seat.seatId.trim().toUpperCase(),
            seatLabel: seat.seatLabel.trim().toUpperCase(),
            seatType,
            price
        };
    });

    const ticketSubtotal = verifiedSeats.reduce(
        (total, seat) => total + seat.price,
        0
    );

    const convenienceFee = 0;
    const totalAmount = ticketSubtotal + convenienceFee;

    const normalizedSeatIds = verifiedSeats.map((seat) => seat.seatId);

    const activeBookings = await Booking.find({
        showId: show._id,
        "selectedSeats.seatId": { $in: normalizedSeatIds },
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
        activeBookings.flatMap((booking) =>
            booking.selectedSeats.map((seat) =>
                seat.seatId.toUpperCase()
            )
        )
    );

    const conflictingSeats = normalizedSeatIds.filter((seatId) =>
        unavailableSeats.has(seatId)
    );

    if (conflictingSeats.length > 0) {
        throw new ApiError(
            409,
            `These seats are no longer available: ${conflictingSeats.join(", ")}`
        );
    }

    console.log("Booking verification completed successfully");
    console.log("Verified booking data:", {
        movieId: movie._id,
        theatreId: theatre._id,
        screenId: screen._id,
        showId: show._id,
        selectedSeats: verifiedSeats,
        totalAmount
    });

    return res.status(200).json({
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


export { registerUser, loginUser, logoutUser, refreshAccessToken, verifyUser, forgetPassword, verifyOTP, resetPassword, movieDetailsBooking, getSeatsLayout, verfiyTicketBookingDetails}


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
