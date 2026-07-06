import { Router } from "express"
import { createAdmin, loginAdmin, verifyAdmin, logOutAdmin, getAllAdmin, updateAdmin, activateAdmin, deactivateAdmin} from "../controllers/adminController.js"
import adminJWTVerify from "../middlewares/adminJWTMiddleware.js"


const adminRouter = Router()
adminRouter.route("/login").post(loginAdmin)
adminRouter.route("/create-admin").post(adminJWTVerify, createAdmin)
adminRouter.route("/current-admin").get(adminJWTVerify, verifyAdmin)
adminRouter.route("/logout").post(adminJWTVerify, logOutAdmin)
adminRouter.route("/get-all-admins").get(adminJWTVerify, getAllAdmin)
adminRouter.route("/update-admin/:id").patch(adminJWTVerify, updateAdmin)
adminRouter.route("/admin/:id/activate").patch(adminJWTVerify, activateAdmin)
adminRouter.route("/admin/:id/deactivate").patch(adminJWTVerify, deactivateAdmin)
export default adminRouter