import { Router } from "express"
import { addMovie, giveAllMovie } from "../controllers/movieController.js"
import adminJWTVerify from "../middlewares/adminJWTMiddleware.js"

import upload from "../middlewares/multer.middleware.js"
const movieRouter = Router()

// movieRouter.route("/addMovie").post(upload.single("moviePoster"), addMovie)
movieRouter.route("/addMovie").post(upload.any("moviePoster", "movieBanner"), adminJWTVerify, addMovie)
movieRouter.route("/get-all-movie").get(adminJWTVerify, giveAllMovie)

export default movieRouter
