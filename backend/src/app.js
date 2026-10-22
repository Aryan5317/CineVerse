import express from "express"
import cors from "cors"
import userRouter from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoute.js";
import adminRouter from "./routes/adminRoute.js";
import theatreRouter from "./routes/theatreRoute.js";
import showsRouter from "./routes/showsRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
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
app.use("/cineVerse/app/api/movies", movieRouter)
app.use("/cineVerse/app/api/admin", adminRouter)
app.use("/cineVerse/app/api/theatre", theatreRouter)
app.use("/cineVerse/app/api/shows", showsRouter)
app.use("/cineVerse/app/api/payments", paymentRouter);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is Running"
    });
});

app.use(globalErrorHandler)

export default app;