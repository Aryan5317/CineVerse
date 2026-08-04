import React from "react"
import { useState, useEffect } from "react"
import { stateDistricts } from "../../utils/Address/districtName.js"
import { indianStates } from "../../utils/Address/stateName.js"
import registerComponent4Validation from "../../context/Auth/registerComponent4Validation.js"

function RegisterComponent4({ setTheatreDetails, theatreDetails, setStepCount }) {

    const [theatreDistrictNames, setTheatreDistrictNames] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTheatreDistrictNames(stateDistricts[theatreDetails.theatreState] || [])
    }, [theatreDetails.theatreState])

    const SetTheatreCountry = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreState = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreDistrict = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreCity = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreLandmark = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatrePinCode = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const PreviousButtonWork = () => {
        console.log("Previous Button is clicked in the register component 4")
        setStepCount((prev) => prev - 1)
    }

    const NextButtonWork = () => {
        console.log("Continue button is clicked in the register component 4")
        setLoading(true)

        const registerComponent4ValidationResponse = registerComponent4Validation(theatreDetails)
        console.log("Register component 4 validation is: ", registerComponent4ValidationResponse)
        if (Object.keys(registerComponent4ValidationResponse).length !== 0) {
            setErrors(registerComponent4ValidationResponse)
            setLoading(false)
            return;
        }
        setErrors({})

        setStepCount((prev) => prev + 1)
        setLoading(false)
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
                <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">

                    <div className="px-5 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                                📍
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Theatre Address
                                </h1>

                                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                                    Help customers locate your theatre accurately.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    <div className="space-y-5 px-5 py-6">

                        <div className="space-y-2">
                            <label
                                htmlFor="theatreCountry"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Country
                            </label>

                            <select
                                id="theatreCountry"
                                name="theatreCountry"
                                value={theatreDetails.theatreCountry}
                                onChange={SetTheatreCountry}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                            </select>

                            {errors.theatreCountry && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreCountry}</p>}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="theatreState"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                State
                            </label>

                            <select
                                id="theatreState"
                                name="theatreState"
                                value={theatreDetails.theatreState}
                                onChange={SetTheatreState}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            >
                                <option value="">Select State</option>

                                {indianStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>

                            {errors.theatreState && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreState}</p>}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="theatreDistrict"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                District
                            </label>

                            <select
                                id="theatreDistrict"
                                name="theatreDistrict"
                                value={theatreDetails.theatreDistrict}
                                onChange={SetTheatreDistrict}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            >
                                <option value="">Select District</option>

                                {theatreDistrictNames.map((dist) => (
                                    <option key={dist} value={dist}>
                                        {dist}
                                    </option>
                                ))}
                            </select>

                            {errors.theatreDistrict && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreDistrict}</p>}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="theatreCity"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                City
                            </label>

                            <input
                                id="theatreCity"
                                type="text"
                                name="theatreCity"
                                value={theatreDetails.theatreCity}
                                onChange={SetTheatreCity}
                                placeholder="Enter city name"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />

                            {errors.theatreCity && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreCity}</p>}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="theatreLandMark"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Landmark
                            </label>

                            <input
                                id="theatreLandMark"
                                type="text"
                                name="theatreLandMark"
                                value={theatreDetails.theatreLandMark}
                                onChange={SetTheatreLandmark}
                                placeholder="Enter nearby landmark"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />

                            {errors.theatreLandMark && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreLandMark}</p>}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="theatrePinCode"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Pin Code
                            </label>

                            <input
                                id="theatrePinCode"
                                type="text"
                                name="theatrePinCode"
                                value={theatreDetails.theatrePinCode}
                                onChange={SetTheatrePinCode}
                                placeholder="Enter pin code"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />

                            {errors.theatrePinCode && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatrePinCode}</p>}
                        </div>

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <h2 className="font-semibold text-blue-700">
                                ℹ Tip
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                This address will be used for show listings, navigation,
                                maps and customer bookings. Make sure the details are
                                accurate.
                            </p>
                        </div>

                    </div>

                    <div className="border-t border-gray-200"></div>

                    <div className="flex gap-3 p-5">

                        <button
                            onClick={PreviousButtonWork}
                            className="flex-1 rounded-2xl border border-gray-300 bg-white py-3.5 font-semibold text-gray-700 transition duration-200 hover:bg-gray-100 active:scale-[0.98]"
                        >
                            ← Previous
                        </button>

                        <button
                            onClick={NextButtonWork}
                            disabled={loading}
                            className="flex-1 rounded-2xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {loading ? "Continuing..." : "Continue →"}
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default RegisterComponent4