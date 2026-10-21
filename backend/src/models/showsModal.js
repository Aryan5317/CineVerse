import mongoose, { Schema } from "mongoose"

const showsSchema = new Schema({

    theatreId: {
        type: Schema.Types.ObjectId,
        ref: "Theatre",
        required: true,
        index: true,
    },

    screenId: {
        type: Schema.Types.ObjectId,
        ref: "Screen",
        required: true,
        index: true
    },

    movieId: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        index: true,
    },

    movieName: {
        type: String,
        required: [true, "Movie name is required"],
        trim: true,
    },

    screenNumber: {
        type: Number,
        required: true,
        index: true,
    },
    showsStartTime: {
        type: String,
        required: [true, "Show time is required"],
        trim: true,
    },

    showsDuration: {
        type: Number,
        required: [true, "Show duration is required"],
        min: 1,
    },

    movieImage: {
        type: String,
        trim: true,
    },

    showsDate: {
        type: Date,
        required: [true, "Show date is required"],
        index: true,
    },

    showStatus: {
        type: String,
        required: [true, "Show status is required"],
        enum: ["Completed", "Cancelled", "Scheduled"],
        default: "Scheduled",
        index: true,
    },

    cancellationReason: {
        type: String,
        trim: true,
        default: "",
    },

    seatPrices: [
        {
            seatType: {
                type: String,
                required: [true, "Seat type is required"],
                enum: ["Normal", "Premium", "Recliner"],
            },

            price: {
                type: Number,
                required: [true, "Seat price is required"],
                min: 0,
            }
        }
    ],

    totalBookedSeats: {
        type: Number,
        default: 0,
        min: 0,
    },

    totalRevenue: {
        type: Number,
        default: 0,
        min: 0,
    },

    totalRefundAmount: {
        type: Number,
        default: 0,
        min: 0,
    }

}, { timestamps: true })

showsSchema.index(
    { theatreId: 1, screenId: 1, showsDate: 1 }
)

export const Shows = mongoose.model("Shows", showsSchema)