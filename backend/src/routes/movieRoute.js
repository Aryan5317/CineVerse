import { Router } from "express"
import { createMovie, giveAllActiveMovieByAdmin, getAllInActiveMovieByAdmin, getMovieDetails, getStreamingMovie, getTheatreMovies, editMovie, DeActivateMovie, activateMovie } from "../controllers/movieController.js"
import adminJWTVerify from "../middlewares/adminJWTMiddleware.js"
import jwtVerify from "../middlewares/userJWTMiddleware.js"
import upload from "../middlewares/multer.middleware.js"

const movieRouter = Router()

movieRouter.route("/createMovie").post(upload.any("moviePoster", "movieBanner"), adminJWTVerify, createMovie)
movieRouter.route("/all-active-movie").get(adminJWTVerify, giveAllActiveMovieByAdmin)
movieRouter.route("/all-inactive-movie").get(adminJWTVerify, getAllInActiveMovieByAdmin)
movieRouter.route("/admin/:movieId").get(adminJWTVerify, getMovieDetails)
movieRouter.route("/users/all-streaming").get(getStreamingMovie)
movieRouter.route("/users/all-theatre").get(getTheatreMovies)
movieRouter.route("/admin/edit-movie/:movieId").patch(adminJWTVerify, upload.fields([
    { name: "moviePosterUrl", maxCount: 1 },
    { name: "bannerUrl", maxCount: 1 }
]), editMovie)
movieRouter.route("/admin/:movieId/inActive").patch(adminJWTVerify, DeActivateMovie)
movieRouter.route("/admin/:movieId/active").patch(adminJWTVerify, activateMovie)
movieRouter.route("/user/:movieId").get(jwtVerify, getMovieDetails)

export default movieRouter
