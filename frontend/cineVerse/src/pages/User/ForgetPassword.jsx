import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import forgetPassword from "../../services/User/Auth/forgetPassswordService"
import verifyOtp from "../../services/User/Auth/verifyOtpService"
import validator from "validator"

function ForgetPassword() {
    const navigate = useNavigate()
    const [forgetPasswordDetails, setForgetPasswordDetails] = useState({
        email: "",
        otp: "",
    })

    const [otpInputVisibility, setOtpInputVisibility] = useState(false)
    const [errors, setErrors] = useState({})
    const [emailMessage, setEmailMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otpMessage, setOtpMessage] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)

    const SetForgetEmail = (e) => {
        const { name, value } = e.target

        setForgetPasswordDetails((prev) => ({
            ...prev,
            [name]: value
        }))

        setEmailMessage(false)

        setErrors((prev) => ({
            ...prev,
            email: "",
            message: ""
        }))
    }

    const VerifyEmailDetails = async () => {
        console.log("OTP send button clicked.")

        setEmailMessage(false)
        setOtpInputVisibility(false)
        setErrors({})

        if (!forgetPasswordDetails.email.trim()) {
            setErrors({
                email: "*Email field is empty"
            })
            return
        }

        if (!validator.isEmail(forgetPasswordDetails.email.trim())) {
            setErrors({
                email: "*Enter correct email format"
            })
            return
        }

        setLoading(true)

        try {
            const forgetDetails = await forgetPassword(forgetPasswordDetails)

            if (forgetDetails) {
                setEmailMessage(true)
                setOtpInputVisibility(true)
                setTimeout(() => {
                    setEmailMessage(false)
                }, 3000);
            }
        } catch (error) {
            setErrors({
                message: error.message
            })

            setEmailMessage(false)
            setOtpInputVisibility(false)
        } finally {
            setLoading(false)
        }
    }

    const SetOtpValue = (e) => {
        const { name, value } = e.target;

        setForgetPasswordDetails((prev) => ({
            ...prev,
            [name]: value
        }))

        setOtpMessage(false)
        setErrors((prev) => ({
            ...prev,
            email: "",
            otp: "",
            message: "",
        }))
    }

    const VerifyOTP = async () => {
        console.log("Otp clicked ")
        setErrors({})
        setOtpMessage(false)
        setEmailMessage(false)

        if (!forgetPasswordDetails.otp.trim()) {
            setErrors({
                otp: "*Otp field is empty"
            })
            return;
        }
        if (forgetPasswordDetails.otp.trim().length !== 6) {
            setErrors({
                otp: "*Enter correct otp"
            })
            return;
        }

        setErrors({})
        setOtpLoading(true)
        try {
            const otpValue = await verifyOtp(forgetPasswordDetails)
            if (otpValue) {
                setOtpMessage(true)
                setTimeout(() => {
                    navigate("/reset-password")
                }, 2000);
            }
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                otpMessage: error.message
            }))
            setOtpMessage(false)
        } finally {
            setOtpLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] px-6 py-12">

                <div className="flex items-center gap-2 whitespace-nowrap">
                    <h1 className="text-3xl font-extrabold text-[#0F172A]">
                        Forgot Password
                    </h1>

                    <span className="text-3xl">
                        🔐
                    </span>
                </div>

                <p className="mt-3 text-slate-500 leading-6">
                    Enter your registered email address to receive a verification code.
                </p>

                <div className="mt-8 flex flex-col gap-6">

                    <div className="flex flex-col gap-2">

                        <h2 className="text-md font-semibold text-slate-700">
                            Email
                        </h2>

                        <input
                            className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${errors.email
                                ? "border-red-500"
                                : "border-slate-300 focus:border-red-500"
                                }`}
                            type="email"
                            name="email"
                            value={forgetPasswordDetails.email}
                            onChange={SetForgetEmail}
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.email}
                            </p>
                        )}

                    </div>

                </div>

                <div className="mt-8">

                    <button
                        disabled={loading}
                        className={`w-full h-12 text-white rounded-xl font-semibold shadow-md transition-all duration-200 ${loading
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                            }`}
                        onClick={VerifyEmailDetails}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                </div>

                <div className="mt-5 text-center">

                    <Link
                        to="/login"
                        className="text-red-600 font-semibold hover:text-red-700 transition-all duration-200"
                    >
                        ← Back to Login
                    </Link>

                </div>

                {errors.message && (
                    <div className="mt-6">
                        <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl py-3 px-4 text-center">
                            {errors.message}
                        </p>
                    </div>
                )}

                {emailMessage && (
                    <div className="mt-6">
                        <p className="text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-center">
                            OTP Sent Successfully ✅
                        </p>
                    </div>
                )}

                {otpInputVisibility && (

                    <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-md p-6">

                        <h2 className="text-xl font-bold text-[#0F172A]">
                            Verification Code
                        </h2>

                        <p className="text-slate-500 mt-2 leading-6">
                            Enter the OTP sent to your registered email.
                        </p>

                        <div className="mt-6 flex flex-col gap-2">

                            <h3 className="text-md font-semibold text-slate-700">
                                OTP
                            </h3>

                            <input
                                className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${errors.otp
                                    ? "border-red-500"
                                    : "border-slate-300 focus:border-red-500"
                                    }`}
                                type="text"
                                name="otp"
                                value={forgetPasswordDetails.otp}
                                onChange={SetOtpValue}
                                placeholder="Enter the OTP"
                            />

                            {errors.otp && (
                                <p className="text-red-600 text-sm font-medium">
                                    {errors.otp}
                                </p>
                            )}

                        </div>

                        <div className="mt-6">

                            <button
                                disabled={otpLoading}
                                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md transition-all duration-200"
                                onClick={VerifyOTP}
                            >
                                {otpLoading ? "Verifying..." : "Verify Otp"}
                            </button>

                        </div>

                        {errors.otpMessage && (
                            <div className="mt-6">
                                <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl py-3 px-4 text-center">
                                    {errors.otpMessage}
                                </p>
                            </div>
                        )}

                        {otpMessage && (
                            <div className="mt-6">
                                <p className="text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-center">
                                    OTP Verified Successfully ✅
                                </p>
                            </div>
                        )}

                    </div>

                )}

            </div>
        </>

    )
}

export default ForgetPassword