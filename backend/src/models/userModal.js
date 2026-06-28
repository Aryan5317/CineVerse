import mongoose, { Schema, Types } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    mobileNumber: {
        type: String,
        // required: [true, "Mobile Number is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        // required: [true, "Password is required"],
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "theatreOwner"],
        required: [true, "Role is required"],
        trim: true,
        index: true,
        default: "user"
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    profileImageUrl: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!(this.isModified("password")))
        return
    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("otp") || !this.otp)
        return
    this.otp = await bcrypt.hash(this.otp, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.isOTPCorrect = async function (otp) {
    return await bcrypt.compare(otp, this.otp)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

userSchema.methods.genrateResetPasswordToken =  function () {
    return jwt.sign({
        _id: this._id,
        purpose: "password-reset"
    },
        process.env.RESET_PASSWORD_TOKEN_SECRET, {
        expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)