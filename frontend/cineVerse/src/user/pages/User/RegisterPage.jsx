import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiEye, FiEyeOff } from "react-icons/fi"
import registerDetails from "../User/../../context/User/Authentication/registerValidationDetails"
import registerService from "../User/../../services/User/userRegisterService"

function RegisterPage() {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        fullname: "",
        email: "",
        mobileNumber: "",
        password: "",
    })
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [errors, setErrors] = useState({})
    const [passwordEye, setPasswordEye] = useState(false)
    const [formMessage, setFormMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const SetFullNameValue = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetEmailValue = (e) => {
        const { name, value } = e.target
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetMobileNumberValue = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetPasswordValue = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetCheckboxValue = () => {
        setCheckboxValue((prev) => !prev)
    }

    const SetPasswordEyeValue = () => {
        setPasswordEye((prev) => !prev)
    }


    const VerifyUserDetails = async () => {
        setLoading(true)
        const registerValidationValue = registerDetails(userDetails, checkboxValue)
        console.log("Register validation error: ", registerValidationValue)
        if (Object.keys(registerValidationValue).length != 0) {
            setErrors(registerValidationValue)
            setLoading(false)
            return
        }
        setErrors({})

        try {
            const registerValue = await registerService(userDetails)
            if (registerValue) {
                setFormMessage(true)
                setLoading(false)
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
        } catch (error) {
            console.log("Error came from backend is: ", error)
            setFormMessage(false)
            setErrors((prev) => ({
                ...prev,
                message: error.message,
            }))
            setLoading(false)
        }


    }

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] px-6 py-12">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <h1 className="text-4xl font-extrabold text-[#0F172A]">
                            Create Account
                        </h1>

                        <h1 className="text-4xl">
                            🎬
                        </h1>
                    </div>

                    <div>
                        <h3 className="text-slate-500 mt-2 leading-6">
                            Join CineVerse and start booking and streaming.
                        </h3>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold text-slate-700">
                            Full Name
                        </h1>

                        <input
                            className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${errors.fullname
                                ? "border-red-500"
                                : "border-slate-300 focus:border-red-500"
                                }`}
                            type="text"
                            name="fullname"
                            value={userDetails.fullname}
                            onChange={SetFullNameValue}
                            placeholder="Enter your full name"
                        />

                        {errors.fullname && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.fullname}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold text-slate-700">
                            Email
                        </h1>

                        <input
                            className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${errors.email
                                ? "border-red-500"
                                : "border-slate-300 focus:border-red-500"
                                }`}
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={SetEmailValue}
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold text-slate-700">
                            Mobile Number
                        </h1>

                        <input
                            className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${errors.mobileNumber
                                ? "border-red-500"
                                : "border-slate-300 focus:border-red-500"
                                }`}
                            type="text"
                            name="mobileNumber"
                            value={userDetails.mobileNumber}
                            onChange={SetMobileNumberValue}
                            placeholder="Enter your mobile number"
                        />

                        {errors.mobileNumber && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.mobileNumber}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm font-semibold text-slate-700">
                            Password
                        </h1>
                        <div
                            className={`flex items-center h-12 px-4 rounded-xl border bg-white ${errors.password
                                ? "border-red-500"
                                : "border-slate-300 focus-within:border-red-500"
                                }`}
                        >
                            <input
                                className="flex-1 bg-transparent outline-none"
                                type={passwordEye ? "text" : "password"}
                                name="password"
                                value={userDetails.password}
                                onChange={SetPasswordValue}
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                onClick={SetPasswordEyeValue}
                                className="text-slate-500 text-xl cursor-pointer"
                            >
                                {passwordEye ? <FiEye /> : <FiEyeOff />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                className="w-5 h-5 accent-red-600"
                                type="checkbox"
                                checked={checkboxValue}
                                onChange={SetCheckboxValue}
                            />

                            <h2 className="text-slate-600 text-sm">
                                I agree to the Terms & Conditions
                            </h2>
                        </label>

                        {errors.checkbox && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.checkbox}
                            </p>
                        )}
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        disabled={loading}
                        className={`w-full h-12 text-white rounded-xl font-semibold shadow-md transition-all duration-200 ${loading
                                ? "bg-red-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 cursor-pointer"
                            }`}
                        onClick={VerifyUserDetails}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <div className="mt-4 text-center">
                        {formMessage && (
                            <p className="text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg py-2 px-4">
                                User Registered Successfully! ✅
                            </p>
                        )}

                        {errors.message && (
                            <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg py-2 px-4">
                                {errors.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-slate-600">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-red-600 font-semibold hover:text-red-700"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default RegisterPage