import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiEye, FiEyeOff } from "react-icons/fi"
import loginDetails from "../User/../../context/User/Authentication/loginDetails.js"
import {propContext} from "../User/../../context/User/contextApi"
import loginService from "../User/../../services/User/userLoginService.js"

function LoginPage() {
    const { setIsLoggedIn } = useContext(propContext)
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({})
    const [passwordEye, setPasswordEye] = useState(false)
    const [formMessage, setFormMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const SetEmailValue = (e) => {
        const { name, value } = e.target

        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetPasswordValue = (e) => {
        const { name, value } = e.target

        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const SetPasswordEyeValue = () => {
        setPasswordEye((prev) => !prev)
    }

    const verifyUserDetails = async () => {
        setLoading(true)
        const loginValidationError = loginDetails(userDetails)

        if (Object.keys(loginValidationError).length !== 0) {
            setLoading(false)
            setIsLoggedIn(false)
            setErrors(loginValidationError)
            return
        }

        setErrors({})

        try {
            const loginValue = await loginService(userDetails)

            console.log("Login value is: ", loginValue)

            if (loginValue) {
                setFormMessage(true)
                setIsLoggedIn(true)
                setTimeout(() => {
                    navigate("/")
                }, 2000)
                setLoading(false)
            }
        } catch (error) {
            setFormMessage(false)
            setLoading(false)
            setIsLoggedIn(false)
            setErrors((prev) => ({
                ...prev,
                message: error.message,
            }))
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-6 py-12">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#0F172A]">
                        Welcome Back 👋
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Sign in to continue watching, booking and exploring movies.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <h3 className="text-slate-500">
                        New here?
                    </h3>

                    <Link
                        to="/register"
                        className="text-red-600 font-semibold hover:text-red-700"
                    >
                        Create a free Account
                    </Link>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-slate-700">
                        Email
                    </h2>

                    <input
                        className={`w-full h-12 px-4 rounded-xl border bg-white outline-none ${errors.email
                            ? "border-red-500"
                            : "border-slate-300 focus:border-red-500"
                            }`}
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={userDetails.email}
                        onChange={SetEmailValue}
                    />

                    {errors.email && (
                        <p className="text-red-600 text-sm font-medium">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-slate-700">
                        Password
                    </h2>

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
                            placeholder="Enter your password"
                            value={userDetails.password}
                            onChange={SetPasswordValue}
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
            </div>

            <div className="flex justify-end mt-2">
                <Link to="/forget-password" className="text-red-600 font-medium hover:text-red-700">
                    Forget Password?
                </Link>
            </div>

            <div className="mt-6">
                <label className="flex items-center gap-3 text-slate-600 cursor-pointer">
                    <input
                        className="w-5 h-5 accent-red-600"
                        type="checkbox"
                    />
                    Keep me logged in
                </label>
            </div>

            <div className="mt-8">
                <button
                    disabled={loading}
                    className={`w-full h-12 text-white rounded-xl font-semibold shadow-md transition-all duration-200
                    ${loading
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    onClick={verifyUserDetails}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="mt-4 text-center">
                    {formMessage && (
                        <p className="text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg py-2 px-4">
                            Login Successfully ✅
                        </p>
                    )}

                    {errors.message && (
                        <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg py-2 px-4">
                            {errors.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage