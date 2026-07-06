import React from "react"
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiEye, FiEyeOff } from "react-icons/fi"
import loginValidation from "../../context/AdminLoginValidation"
import loginService from "../../services/adminLoginService"
import { superPropContext } from "../../context/superAdminContextApi"

function AdminLoginPage() {
    const {setIsAdminLoggedIn} = useContext(superPropContext)
    
    const navigate = useNavigate()

    const [adminDetails, setAdminDetails] = useState({
        email: "",
        password: "",
    })
    const [passwordEyeToggle, setPasswordEyeToggle] = useState(false)
    const [loginErrors, setLoginErrors] = useState({})
    const [loginMessage, setLoginMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const SetAdminEmail = (e) => {
        const { name, value } = e.target
        setAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const SetAdminPassowrd = (e) => {
        const { name, value } = e.target
        setAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetPasswordToggleEyeEffect = () => {
        setPasswordEyeToggle((prev) => !prev)
    }

    const loginAdmin = async () => {
        console.log("Login button clicked")
        setLoading(true);
        const loginValidationResult = loginValidation(adminDetails);
        if (!(Object.keys(loginValidationResult).length === 0)) {
            setLoginErrors(loginValidationResult)
            setLoading(false)
            return;
        }
        setLoginErrors({});

        try {
            const loginResponse = await loginService(adminDetails)
            console.log("Admin login Response: ", loginResponse)
            setLoginMessage(true);
            setLoading(true)
            setIsAdminLoggedIn(true)
            setTimeout(() => {
                setLoginMessage(false)
                navigate("/admin/dashboard")
            }, 2000);
        } catch (error) {
            console.log("Erorrs from login Service: ", error)
            setLoginMessage(false)
            setLoading(false)
            setLoginErrors((prev) => ({
                ...prev,
                message: error.message
            }))
        }
        finally{
            setLoading(false)
        }

    }


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-6">

                <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 p-8">

                    <div className="text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl shadow-md">
                            🛡️
                        </div>

                        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                            CineVerse Admin
                        </h1>

                        <h3 className="mt-2 text-sm text-slate-500">
                            Secure Administration Panel
                        </h3>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-center text-xl font-bold text-slate-800">
                            Administrator Login
                        </h2>

                    </div>

                    <div className="mt-8 space-y-6">

                        <div className="space-y-2">

                            <h3 className="text-md font-semibold text-slate-700">
                                Email
                            </h3>

                            <input
                                type="email"
                                name="email"
                                value={adminDetails.email}
                                onChange={SetAdminEmail}
                                placeholder="Enter your email"
                                className={`w-full rounded-xl bg-slate-50 px-4 py-3 outline-none transition-all duration-200 ${loginErrors.email
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {loginErrors.email && (
                                <p className="text-sm font-medium text-red-600">
                                    {loginErrors.email}
                                </p>
                            )}

                        </div>

                        <div className="space-y-2">

                            <h3 className="text-md font-semibold text-slate-700">
                                Password
                            </h3>

                            <div
                                className={`flex items-center rounded-xl bg-slate-50 px-4 transition-all duration-200 ${loginErrors.password
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100"
                                    }`}
                            >

                                <input
                                    type={passwordEyeToggle ? "text" : "password"}
                                    name="password"
                                    value={adminDetails.password}
                                    onChange={SetAdminPassowrd}
                                    placeholder="Enter your password"
                                    className="flex-1 bg-transparent py-3 outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={SetPasswordToggleEyeEffect}
                                    className="text-slate-500 text-xl hover:text-blue-600 transition-colors duration-200"
                                >
                                    {passwordEyeToggle ? <FiEye /> : <FiEyeOff />}
                                </button>

                            </div>

                            {loginErrors.password && (
                                <p className="text-sm font-medium text-red-600">
                                    {loginErrors.password}
                                </p>
                            )}

                        </div>

                    </div>

                    <div className="mt-8">

                        <button
                            onClick={loginAdmin}
                            disabled={loading}
                            className={`w-full rounded-xl py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 ${loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                                }`}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>

                        {loginErrors.message && (
                            <div className="mt-4">
                                <p className="rounded-xl border border-red-200 bg-red-50 py-3 px-4 text-center font-medium text-red-600">
                                    {loginErrors.message}
                                </p>
                            </div>
                        )}

                        {loginMessage && (
                            <div className="mt-4">
                                <p className="rounded-xl border border-green-200 bg-green-50 py-3 px-4 text-center font-medium text-green-600">
                                    Admin Login Successful ✅
                                </p>
                            </div>
                        )}

                    </div>

                    <div className="mt-4 flex justify-end">

                        <Link
                            to="/admin/forget-password"
                            className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <div className="mt-8 border-t border-slate-200 pt-5">

                        <p className="text-center text-xs tracking-wide text-slate-400">
                            Authorized Administrators Only
                        </p>

                    </div>

                </div>

            </div>
        </>
    )
}

export default AdminLoginPage