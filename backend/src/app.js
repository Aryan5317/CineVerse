import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoutes.js";
import globalErrorHandler from "./utils/globalErrorHandle.js";
import cookieParser from "cookie-parser"

const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
); app.use(express.json())
app.use(cookieParser())

app.use("/cineVerse/app/api/users", userRouter)
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is Running"
    });
});

app.use(globalErrorHandler)

export default app;