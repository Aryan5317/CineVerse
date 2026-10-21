
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
        index: true
    },
    theatreId: {
        type: Schema.Types.ObjectId,
        ref: "Theatre",
        required: true,
        index: true
    },
    screenId: {
        type: Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
        index: true
    },
    showId: {
        type: Schema.Types.ObjectId,
        ref: "Shows",
        required: true,
        index: true
    },
    selectedSeats: [
        {
            seatId: {
                type: String,
                required: true
            },
            seatLabel: {
                type: String,
                required: true
            },
            seatType: {
                type: String,
                enum: ["Normal", "Premium", "Recliner"],
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    ticketSubtotal: {
        type: Number,
        required: true,
        min: 0
    },
    convenienceFee: {
        type: Number,
        default: 0,
        min: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Expired"],
        default: "Pending",
        index: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
        index: true
    },
    paymentMethod: {
        type: String,
        enum: ["Card", "UPI", "NetBanking", "Wallet", "Other"],
        default: "Other"
    },
    razorpayOrderId: {
        type: String,
        sparse: true,
        index: true
    },
    razorpayPaymentId: {
        type: String,
        sparse: true,
        index: true
    },
    seatHoldExpiresAt: {
        type: Date,
        default: null,
        index: true
    },
    confirmedAt: {
        type: Date,
        default: null
    },
    cancelledAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

bookingSchema.index({
    userId: 1,
    createdAt: -1
});

bookingSchema.index({
    showId: 1,
    bookingStatus: 1,
    paymentStatus: 1
});

export const Booking = mongoose.model("Booking", bookingSchema);
