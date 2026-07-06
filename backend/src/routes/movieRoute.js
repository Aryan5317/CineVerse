import { Router } from "express"
import { addMovie } from "../controllers/movieController.js"
import upload from "../middlewares/multer.middleware.js"
const movieRouter = Router()

movieRouter.route("/addMovie").post(upload.single("moviePoster"), addMovie)

export default movieRouter
