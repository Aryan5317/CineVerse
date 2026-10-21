import mongoose, { Schema } from "mongoose";

const screenSchema = new Schema({
    theatreId: {
        type: Schema.Types.ObjectId,
        ref: "Theatre",
        required: true,
        index: true,
    },
    screenName: {
        type: String,
        required: true,
        trim: true,
    },
    screenNumber: {
        type: Number,
        required: true,
        index: true,
    },
    screenStatus: {
        type: String,
        required: true,
        trim: true,
        default: "Available",
        index: true,
        enum: ["Available", "Maintenance", "Closed"]
    },
    seatCategories: [
        {
            seatType: {
                type: String,
                enum: ["Normal", "Premium", "Recliner"],
                required: true,
                trim: true
            },
            rows: {
                type: Number,
                required: true,
                min: 1,
            },
            columns: {
                type: Number,
                required: true,
                min: 1,
            }
        }
    ],

    totalSeats: {
        type: Number,
        required: true,
        default: 0,
    },
    screenFormat: {
        type: String,
        enum: ["Standard", "IMAX", "3D", "4DX"],
        default: "Standard",
        required: true,
    }

}, { timestamps: true })

screenSchema.index(
    { theatreId: 1, screenNumber: 1 },
    { unique: true }
);

export const Screen = mongoose.model("Screen", screenSchema)