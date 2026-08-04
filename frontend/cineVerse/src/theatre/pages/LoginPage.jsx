import React from "react"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import loginDetailsValidation from "../context/Auth/loginDetailsValidation.js"
import loginDetailsService from "../services/Auth/loginDetailsService.js"

function LoginPage() {

    const navigate = useNavigate()

    const [theatreLoginDetails, setTheatreLoginDetails] = useState({
        email: "",
        password: ""
    })
    const [passwordEyeButton, setPasswordEyeButton] = useState(false)
    const [loginErrors, setLoginErrors] = useState({})
    const [loginMessage, setLoginMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const GoToBackPage = () => {
        console.log("Back button is clicked")
        navigate(-1)
    }

    const SetPasswordEyeButtonOption = () => {
        setPasswordEyeButton((prev) => !prev)
    }

    const RegisterButtonWork = () => {
        console.log("Register button clicked")
        navigate("/theatre/register")
    }

    const SetTheatreLoginEmail = (e) => {
        const { name, value } = e.target
        setTheatreLoginDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreLoginPassword = (e) => {
        const { name, value } = e.target
        setTheatreLoginDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const ForgetPasswordButtonWork = () => {
        console.log("Forget Password Buttton clicked")
        navigate("/theatre/forget-password")
    }

    const LoginButtonWork = async () => {
        console.log("Login Button clicked")
        setLoading(true)

        const theatreLoginDetailsValidationResponse = loginDetailsValidation(theatreLoginDetails)
        if (Object.keys(theatreLoginDetailsValidationResponse).length !== 0) {
            setLoginErrors(theatreLoginDetailsValidationResponse)
            setLoading(false);
            return
        }
        setLoginErrors({})

        try {
            const loginDetailsResponse = await loginDetailsService(theatreLoginDetails)
            if (loginDetailsResponse) {
                console.log("Login Details response from backend is: ", loginDetailsResponse.data)
                setLoginMessage(true)
            }
        } catch (error) {
            console.log("Error from backend while login is: ", error)
            setLoginErrors((prev) => ({
                ...prev,
                "message": error.message
            }))
            setLoginMessage(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50">

                <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-md">

                    <button
                        onClick={GoToBackPage}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:text-blue-600">

                        <span className="text-lg">←</span>

                        <span>Back</span>

                    </button>

                </div>

                <div className="px-5 py-8">

                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl">

                        <div className="border-b border-slate-200 px-6 py-8 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                                🎬
                            </div>

                            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                                CineVerse
                            </h1>

                            <p className="mt-2 text-sm font-medium text-slate-500">
                                Theatre Partner Portal
                            </p>

                        </div>

                        <div className="px-6 pt-8">

                            <h1 className="text-3xl font-extrabold text-slate-900">
                                Welcome Back
                            </h1>

                            <p className="mt-3 text-base leading-7 text-slate-600">
                                Manage your theatres, screens, shows and bookings from one powerful dashboard.
                            </p>

                        </div>

                        <div className="mt-8 px-6">

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    📧 Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={theatreLoginDetails.email}
                                    onChange={SetTheatreLoginEmail}
                                    className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 text-base text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                            <div className="mt-6">

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    🔒 Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={passwordEyeButton ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={theatreLoginDetails.password}
                                        onChange={SetTheatreLoginPassword}
                                        className="h-14 w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 pr-14 text-base text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={SetPasswordEyeButtonOption}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition-all duration-200 hover:text-blue-600 active:scale-90"
                                    >

                                        {passwordEyeButton ? <FiEye /> : <FiEyeOff />}

                                    </button>

                                </div>

                            </div>

                            <div className="mt-4 flex justify-end">

                                <button
                                    onClick={ForgetPasswordButtonWork}
                                    className="text-sm font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700">

                                    Forgot Password?

                                </button>

                            </div>

                            <button
                                onClick={LoginButtonWork}
                                className="mt-8 h-14 w-full rounded-2xl bg-blue-600 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 active:scale-95">

                                Login

                            </button>

                            <div className="my-8 flex items-center">

                                <div className="h-px flex-1 bg-slate-200"></div>

                                <p className="px-4 text-sm font-semibold text-slate-500">
                                    OR
                                </p>

                                <div className="h-px flex-1 bg-slate-200"></div>

                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">

                                <h1 className="text-lg font-bold text-slate-900">
                                    Need a Theatre Account?
                                </h1>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Register your theatre and start managing bookings with CineVerse.
                                </p>

                                <button
                                    onClick={RegisterButtonWork}
                                    className="mt-5 h-12 w-full rounded-xl border border-blue-600 bg-white font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 active:scale-95">

                                    Register First

                                </button>

                            </div>

                        </div>

                        <div className="mt-8 rounded-b-3xl border-t border-slate-200 bg-slate-50 px-6 py-7">

                            <h1 className="text-xl font-bold text-slate-900">
                                Why Choose CineVerse?
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Powerful tools designed to simplify theatre management and help your business grow.
                            </p>

                            <div className="mt-6 space-y-4">

                                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold">
                                        ✓
                                    </div>

                                    <div>

                                        <h1 className="font-semibold text-slate-900">
                                            Secure Login
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Enterprise-grade authentication and account security.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold">
                                        ✓
                                    </div>

                                    <div>

                                        <h1 className="font-semibold text-slate-900">
                                            Theatre Dashboard
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Manage screens, shows, theatres and operations from one place.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold">
                                        ✓
                                    </div>

                                    <div>

                                        <h1 className="font-semibold text-slate-900">
                                            Booking Management
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Track bookings, revenue and customer activity in real time.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default LoginPage