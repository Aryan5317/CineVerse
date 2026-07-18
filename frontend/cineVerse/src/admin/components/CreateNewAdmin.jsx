import React from "react"
import { useState } from "react"
import newAdminValidation from "../context/NewAdminValidation.js"
import createAdminService from "../services/createAdminService.js"
import { FiEye, FiEyeOff } from "react-icons/fi"

function CreateNewAdmin({ setCreateButton }) {

    const [newAdminDetails, setNewAdminDetails] = useState({
        fullname: "",
        email: "",
        password: "",
        mobileNumber: "",
        date: "",
    })
    const [errors, setErrors] = useState({})
    const [passwordEyeToggle, setPasswordEyeToggle] = useState(false)
    const [newAdminMesage, setNewAdminMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const SetNewAdminFullName = (e) => {
        const { name, value } = e.target
        setNewAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetNewAdminEmail = (e) => {
        const { name, value } = e.target
        setNewAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetNewAdminPassword = (e) => {
        const { name, value } = e.target
        setNewAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetNewAdminMobileNumber = (e) => {
        const { name, value } = e.target
        setNewAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetNewAdminDate = (e) => {
        const { name, value } = e.target
        setNewAdminDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetPasswordEyeButton = () => {
        setPasswordEyeToggle((prev) => !prev)
    }

    const addAdmin = async () => {
        console.log("Add admin Button is clicked")
        setLoading(true);
        const adminValidation = newAdminValidation(newAdminDetails)
        if (Object.keys(adminValidation).length !== 0) {
            setErrors(adminValidation);
            setLoading(false)
            return;
        }
        setErrors({})

        try {
            const adminCreationValue = await createAdminService(newAdminDetails);

            if (adminCreationValue) {
                setNewAdminMessage(true);
                setLoading(false);

                setTimeout(() => {
                    setCreateButton(false);
                }, 3000);
            }
        } catch (error) {
            console.log("Error from backend is: ", error);

            setLoading(false);
            setNewAdminMessage(false);

            setErrors((prev) => ({
                ...prev,
                message: error.message
            }));
        }
    }

    const BackToAdmistrationPage = () => {
        setCreateButton((prev) => !prev)
    }

    return (
        <>
            <div className="min-h-screen bg-slate-100 px-4 py-6">

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

                    <div className="mb-6">

                        <h1 className="text-2xl font-bold text-slate-900">
                            Create New Admin
                        </h1>

                        <p className="mt-2 text-sm text-slate-500 leading-6">
                            Fill in the details below to create a new administrator account.
                        </p>

                    </div>

                    <div className="space-y-5">

                        <div className="space-y-2">

                            <h2 className="text-sm font-semibold text-slate-700">
                                Full Name
                            </h2>

                            <input
                                type="text"
                                name="fullname"
                                value={newAdminDetails.fullname}
                                onChange={SetNewAdminFullName}
                                placeholder="Enter full name"
                                className={`w-full rounded-xl bg-slate-50 px-4 py-3 outline-none transition-all duration-200 ${errors.fullname
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {errors.fullname && (
                                <p className="text-sm font-medium text-red-600">
                                    {errors.fullname}
                                </p>
                            )}

                        </div>

                        <div className="space-y-2">

                            <h2 className="text-sm font-semibold text-slate-700">
                                Email
                            </h2>

                            <input
                                type="email"
                                name="email"
                                value={newAdminDetails.email}
                                onChange={SetNewAdminEmail}
                                placeholder="Enter email"
                                className={`w-full rounded-xl bg-slate-50 px-4 py-3 outline-none transition-all duration-200 ${errors.email
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {errors.email && (
                                <p className="text-sm font-medium text-red-600">
                                    {errors.email}
                                </p>
                            )}

                        </div>

                        <div className="space-y-2">

                            <h2 className="text-sm font-semibold text-slate-700">
                                Password
                            </h2>

                            <div
                                className={`flex items-center rounded-xl bg-slate-50 px-4 transition-all duration-200 ${errors.password
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100"
                                    }`}
                            >

                                <input
                                    type={passwordEyeToggle ? "text" : "password"}
                                    name="password"
                                    value={newAdminDetails.password}
                                    onChange={SetNewAdminPassword}
                                    placeholder="Enter password"
                                    className="flex-1 bg-transparent py-3 outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={SetPasswordEyeButton}
                                    className="text-slate-500 text-xl hover:text-blue-600 transition-colors duration-200"
                                >
                                    {passwordEyeToggle ? <FiEye /> : <FiEyeOff />}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="text-sm font-medium text-red-600">
                                    {errors.password}
                                </p>
                            )}

                        </div>

                        <div className="space-y-2">

                            <h2 className="text-sm font-semibold text-slate-700">
                                Mobile Number
                            </h2>

                            <div
                                className={`flex items-center rounded-xl bg-slate-50 px-4 transition-all duration-200 ${errors.password
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100"
                                    }`}
                            >

                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={newAdminDetails.mobileNumber}
                                    onChange={SetNewAdminMobileNumber}
                                    placeholder="Enter Mobile Number"
                                    className="flex-1 bg-transparent py-3 outline-none"
                                />


                            </div>

                            {errors.mobileNumber && (
                                <p className="text-sm font-medium text-red-600">
                                    {errors.mobileNumber}
                                </p>
                            )}

                        </div>

                        <div className="space-y-2">

                            <h2 className="text-sm font-semibold text-slate-700">
                                Joining Date
                            </h2>

                            <input
                                type="date"
                                name="date"
                                value={newAdminDetails.date}
                                onChange={SetNewAdminDate}
                                className={`w-full rounded-xl bg-slate-50 px-4 py-3 outline-none transition-all duration-200 ${errors.date
                                    ? "border border-red-500"
                                    : "border border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    }`}
                            />

                            {errors.date && (
                                <p className="text-sm font-medium text-red-600">
                                    {errors.date}
                                </p>
                            )}

                        </div>

                    </div>

                    <div className="mt-8">

                        <button
                            onClick={addAdmin}
                            disabled={loading}
                            className={`w-full h-12 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
                                }`}
                        >
                            {loading ? "Adding Admin..." : "Add Admin"}
                        </button>

                        {newAdminMesage && (
                            <div className="mt-4">
                                <p className="rounded-xl border border-green-200 bg-green-50 py-3 px-4 text-center font-medium text-green-600">
                                    Admin Added Successfully ✅
                                </p>
                            </div>
                        )}

                        {errors.message && (
                            <div className="mt-4">
                                <p className="rounded-xl border border-red-200 bg-red-50 py-3 px-4 text-center font-medium text-red-600">
                                    {errors.message}
                                </p>
                            </div>
                        )}

                    </div>

                    <div className="mt-4">

                        <button
                            disabled={loading}
                            onClick={BackToAdmistrationPage}
                            className={`w-full h-12 rounded-xl font-semibold border transition-all duration-200 ${loading
                                ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 active:scale-[0.98]"
                                }`}
                        >
                            ← Back
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default CreateNewAdmin