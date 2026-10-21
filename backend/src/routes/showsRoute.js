import { Router } from "express"
import { getAllScreenDetails, theatreScreens, addNewShow, getAllScreenShow } from "../controllers/showsController.js"
import theatreJwtVerify from "../middlewares/theatreJWTmiddleware.js"
import upload from "../middlewares/multer.middleware.js"
const showsRouter = Router()

showsRouter.route("/get-screens/:theatreId").get(theatreJwtVerify, getAllScreenDetails)
showsRouter.route("/get-active-screen/:theatreId").get(theatreJwtVerify, theatreScreens)
showsRouter.route("/add-new-show/:theatreId").post(upload.single("showImage"), theatreJwtVerify, addNewShow)
showsRouter.route("/get-screen-shows/:theatreId").get(theatreJwtVerify, getAllScreenShow)


export default showsRouter