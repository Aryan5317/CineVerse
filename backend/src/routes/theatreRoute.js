import { Router } from "express";
import { registerTheatreOwner, loginTheatreOwner, verifytheatreOwner, updateIncomingToken, getUserTheatres } from "../controllers/theatreController.js"
import upload from "../middlewares/multer.middleware.js";
import theatreJwtVerify from "../middlewares/theatreJWTmiddleware.js";

const theatreRoute = Router()

theatreRoute.route("/register-theatre").post(upload.fields([
    { name: "ownerPhoto", maxCount: 1 },
    { name: "theatreImages", maxCount: 8 }
]), registerTheatreOwner)
theatreRoute.route("/login").post(loginTheatreOwner)
theatreRoute.route("/verify-theatre").get(theatreJwtVerify, verifytheatreOwner)
theatreRoute.route("/refresh-access-token").post(updateIncomingToken)
theatreRoute.route("/theatre-details").get(theatreJwtVerify, getUserTheatres)


export default theatreRoute