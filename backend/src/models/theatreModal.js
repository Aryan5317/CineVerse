import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const theatreSchema = new Schema({
    ownerName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    ownerEmail: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        index: true,
        unique: true,
        lowercase: true
    },
    ownerPassword: {
        type: String,
        trim: true,
    },
    ownerMobileNumber: {
        type: String,
        required: [true, "Mobile Number is required"],
        trim: true,
        index: true,
        unique: true,
    },
    ownerAlternateMobileNo: {
        type: String,
        trim: true,
        index: true,
    },
    ownerAddress: {
        ownerCountry: {
            type: String,
            default: "INDIA",
            trim: true,
        },
        ownerCity: {
            type: String,
            required: [true, "Owner City is required"],
            trim: true,
            index: true,
        },
        ownerState: {
            type: String,
            required: [true, "Owner State is required"],
            trim: true,
            index: true
        },
        ownerDistrict: {
            type: String,
            required: [true, "Owner District is required"],
            trim: true,
            index: true
        },
        ownerPinCode: {
            type: String,
            required: [true, "Owner PinCode is required"],
            index: true,
            trim: true,
        },
        ownerTown: {
            type: String,
            trim: true,
        },
        ownerLandMark: {
            type: String,
            required: [true, "Owner Landmark is required"],
            trim: true,
        }
    },
    ownerImage: {
        type: String,
        required: [true, "Owner Image is required"],
    },
    ownerAadharNo: {
        type: String,
        required: [true, "Owner Aadhar No is required"],
        trim: true,
        unique: true,
    },
    ownerPanNumber: {
        type: String,
        required: [true, "Owner PAN No is required"],
        trim: true,
        unique: true,
    },
    ownerRefreshToken: {
        type: String,
    },
    theatreName: {
        type: String,
        required: [true, "Theatre Name is required"],
        trim: true,
        index: true
    },
    theatreDescription: {
        type: String,
        required: [true, "Theatre Description is required"],
        trim: true,
    },
    theatreAddress: {
        theatreCountry: {
            type: String,
            default: "INDIA",
            trim: true,
        },
        theatreState: {
            type: String,
            required: [true, "Theatre State is required"],
            trim: true,
            index: true
        },
        theatreDistrict: {
            type: String,
            required: [true, "Theatre District is required"],
            trim: true,
            index: true
        },
        theatrePinCode: {
            type: String,
            required: [true, "Theatre PinCode is required"],
            index: true,
            trim: true,
        },
        theatreCity: {
            type: String,
            required: [true, "Theatre City is required"],
            trim: true,
        },
        theatreLandMark: {
            type: String,
            required: [true, "Theatre Landmark is required"],
            trim: true,
        }
    },
    theatreStatus: {
        type: String,
        required: [true, "Theatre Status is required"],
        enum: ["Pending", "Rejected", "NeedMoreDocuments", "Approved"],
        default: "Pending",
    },
    theatreApprovedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        index: true
    },
    theatreIsBookingAvailable: {
        type: Boolean,
        default: false,
    },
    theatreContactNo: {
        type: String,
        required: [true, "Theatre Contact No is required"],
        trim: true,
        unique: true,
        index: true,
    },
    theatreGSTNumber: {
        type: String,
        required: [true, "GST Number is required"],
        trim: true,
        unique: true,
    },
    theatreImages: [
        {
            type: String,
            required: [true, "Theatre Images is required"],
        }
    ]
}, { timestamps: true })

theatreSchema.pre("save", async function (next) {
    if (!(this.isModified("ownerPassword")))
        return
    this.ownerPassword = await bcrypt.hash(this.ownerPassword, 12)
})

theatreSchema.methods.isPasswordCorrect = async function (ownerPassword) {
    return await bcrypt.compare(ownerPassword, this.ownerPassword)
}

theatreSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        ownerEmail: this.ownerEmail,
        ownerName: this.ownerName,
    },
        process.env.THEATRE_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.THEATRE_ACCESS_TOKEN_EXPIRY
        })

}

theatreSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
        ownerEmail: this.ownerEmail,
        ownerName: this.ownerName
    }, process.env.THEATRE_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.THEATRE_REFRESH_TOKEN_EXPIRY
    })
}

export const Theatre = mongoose.model("Theatre", theatreSchema)
