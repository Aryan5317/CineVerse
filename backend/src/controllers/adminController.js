import ApiError from "../utils/errorHandling.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Admin } from "../models/adminModal.js";
import validator from "validator"
import jwt from "jsonwebtoken"
import { Movie } from "../models/movieModal.js";
import { Theatre } from "../models/theatreModal.js";
import sendEmail from "../utils/sendEmail.js";

const genrateAccessRefreshToken = (findAdmin) => {
    try {
        const accessToken = findAdmin.generateAccessToken()
        const refreshToken = findAdmin.generateRefreshToken()
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("Error while genrating the token", error)
        throw error;
    }
}

const loginAdmin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (!email?.trim()) {
        throw new ApiError(401, "Email is required")
    }
    else if (!validator.isEmail(email)) {
        throw new ApiError(401, "Enter correct email format")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    else if (!passwordRegix.test(password)) {
        throw new ApiError(401, "Invalid password");
    }

    console.log("Email is: ", email)
    console.log("Passowrd is: ", password)

    const findAdmin = await Admin.findOne({
        email: email
    })

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    if (!findAdmin.isActive) {
        throw new ApiError(403, "Admin account is deactivated");
    }

    console.log("Admin is: ", findAdmin)

    const checkPassword = await findAdmin.isPasswordCorrect(password)

    if (!checkPassword) {
        throw new ApiError(400, "Enter correct password")
    }

    const { accessToken, refreshToken } = genrateAccessRefreshToken(findAdmin)
    const lastActive = new Date()

    findAdmin.lastLogin = lastActive
    findAdmin.refreshToken = refreshToken

    await findAdmin.save({
        validateBeforeSave: false,
    });

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    const loggedInAdmin = await Admin.findById(findAdmin._id)
        .select("-password -refreshToken -__v");

    return res.status(200)
        .cookie("adminAccessToken", accessToken, options)
        .cookie("adminRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Admin login Successfully", loggedInAdmin))
})

const createAdmin = asyncHandler(async (req, res, next) => {
    const mainAdmin = req.admin
    if (mainAdmin.role !== "superAdmin") {
        throw new ApiError(403, "Only Super Admin can create a new admin");

    }
    const { fullName, email, password, mobileNumber, joiningdate } = req.body
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    console.log("Email is: ", email)
    console.log("Passowrd is: ", password)
    console.log("Joining Date is: ", joiningdate)
    console.log("Mobile Number is: ", mobileNumber)
    console.log("Full name is: ", fullName)
    if (!fullName?.trim()) {
        throw new ApiError(401, "FullName is required")
    }
    if (!email?.trim()) {
        throw new ApiError(401, "Email is required")
    }
    else if (!validator.isEmail(email)) {
        throw new ApiError(401, "Enter correct email format")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    else if (!passwordRegix.test(password)) {
        throw new ApiError(401, "Invalid password");
    }
    if (!mobileNumber) {
        throw new ApiError(400, "Mobile Number is required")
    }
    else if (!validator.isMobilePhone(mobileNumber.trim(), "en-IN")) {
        throw new ApiError(401, "Enter correct Mobile Number")
    }
    if (!joiningdate) {
        throw new ApiError(401, "Joining Date is required")
    }


    const findAdmin = await Admin.findOne({
        email: email.trim()
    })

    if (findAdmin) {
        throw new ApiError(409, "Admin already found.")
    }

    const admin = await Admin.create({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        mobileNumber: mobileNumber.trim(),
        joiningdate: joiningdate
    })


    if (!admin) {
        throw new ApiError(500, "Error while creating the admin")
    }

    console.log("Admin details created: ", admin)
    const adminDetails = await Admin.findOne({
        email: email
    })
        .select("-password -refreshToken -__v");
    return res.status(201)
        .json(new ApiResponse(201, "Admin Created", adminDetails))

})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies?.adminRefreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "UnAuthorized Admin")
    }
    console.log("Incoming refresh Token: ", incomingRefreshToken)

    const jwtAdminVerify = jwt.verify(incomingRefreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET)
    const findAdmin = await Admin.findById(jwtAdminVerify._id)

    if (!findAdmin) {
        throw new ApiError(404, "No any admin found.")
    }

    if (incomingRefreshToken !== findAdmin.refreshToken) {
        throw new ApiError(401, "Invalid refresh Token")
    }

    const { accessToken, refreshToken } = genrateAccessRefreshToken(findAdmin)

    findAdmin.refreshToken = refreshToken

    await findAdmin.save({
        validateBeforeSave: false,
    })

    console.log("Token refreshed Successfully");

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    return res.status(200)
        .cookie("adminAccessToken", accessToken, options)
        .cookie("adminRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Token refreshed Successfully", {
            newAccessToken: accessToken,
            newRefreshToken: refreshToken
        }))



})

const verifyAdmin = asyncHandler(async (req, res, next) => {
    const adminData = req.admin.toObject()
    const { __v, updatedAt, refreshToken, ...adminDetails } = adminData
    console.log("Admin details verified")
    return res.status(200)
        .json(new ApiResponse(200, "Admin Details verified", adminDetails))
})

const logOutAdmin = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (!adminData) {
        throw new ApiError(401, "UnAuthorized Admin")
    }
    console.log("Admin details is: ", adminData)
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    }

    console.log("Admin logOut Successfully")
    return res.status(200)
        .clearCookie("adminAccessToken", options)
        .clearCookie("adminRefreshToken", options)
        .json(new ApiResponse(200, "Admin LogOut", {}))

})

const getAllAdmin = asyncHandler(async (req, res, next) => {
    const superAdminData = req.admin
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    const getAllAdminData = await Admin.find({
        role: "admin"
    })
        .select("-password -__v -updatedAt")

    console.log("All admin data are: ", getAllAdminData)

    return res.status(200)
        .json(new ApiResponse(200, "All admin data retrived", getAllAdminData))
})

const fetchAdminDetails = asyncHandler(async (req, res, next) => {
    const superAdminData = req.admin
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    const { id } = req.params;
    console.log("Admin Id is: ", id)

    const adminDetails = await Admin.findById(id)
        .select("-password -__v")

    if (!adminDetails) {
        throw new ApiError(400, "Admin Id is required")
    }

    console.log("Admin details fetched is: ", adminDetails)

    return res.status(200)
        .json(new ApiResponse(200, "Admin details fetched", adminDetails))


})

const updateAdmin = asyncHandler(async (req, res, next) => {
    const superAdminData = req.admin
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    const { id } = req.params;
    const { fullName, mobileNumber, joiningdate } = req.body;

    if (!id) {
        throw new ApiError(400, "Admin Id is required")
    }
    console.log("Admin id is: ", id)

    const findAdmin = await Admin.findById(id)
        .select("-password -__v")

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    console.log("Admin Details to update is: ", findAdmin)

    if (mobileNumber?.trim() && !validator.isMobilePhone(mobileNumber?.trim(), "en-IN")) {
        throw new ApiError(400, "Enter correct mobile number")
    }
    if (mobileNumber?.trim()) {
        const checkAdminExist = await Admin.findOne(
            {
                $and:
                    [

                        {
                            mobileNumber: mobileNumber.trim()
                        },
                        {
                            role: "admin"
                        }
                    ]
            })
        if (checkAdminExist && checkAdminExist?._id.toString() !== id) {
            throw new ApiError(409, "Another Admin exist with same mobile number.")
        }
    }
    if (mobileNumber?.trim() && findAdmin.mobileNumber !== mobileNumber.trim()) {
        findAdmin.mobileNumber = mobileNumber?.trim()
        console.log("Admin mobile number to update is: ", mobileNumber)
    }

    if (findAdmin.fullName !== fullName && fullName?.trim()) {
        findAdmin.fullName = fullName?.trim()
        console.log("Admin fullname to update is: ", fullName)
    }

    if (joiningdate && findAdmin.joiningdate !== joiningdate) {
        findAdmin.joiningdate = joiningdate
        console.log("Admin Joining date update is: ", joiningdate)
    }

    await findAdmin.save();

    return res.status(200)
        .json(new ApiResponse(200, "Admin details updated successfull", findAdmin))
})

const activateAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const superAdminData = req.admin;
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin role from middleware is: ", superAdminData.role)

    console.log("Admin id is: ", id)

    const findAdmin = await Admin.findById(id)
        .select("-password -__v")

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    console.log("Admin Details to update is: ", findAdmin)

    // if(findAdmin.isActive){
    //     throw new ApiError(400, "Admin is already active.")
    // }

    findAdmin.isActive = true;
    await findAdmin.save()

    console.log("Admin is active now")

    return res.status(200)
        .json(new ApiResponse(200, "Admin is active now", findAdmin))

})

const deactivateAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const superAdminData = req.admin;
    if (superAdminData.role !== "superAdmin") {
        throw new ApiError(403, "Forbidden Admin")
    }
    console.log("Admin role from middleware is: ", superAdminData.role)

    console.log("Admin id is: ", id)

    const findAdmin = await Admin.findById(id)
        .select("-password -__v")

    if (!findAdmin) {
        throw new ApiError(404, "Admin not found.")
    }

    console.log("Admin data is: ", findAdmin)

    if (findAdmin.role === "superAdmin") {
        throw new ApiError(400, "Super Admin account cannot be deactivated")
    }

    if (!findAdmin.isActive) {
        throw new ApiError(400, "Admin already deactivated")
    }

    findAdmin.isActive = false;
    await findAdmin.save();

    console.log("Admin is deactivated")

    return res.status(200)
        .json(new ApiResponse(200, "Admin is deactivated", findAdmin))
})

const adminDashBoard = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (!adminData || adminData.role !== "admin") {
        throw new ApiError(401, "UnAuthorized Admin")
    }
    console.log("Admin id is: ", adminData._id)
    const movieCount = await Movie.find({
        createdBy: adminData._id
    })

    console.log("Total Movie Count is: ", movieCount.length)

    const theatreRequestCount = await Theatre.find({
        theatreStatus: "Pending"
    })

    console.log("Theatre Request count is: ", theatreRequestCount.length)

    return res.status(200)
        .json(new ApiResponse(200, "Dashboard Data fetched Successfully", {
            TotalMovie: movieCount.length,
            TheatrePendingRequest: theatreRequestCount.length
        }))
})

const theatrePendingRequest = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (!adminData || adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Error")
    }
    console.log("Admin id is: ", adminData._id)

    const { theatreStatus } = req.query
    console.log("Theatre Status is: ", theatreStatus)

    let query = {};

    if (theatreStatus === "Pending") {
        query.theatreStatus = "Pending";
    } else if (theatreStatus === "Resubmitted") {
        query.theatreStatus = "NeedMoreDocuments";
    } else if (theatreStatus === "Both") {
        query.theatreStatus = {
            $in: ["Pending", "NeedMoreDocuments"]
        };
    }

    const fetchPendingRequest = await Theatre.find(query)
        .select("-ownerPassword -ownerRefreshToken -theatreApprovedBy -ownerImage -ownerAadharNo -ownerPanNumber -theatreGSTNumber -theatreImages");

    console.log("Pending Theatre request is: ", fetchPendingRequest)
    return res.status(200)
        .json(new ApiResponse(200, "Pending Request Fetched", { pendingRequest: fetchPendingRequest }))
})

const completeTheatreRequestDetails = asyncHandler(async (req, res, next) => {
    const adminData = req.admin
    if (!adminData || adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Admin")
    }

    console.log("Admin id: ", adminData._id)
    const { id } = req.params

    const { status } = req.query;

    console.log("Status is: ", status)
    let querry = ""

    if (status === "Pending") {
        querry = "Pending"
    } else if (status === "NeedMoreDocuments") {
        querry = "NeedMoreDocuments"
    }

    const findTheatre = await Theatre.findOne({
        _id: id,
        theatreStatus: querry
    })
        .select("-ownerPassword -ownerRefreshToken")
    if (!findTheatre) {
        throw new ApiError(404, "No Theatre Found")
    }

    console.log("Theatre details is: ", findTheatre)

    return res.status(200)
        .json(new ApiResponse(200, "Theatre details fetched", { theatreDetails: findTheatre }))

})

const adminTheatreAction = asyncHandler(async (req, res, next) => {

    const adminData = req.admin;

    if (!adminData || adminData.role !== "admin") {
        throw new ApiError(403, "Forbidden Error");
    }

    console.log("Admin id is:", adminData._id);

    const { id } = req.params;
    const { status, reason } = req.body;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    if ((!reason || reason.trim() === "") && status !== "Approved") {
        throw new ApiError(400, "Reason is required");
    }

    console.log("Status is:", status);
    console.log("Reason is:", reason);

    const allowedStatus = [
        "Approved",
        "Rejected",
        "NeedMoreDocuments"
    ];

    if (!allowedStatus.includes(status)) {
        throw new ApiError(400, "Invalid theatre status");
    }

    const getTheatreDetails = await Theatre.findById(id)
        .select("-ownerRefreshToken -ownerPassword");

    if (!getTheatreDetails) {
        throw new ApiError(404, "Theatre not found");
    }

    console.log("Theatre Details is:", getTheatreDetails);

    if (getTheatreDetails.theatreStatus === "Approved") {
        throw new ApiError(400, "Theatre has already been approved.");
    }

    getTheatreDetails.theatreStatus = status;
    getTheatreDetails.adminRemark = reason?.trim() || "";

    let emailSubject = "";
    let emailMessage = "";

    if (status === "Approved") {

        getTheatreDetails.ownerPassword = "aAbBcC123";

        emailSubject = "CineVerse Theatre Registration Approved";

        emailMessage = `<h2 style="color: #16a34a; margin-bottom: 20px;">
        Theatre Registration Approved
</h2>

<p>Dear Theatre Owner,</p>

<p>
    We are pleased to inform you that your theatre registration request
    has been <strong style="color: #16a34a;">approved</strong> by the
    CineVerse administration team.
</p>

<p>
    Your theatre registration has successfully completed the verification
    and approval process.
</p>

<div style="background-color: #f0fdf4; padding: 15px; margin: 20px 0; border-left: 4px solid #16a34a;">
    <p style="margin: 0 0 8px 0;">
        <strong>Registration Status:</strong> Approved
    </p>

    <p style="margin: 0;">
        Your theatre account is now ready to access.
    </p>
</div>

<h3 style="color: #333;">
    Temporary Password
</h3>

<div style="background-color: #f8fafc; padding: 15px; margin: 15px 0; border: 1px solid #e5e7eb; border-radius: 6px;">

    <p style="margin: 5px 0;">
        <strong>Temporary Password:</strong> aAbBcC123
    </p>

</div>

<h3 style="color: #333;">
    How to Access Your Theatre Dashboard
</h3>

<ol style="padding-left: 20px; line-height: 1.8;">

    <li>
        Visit the official <strong>CineVerse</strong> website.
    </li>

    <li>
        Click on the <strong>Login</strong> button.
    </li>

    <li>
        On the Login page, click on the
        <strong>Forgot Password</strong> option.
    </li>

    <li>
        Follow the instructions provided on the Forgot Password page
        to create a <strong>new password</strong> for your account.
    </li>

    <li>
        After successfully updating your password,
        return to the <strong>Login</strong> page.
    </li>

    <li>
        Log in again using your registered email address and
        <strong>new password</strong>.
    </li>

    <li>
        After successful login, you can access your
        <strong>Theatre Dashboard</strong>.
    </li>

</ol>

<div style="background-color: #fffbeb; padding: 15px; margin: 20px 0; border-left: 4px solid #d97706;">

    <p style="margin: 0;">
        <strong>Security Notice:</strong>
        The password provided above is a temporary password.
        Please update your password through the
        <strong>Forgot Password</strong> option before accessing
        your Theatre Dashboard.
    </p>

</div>

<p>
    Thank you for choosing <strong>CineVerse</strong>.
    We are excited to have your theatre join our platform.
</p>

<p>
    Regards,<br>
    <strong>CineVerse Administration Team</strong>
</p>
`;
    }

    else if (status === "Rejected") {

        emailSubject = "CineVerse Theatre Registration Rejected";

        emailMessage = `<div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #333; background-color: #ffffff;">

                <h2 style="color: #dc2626; margin-bottom: 20px;">
                    Theatre Registration Rejected
                </h2>

                <p>Dear Theatre Owner,</p>

                <p>
                    We regret to inform you that your CineVerse theatre registration
                    request has been <strong style="color: #dc2626;">rejected</strong>
                    by the CineVerse administration team.
                </p>

                <div style="background-color: #fef2f2; padding: 15px; margin: 20px 0; border-left: 4px solid #dc2626;">

                    <p style="margin: 0 0 8px 0;">
                        <strong>Reason for Rejection:</strong>
                    </p>

                    <p style="margin: 0;">
                        ${reason}
                    </p>

                </div>

                <p>
                    Please review the reason provided above and take the necessary
                    action if applicable.
                </p>

                <h3 style="color: #333;">
                    How to Access Your Account
                </h3>

                <ol style="padding-left: 20px; line-height: 1.8;">
                    <li>Go to the official CineVerse website.</li>
                    <li>Click on the <strong>Login</strong> option.</li>
                    <li>Enter the email address used during theatre registration.</li>
                    <li>Enter the password aAbBcC123.</li>
                    <li>Click on the <strong>Login</strong> button.</li>
                </ol>

                <p>
                    If you believe the rejection was made in error or require further
                    clarification, please contact the CineVerse administration team.
                </p>

                <p>
                    Regards,<br>
                    <strong>CineVerse Administration Team</strong>
                </p>

            </div>
        `;
    }

    else if (status === "NeedMoreDocuments") {

        emailSubject = "Action Required: Additional Documents Needed for Your CineVerse Theatre Registration";

        emailMessage = `<div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #333; background-color: #ffffff;">

                <h2 style="color: #d97706; margin-bottom: 20px;">
                    Additional Documents Required
                </h2>

                <p>Dear Theatre Owner,</p>

                <p>
                    Your CineVerse theatre registration request has been reviewed
                    by our administration team.
                </p>

                <p>
                    We require some additional information or documents before we can
                    proceed with the verification of your theatre registration.
                </p>

                <div style="background-color: #fffbeb; padding: 15px; margin: 20px 0; border-left: 4px solid #d97706;">

                    <p style="margin: 0 0 8px 0;">
                        <strong>Admin Remark:</strong>
                    </p>

                    <p style="margin: 0;">
                        ${reason}
                    </p>

                </div>

                <p>
                    Please review the above remark and provide the requested
                    information or documents through your CineVerse account.
                </p>

                <h3 style="color: #333;">
                    How to Continue
                </h3>

                <ol style="padding-left: 20px; line-height: 1.8;">
                    <li>Go to the official CineVerse website.</li>
                    <li>Click on the <strong>Login</strong> option.</li>
                    <li>Enter the email address used during theatre registration.</li>
                    <li>Enter the password aAbBcC123.</li>
                    <li>Click on the <strong>Login</strong> button.</li>
                    <li>Review the required changes or documents mentioned by the administration team.</li>
                    <li>Update the required information and resubmit your theatre application.</li>
                </ol>

                <p>
                    After resubmission, your application will be reviewed again by the
                    CineVerse administration team.
                </p>

                <p>
                    Regards,<br>
                    <strong>CineVerse Administration Team</strong>
                </p>

            </div>
        `;
    }
    await getTheatreDetails.save();

    await sendEmail({
        to: getTheatreDetails.ownerEmail,
        subject: emailSubject,
        html: emailMessage
    });

    return res.status(200)
        .json(new ApiResponse(200, "Theatre Status Updated", {
            theatreStatus: getTheatreDetails.theatreStatus,
            reason: getTheatreDetails.adminRemark
        }));
});


export { createAdmin, loginAdmin, refreshAccessToken, verifyAdmin, logOutAdmin, getAllAdmin, fetchAdminDetails, updateAdmin, activateAdmin, deactivateAdmin, adminDashBoard, theatrePendingRequest, completeTheatreRequestDetails, adminTheatreAction }