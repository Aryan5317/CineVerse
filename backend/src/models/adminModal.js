import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["superAdmin", "admin"],
        default: "admin",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
    joiningdate: {
        type: Date,
        required: true
    }
}, { timestamps: true })


adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return
    }
    this.password = await bcrypt.hash(this.password, 12)
})

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },

        process.env.ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY
    })
}

export const Admin = mongoose.model("Admin", adminSchema)
