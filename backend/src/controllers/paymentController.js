import crypto from "crypto";
import Razorpay from "razorpay";
import mongoose from "mongoose";

import { Booking } from "../models/bookingModel.js";
import { Shows } from "../models/showsModal.js";
import { Screen } from "../models/screenModal.js";
import { Theatre } from "../models/theatreModal.js";
import { Movie } from "../models/movieModal.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/errorHandling.js";
import ApiResponse from "../utils/apiResponse.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const HOLD_DURATION_MS = 10 * 60 * 1000;

const validateSeat = (screen, seat) => {
    const label = seat.seatLabel?.trim().toUpperCase();
    const match = label?.match(/^([A-Z]+)([1-9]\d*)$/);

    if (!match || !seat.seatId?.trim()) {
        throw new ApiError(400, "Invalid seat details");
    }

    const rowLabel = match[1];
    const column = Number(match[2]);

    const rowNumber = [...rowLabel].reduce(
        (total, character) =>
            total * 26 + character.charCodeAt(0) - 64,
        0
    );

    let firstRow = 1;

    for (const category of screen.seatCategories) {
        const lastRow = firstRow + category.rows - 1;

        if (rowNumber >= firstRow && rowNumber <= lastRow) {
            if (
                column > category.columns ||
                seat.seatType !== category.seatType
            ) {
                throw new ApiError(400, `Invalid seat: ${label}`);
            }

            return category.seatType;
        }

        firstRow = lastRow + 1;
    }

    throw new ApiError(400, `Seat does not exist: ${label}`);
};

const createRazorpayOrder = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const {
        movieId,
        theatreId,
        screenId,
        showId,
        selectedSeats,
        paymentMethod,
    } = req.body;

    const ids = [movieId, theatreId, screenId, showId];

    if (
        !userId ||
        ids.some(
            id =>
                typeof id !== "string" ||
                !mongoose.Types.ObjectId.isValid(id)
        ) ||
        !Array.isArray(selectedSeats) ||
        selectedSeats.length === 0 ||
        selectedSeats.length > 20
    ) {
        throw new ApiError(400, "Invalid booking details");
    }

    if (
        !["Card", "UPI", "NetBanking", "Wallet", "Other"].includes(
            paymentMethod
        )
    ) {
        throw new ApiError(400, "Invalid payment method");
    }

    const seatIds = selectedSeats.map(seat =>
        seat?.seatId?.trim().toUpperCase()
    );

    if (
        seatIds.some(id => !id) ||
        new Set(seatIds).size !== seatIds.length
    ) {
        throw new ApiError(400, "Invalid or duplicate seats");
    }

    const [movie, theatre, screen, show] = await Promise.all([
        Movie.findOne({
            _id: movieId,
            isDeleted: false,
            availabilityType: { $in: ["Theatre", "Both"] },
        }),
        Theatre.findOne({
            _id: theatreId,
            theatreStatus: "Approved",
            theatreIsBookingAvailable: true,
        }),
        Screen.findOne({
            _id: screenId,
            theatreId,
            screenStatus: "Available",
        }),
        Shows.findOne({
            _id: showId,
            movieId,
            theatreId,
            screenId,
            showStatus: "Scheduled",
        }),
    ]);

    if (!movie || !theatre || !screen || !show) {
        throw new ApiError(400, "Movie, theatre, screen, or show unavailable");
    }

    const showDate = new Date(show.showsDate);
    const timeMatch = show.showsStartTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/);

    if (!timeMatch || Number.isNaN(showDate.getTime())) {
        throw new ApiError(400, "Invalid show date or time");
    }

    showDate.setHours(Number(timeMatch[1]), Number(timeMatch[2]), 0, 0);

    if (showDate <= new Date()) {
        throw new ApiError(400, "This show has already started");
    }

    const prices = new Map(
        show.seatPrices.map(item => [item.seatType, item.price])
    );

    const verifiedSeats = selectedSeats.map(seat => {
        const seatType = validateSeat(screen, seat);
        const price = prices.get(seatType);

        if (!Number.isFinite(price) || price < 0) {
            throw new ApiError(400, "Seat price unavailable");
        }

        return {
            seatId: seat.seatId.trim().toUpperCase(),
            seatLabel: seat.seatLabel.trim().toUpperCase(),
            seatType,
            price,
        };
    });

    const ticketSubtotal = verifiedSeats.reduce(
        (sum, seat) => sum + seat.price,
        0
    );

    const convenienceFee = 0;
    const totalAmount = ticketSubtotal + convenienceFee;
    console.log("\n========== CINEVERSE PRICE DEBUG ==========");

    console.log("Selected seats with backend prices:");
    console.table(
        verifiedSeats.map((seat) => ({
            seatId: seat.seatId,
            seatLabel: seat.seatLabel,
            seatType: seat.seatType,
            price: seat.price
        }))
    );

    console.log("Ticket Subtotal:", ticketSubtotal);
    console.log("Convenience Fee:", convenienceFee);
    console.log("Total Amount (INR):", totalAmount);
    console.log("Total Amount (Paise):", Math.round(totalAmount * 100));

    console.log("===========================================\n");
    const amountInPaise = Math.round(totalAmount * 100);

    if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
        throw new ApiError(400, "Invalid payment amount");
    }

    const now = new Date();
    const seatHoldExpiresAt = new Date(now.getTime() + HOLD_DURATION_MS);
    let bookingId;
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const lockedShow = await Shows.findOneAndUpdate(
                {
                    _id: showId,
                    showStatus: "Scheduled",
                },
                { $inc: { bookingLockVersion: 1 } },
                { new: true, session }
            );

            if (!lockedShow) {
                throw new ApiError(409, "Show is no longer available");
            }

            const conflicts = await Booking.find({
                showId,
                "selectedSeats.seatId": { $in: seatIds },
                $or: [
                    {
                        bookingStatus: "Confirmed",
                        paymentStatus: "Paid",
                    },
                    {
                        bookingStatus: "Pending",
                        paymentStatus: "Pending",
                        seatHoldExpiresAt: { $gt: new Date() },
                    },
                ],
            }).session(session);

            if (conflicts.length) {
                throw new ApiError(409, "One or more seats are unavailable");
            }

            const [booking] = await Booking.create(
                [{
                    userId,
                    movieId,
                    theatreId,
                    screenId,
                    showId,
                    selectedSeats: verifiedSeats,
                    ticketSubtotal,
                    convenienceFee,
                    totalAmount,
                    paymentMethod,
                    bookingStatus: "Pending",
                    paymentStatus: "Pending",
                    seatHoldExpiresAt,
                }],
                { session }
            );

            bookingId = booking._id;
        });
    } finally {
        await session.endSession();
    }

    let order;

    const amountInINR = totalAmount;

    try {
        order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: String(bookingId),
            notes: {
                bookingId: String(bookingId),
                userId: String(userId),
            },
        });

        await Booking.updateOne(
            { _id: bookingId },
            { $set: { razorpayOrderId: order.id } }
        );
    } catch (error) {
        await Booking.updateOne(
            { _id: bookingId, paymentStatus: "Pending" },
            {
                $set: {
                    bookingStatus: "Expired",
                    seatHoldExpiresAt: null,
                },
            }
        );

        throw error;
    }

    return res.status(201).json({
        success: true,
        message: "Payment order created",
        data: {
            bookingId: String(bookingId),
            orderId: order.id,
            keyId: process.env.RAZORPAY_KEY_ID,
            amountInINR,
            amountInPaise: order.amount,
            currency: order.currency,
        },
    });
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const {
        bookingId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    if (
        !userId ||
        !mongoose.Types.ObjectId.isValid(bookingId || "") ||
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
    ) {
        throw new ApiError(400, "Missing payment verification details");
    }

    const booking = await Booking.findOne({
        _id: bookingId,
        userId,
    });

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (booking.paymentStatus === "Paid" && booking.bookingStatus === "Confirmed") {
        const confirmedBooking = await Booking.findById(booking._id)
            .populate("movieId")
            .populate("theatreId")
            .populate("screenId")
            .populate("showId");

        return res.status(200).json(
            new ApiResponse(
                200,
                "Booking is already confirmed",
                {
                    booking: confirmedBooking
                }
            )
        );
    }

    if (
        booking.bookingStatus !== "Pending" ||
        booking.paymentStatus !== "Pending" ||
        booking.razorpayOrderId !== razorpay_order_id
    ) {
        throw new ApiError(400, "Booking or Razorpay order is invalid");
    }

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    const provided = Buffer.from(razorpay_signature, "hex");
    const expected = Buffer.from(expectedSignature, "hex");

    if (
        provided.length !== expected.length ||
        !crypto.timingSafeEqual(provided, expected)
    ) {
        throw new ApiError(400, "Invalid payment signature");
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
        payment.order_id !== razorpay_order_id ||
        payment.amount !== Math.round(booking.totalAmount * 100) ||
        payment.currency !== "INR" ||
        payment.status !== "captured"
    ) {
        throw new ApiError(400, "Payment is not captured successfully");
    }

    if (!booking.seatHoldExpiresAt || booking.seatHoldExpiresAt <= new Date()) {
        throw new ApiError(
            409,
            "Seat hold expired. Contact support regarding this payment."
        );
    }

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            await Shows.findOneAndUpdate(
                { _id: booking.showId },
                { $inc: { bookingLockVersion: 1 } },
                { new: true, session }
            );

            const conflicts = await Booking.find({
                _id: { $ne: booking._id },
                showId: booking.showId,
                "selectedSeats.seatId": {
                    $in: booking.selectedSeats.map(seat => seat.seatId),
                },
                $or: [
                    {
                        bookingStatus: "Confirmed",
                        paymentStatus: "Paid",
                    },
                    {
                        bookingStatus: "Pending",
                        paymentStatus: "Pending",
                        seatHoldExpiresAt: { $gt: new Date() },
                    },
                ],
            }).session(session);

            if (conflicts.length) {
                throw new ApiError(409, "Seat availability conflict");
            }

            const updated = await Booking.updateOne(
                {
                    _id: booking._id,
                    userId,
                    bookingStatus: "Pending",
                    paymentStatus: "Pending",
                    seatHoldExpiresAt: { $gt: new Date() },
                },
                {
                    $set: {
                        paymentStatus: "Paid",
                        bookingStatus: "Confirmed",
                        razorpayPaymentId: razorpay_payment_id,
                        confirmedAt: new Date(),
                        seatHoldExpiresAt: null,
                    },
                },
                { session }
            );

            if (updated.modifiedCount !== 1) {
                throw new ApiError(409, "Booking could not be confirmed");
            }
        });
    } finally {
        await session.endSession();
    }

    const confirmedBooking = await Booking.findById(booking._id)
        .populate("movieId")
        .populate("theatreId")
        .populate("screenId")
        .populate("showId");

    if (!confirmedBooking) {
        throw new ApiError(404, "Confirmed booking details not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Payment verified and booking confirmed",
            {
                booking: confirmedBooking
            }
        )
    );
});


const paymentFailed = asyncHandler(async (req, res) => {

    const userId = req.user?._id;

    const {
        bookingId,
        orderId,
        paymentId,
        errorCode,
        errorDescription
    } = req.body;

    if (
        !userId ||
        !mongoose.Types.ObjectId.isValid(bookingId) ||
        typeof orderId !== "string" ||
        !orderId.trim()
    ) {
        throw new ApiError(400, "Invalid payment failure details");
    }

    const booking = await Booking.findOne({
        _id: bookingId,
        userId,
        razorpayOrderId: orderId,
        bookingStatus: "Pending",
        paymentStatus: "Pending"
    });

    if (!booking) {
        throw new ApiError(
            404,
            "Pending booking not found or booking is no longer available"
        );
    }

    console.log("\n========== CINEVERSE PAYMENT FAILED ==========");

    console.log("Booking ID:", bookingId);
    console.log("User ID:", userId);
    console.log("Order ID:", orderId);
    console.log("Payment ID:", paymentId || "Not available");
    console.log("Error Code:", errorCode || "Not available");
    console.log("Error Description:", errorDescription || "Not available");

    console.log("===============================================\n");

    booking.paymentFailure = {
        errorCode: errorCode || null,
        errorDescription: errorDescription || "Payment failed",
        failedAt: new Date()
    };

    await booking.save();

    return res.status(200)
        .json(new ApiResponse(200, "Payment failure recorded successfully", ""))
});

const getMyBookings = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized user");
    }

    const bookings = await Booking.find({
        userId,
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
    })
        .populate("movieId", "title moviePosterUrl language duration")
        .populate(
            "theatreId",
            "theatreName theatreAddress theatreContactNo"
        )
        .populate(
            "screenId",
            "screenName screenNumber"
        )
        .populate(
            "showId",
            "showsDate showsStartTime screenNumber"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, "User bookings fetched successfully", {
            bookings,
        })
    );
});


export { createRazorpayOrder, verifyRazorpayPayment, paymentFailed, getMyBookings }
