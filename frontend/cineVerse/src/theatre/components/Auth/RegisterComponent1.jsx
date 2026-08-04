import React from "react"
import { useState } from "react"
import registerComponent1Validation from "../../context/Auth/registerComponent1Validation.js"

function RegisterComponent1({ setTheatreDetails, theatreDetails, setStepCount }) {

    const [theatreDetails1errors, setTheatreDetails1errors] = useState({})
    const [loading, setLoading] = useState(false)

    const SetFullName = (e) => {
        const { name, value } = e.target
        console.log("Name is: ", name)
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetEmail = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMobileNumber = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetOptionalMobileNumber = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const ContinueButtonWork = () => {
        console.log("Conitnue button is clicked in register component 1")
        setLoading(true)
        const registerComponent1ValidationResponse = registerComponent1Validation(theatreDetails)
        if (Object.keys(registerComponent1ValidationResponse).length !== 0) {
            setTheatreDetails1errors(registerComponent1ValidationResponse)
            setLoading(false)
            return
        }
        setTheatreDetails1errors({})
        setStepCount((prev) => prev + 1)
        setLoading(false)
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-white shadow-xl border-x border-gray-200">
                <div className="flex items-start gap-3 px-5 pt-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                        👤
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Owner Information
                        </h2>

                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                            Enter the primary owner's details for verification and future communication.
                        </p>
                    </div>
                </div>

                <div className="px-5 py-6 space-y-5">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullname"
                            placeholder="John Doe"
                            value={theatreDetails.fullname}
                            onChange={SetFullName}
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                        {theatreDetails1errors.fullname && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{theatreDetails1errors.fullname}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={theatreDetails.email}
                            onChange={SetEmail}
                            placeholder="john@example.com"
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                        {theatreDetails1errors.email && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{theatreDetails1errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="mobileNumber"
                            value={theatreDetails.mobileNumber}
                            onChange={SetMobileNumber}
                            placeholder="+91 9876543210"
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                        {theatreDetails1errors.mobileNumber && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{theatreDetails1errors.mobileNumber}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Alternate Mobile Number
                            <span className="ml-1 font-normal text-gray-400">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            name="optionalMobileNumber"
                            value={theatreDetails.optionalMobileNumber}
                            onChange={SetOptionalMobileNumber}
                            placeholder="+91 9876543210"
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                        {theatreDetails1errors.optionalMobileNumber && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{theatreDetails1errors.optionalMobileNumber}</p>}
                    </div>

                </div>

                <div className="px-5">
                    <button
                        onClick={ContinueButtonWork}
                        disabled={loading}
                        className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 py-3.5 text-white font-semibold shadow-lg transition active:scale-[0.98]">
                        {loading ? "Continuing..." : "Continue →"}
                    </button>
                </div>

                <div className="px-5 py-6">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">💡</span>

                            <h3 className="font-semibold text-blue-700">
                                Why do we need this?
                            </h3>
                        </div>

                        <ul className="mt-4 space-y-3 text-sm text-gray-600">
                            <li className="flex gap-2">
                                <span className="text-blue-600">✔</span>
                                <span>Your email will be used for application updates and notifications.</span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-blue-600">✔</span>
                                <span>Your mobile number allows our verification team to contact you if required.</span>
                            </li>

                            <li className="flex gap-2">
                                <span className="text-blue-600">✔</span>
                                <span>Your details remain secure and are only used during theatre onboarding.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RegisterComponent1