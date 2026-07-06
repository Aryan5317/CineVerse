import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        await fs.unlink(localFilePath);

        console.log("File uploaded successfully:", response.secure_url);

        return response;
    } catch (error) {
        console.log("Cloudinary upload error:", error.message);

        try {
            if (localFilePath) {
                await fs.unlink(localFilePath);
            }
        } catch (unlinkError) {
            console.log("Error deleting local file:", unlinkError.message);
        }

        return null;
    }
};

export default uploadOnCloudinary;