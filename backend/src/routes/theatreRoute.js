import { Router } from "express";
import { registerTheatreOwner, loginTheatreOwner, verifytheatreOwner, updateIncomingToken, getUserTheatres, addNewScreen, getAllTheatreScreen, theatreScreenDashboardApi, completeTheatreScreenDetails, updateScreenStatus } from "../controllers/theatreController.js"
import upload from "../middlewares/multer.middleware.js";
import theatreJwtVerify from "../middlewares/theatreJWTmiddleware.js";

const theatreRouter = Router()

theatreRouter.route("/register-theatre").post(upload.fields([
    { name: "ownerPhoto", maxCount: 1 },
    { name: "theatreImages", maxCount: 8 }
]), registerTheatreOwner)
theatreRouter.route("/login").post(loginTheatreOwner)
theatreRouter.route("/verify-theatre").get(theatreJwtVerify, verifytheatreOwner)
theatreRouter.route("/refresh-access-token").post(updateIncomingToken)
theatreRouter.route("/theatre-details").get(theatreJwtVerify, getUserTheatres)
theatreRouter.route("/add-theatre-screen/:theatreId").post(theatreJwtVerify, addNewScreen)
theatreRouter.route("/all-theatre-screen/:theatreId").get(theatreJwtVerify, getAllTheatreScreen)
theatreRouter.route("/theatre-screen-dashboard/:theatreId").get(theatreJwtVerify, theatreScreenDashboardApi)
theatreRouter.route("/theatre-screen-conplete-details/:screenId/:theatreId").get(theatreJwtVerify, completeTheatreScreenDetails)
theatreRouter.route("/screen-status-update/:screenId/:theatreId").patch(theatreJwtVerify, updateScreenStatus)

export default theatreRouter