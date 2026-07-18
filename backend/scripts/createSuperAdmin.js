import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/db/index.js";
import { Admin } from "../src/models/adminModal.js";
dotenv.config({
    path: "./.env"
});

const preDefinedSuperAdmin = async () => {
    try {
        await connectDB()
        const existingSuperAdmin = await Admin.findOne({
            role: "superAdmin"
        })
        if (existingSuperAdmin) {
            console.log("Super Admin already exists.");
            await mongoose.connection.close();
            process.exit(0);
        }
        const superAdmin = await Admin.create({
            fullName: process.env.SUPER_ADMIN_NAME,
            email: process.env.SUPER_ADMIN_EMAIL,
            password: process.env.SUPER_ADMIN_PASSWORD,
            mobileNumber: process.env.SUPER_ADMIN_MOBILE_NUMBER,
            role: "superAdmin",
            joiningdate: new Date(process.env.SUPER_ADMIN_JOINING_DATE),
        });
        console.log("Super Admin created successfully.");
        console.log("Name:", superAdmin.fullName);
        console.log("Email:", superAdmin.email);
        console.log("Role:", superAdmin.role);
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.log("Error while connecting to db for seeding data", error)
        await mongoose.connection.close();
        process.exit(1)
    }
}

preDefinedSuperAdmin()