import { Router } from "express";
import { registerTheatreOwner } from "../controllers/theatreController.js"
import upload from "../middlewares/multer.middleware.js";

const theatreRoute = Router()

theatreRoute.route("/register-theatre").post(upload.fields([
    { name: "ownerPhoto", maxCount: 1 },
    { name: "theatreImages", maxCount: 8 }
]), registerTheatreOwner)


export default theatreRoute