import { Router } from "express"
import { addMovie, giveAllMovieByAdmin, getMovieDetails, getAllMovie } from "../controllers/movieController.js"
import adminJWTVerify from "../middlewares/adminJWTMiddleware.js"
import jwtVerify from "../middlewares/userJWTMiddleware.js"
import upload from "../middlewares/multer.middleware.js"

const movieRouter = Router()

// movieRouter.route("/addMovie").post(upload.single("moviePoster"), addMovie)
movieRouter.route("/addMovie").post(upload.any("moviePoster", "movieBanner"), adminJWTVerify, addMovie)
movieRouter.route("/get-all-movie").get(adminJWTVerify, giveAllMovieByAdmin)
movieRouter.route("/admin/:movieId").get(adminJWTVerify, getMovieDetails)
movieRouter.route("/users/all-movie").get(getAllMovie)
movieRouter.route("/user/:movieId").get(jwtVerify, getMovieDetails)

export default movieRouter
