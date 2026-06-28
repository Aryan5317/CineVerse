import nodemailer from "nodemailer"
import ApiError from "./errorHandling.js"
const transporter = nodemailer.createTransport({
    host: "74.125.24.108",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (options) => {
    console.log("Options value is: ", options)
    if (!options || !options.to) {
        throw new ApiError(400, "Recipient email is missing")
    }
    try {
        const emailInfo = await transporter.sendMail({
            from: `"CineVerse" <${process.env.SMTP_EMAIL}>`,
            ...options
        })
        console.log("Send Email is: ", emailInfo)
        console.log("Email id of the maid send is: ", emailInfo.messageId)
        return {
            success: true,
            message: "Email sent",
            emailInfo,
        };
    } catch (error) {
        console.log("Error while sending the message: ", error)
        throw new ApiError(500, "Failed to send email");
    }
}

export default sendEmail
