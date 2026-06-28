import React from "react"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate, Link } from "react-router-dom"
import resetPasswordValidation from "../../context/User/Authentication/resetPassword"
import resetPassword from "../../services/User/Auth/resetPasswordService"


function ResetPassword() {
    const navigate = useNavigate()
    const [passwordDetails, setPasswordDetails] = useState({
        newPassword: "",
        confirmPassword: "",
    })

    const [newPasswordButton, setNewPasswordButton] = useState(false)
    const [confirmPasswordButton, setConfirmPasswordButton] = useState(false)
    const [errors, setErrors] = useState({})
    const [passwordMessage, setPasswordMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const SetNewPassword = (e) => {
        const { name, value } = e.target
        setPasswordDetails((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors({})
    }

    const SetConfirmPassword = (e) => {
        const { name, value } = e.target
        setPasswordDetails((prev) => ({
            ...prev,
            [name]: value,
        }))

        setErrors({})
    }

    const SetNewPasswordButton = () => {
        setNewPasswordButton((prev) => !prev)
    }

    const SetConfirmPasswordButton = () => {
        setConfirmPasswordButton((prev) => !prev)
    }

    const handleResetPassword = async () => {
        console.log("Reset Button is clicked")
        const passwordValidation = resetPasswordValidation(passwordDetails);
        if (Object.keys(passwordValidation).length !== 0) {
            setErrors(passwordValidation)
            setPasswordMessage(false)
            return
        }

        setErrors({})
        setLoading(true)
        try {
            const resetPaswordValue = await resetPassword(passwordDetails);
            if (resetPaswordValue) {
                setPasswordMessage(true)
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            }
        } catch (error) {
            setPasswordMessage(false)
            setErrors((prev) => ({
                ...prev,
                message: error.message
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] px-6 py-12">

                <div className="flex items-center gap-2 whitespace-nowrap">
                    <h1 className="text-3xl font-extrabold text-[#0F172A]">
                        Reset Password
                    </h1>

                    <span className="text-3xl">
                        🔑
                    </span>
                </div>

                <p className="mt-3 text-slate-500 leading-6">
                    Create a strong password for your CineVerse account.
                </p>

                <div className="mt-8 flex flex-col gap-6">

                    <div className="flex flex-col gap-2">

                        <h3 className="text-md font-semibold text-slate-700">
                            New Password
                        </h3>

                        <div
                            className={`flex items-center h-12 px-4 rounded-xl border bg-white ${errors.newPassword
                                ? "border-red-500"
                                : "border-slate-300 focus-within:border-red-500"
                                }`}
                        >
                            <input
                                className="flex-1 bg-transparent outline-none"
                                type={newPasswordButton ? "text" : "password"}
                                name="newPassword"
                                value={passwordDetails.newPassword}
                                onChange={SetNewPassword}
                                placeholder="Enter your new password"
                            />

                            <button
                                type="button"
                                onClick={SetNewPasswordButton}
                                className="text-slate-500 text-xl"
                            >
                                {newPasswordButton ? <FiEye /> : <FiEyeOff />}
                            </button>
                        </div>

                        {errors.newPassword && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.newPassword}
                            </p>
                        )}

                    </div>

                    <div className="flex flex-col gap-2">

                        <h3 className="text-md font-semibold text-slate-700">
                            Confirm Password
                        </h3>

                        <div
                            className={`flex items-center h-12 px-4 rounded-xl border bg-white ${errors.confirmPassword
                                ? "border-red-500"
                                : "border-slate-300 focus-within:border-red-500"
                                }`}
                        >
                            <input
                                className="flex-1 bg-transparent outline-none"
                                type={confirmPasswordButton ? "text" : "password"}
                                name="confirmPassword"
                                value={passwordDetails.confirmPassword}
                                onChange={SetConfirmPassword}
                                placeholder="Confirm your password"
                            />

                            <button
                                type="button"
                                onClick={SetConfirmPasswordButton}
                                className="text-slate-500 text-xl"
                            >
                                {confirmPasswordButton ? <FiEye /> : <FiEyeOff />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm font-medium">
                                {errors.confirmPassword}
                            </p>
                        )}

                    </div>

                </div>

                <div className="mt-8">

                    <button
                        disabled={loading}
                        onClick={handleResetPassword}
                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md transition-all duration-200"
                    >
                        {loading ? "Resetting Password" : "Reset Password"}
                    </button>

                </div>

                <div className="mt-6 text-center">
                    <Link
                        to="/forget-password"
                        className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-all duration-200"
                    >
                        ← Back
                    </Link>
                </div>
                {errors.password && !errors.newPassword && !errors.confirmPassword && (
                    <div className="mt-6">
                        <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl py-3 px-4 text-center">
                            {errors.password}
                        </p>
                    </div>
                )}

                {passwordMessage && (
                    <div className="mt-6">
                        <p className="text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-center">
                            Password Reset Successfully ✅
                        </p>
                    </div>
                )}

                {errors.message && (
                    <div className="mt-6">
                        <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl py-3 px-4 text-center">
                            {errors.message}
                        </p>
                    </div>
                )}

            </div>
        </>
    )
}

export default ResetPassword