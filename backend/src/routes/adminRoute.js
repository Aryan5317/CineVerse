import { Router } from "express"
import { createAdmin, loginAdmin, refreshAccessToken, verifyAdmin, logOutAdmin, getAllAdmin, fetchAdminDetails, updateAdmin, activateAdmin, deactivateAdmin } from "../controllers/adminController.js"
import adminJWTVerify from "../middlewares/adminJWTMiddleware.js"


const adminRouter = Router()
adminRouter.route("/login").post(loginAdmin)
adminRouter.route("/create-admin").post(adminJWTVerify, createAdmin)
adminRouter.route("/refresh-access-token").post(refreshAccessToken)
adminRouter.route("/current-admin").get(adminJWTVerify, verifyAdmin)
adminRouter.route("/logout").post(adminJWTVerify, logOutAdmin)
adminRouter.route("/get-all-admins").get(adminJWTVerify, getAllAdmin)
adminRouter.route("/update-admin/:id").patch(adminJWTVerify, updateAdmin)
adminRouter.route("/:id/activate").patch(adminJWTVerify, activateAdmin)
adminRouter.route("/:id/deactivate").patch(adminJWTVerify, deactivateAdmin)
adminRouter.route("/admin-detail/:id").get(adminJWTVerify, fetchAdminDetails)
export default adminRouter