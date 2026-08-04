import React from "react"
import { indianStates } from "../../utils/Address/stateName.js"
import { stateDistricts } from "../../utils/Address/districtName.js"
import { useState, useEffect } from "react"
// import { IoChevronDown } from "react-icons/io5";
import registerComponent2Validation from "../../context/Auth/registerComponent2Validation.js"

function RegisterComponent2({ setTheatreDetails, theatreDetails, setStepCount }) {

    const [districtNames, setDistrictNames] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setDistrictNames(stateDistricts[theatreDetails.state] || []);
    }, [theatreDetails.state]);

    const PreviousButtonWork = () => {
        console.log("Previous Button is clicked")
        setStepCount((prev) => prev - 1)
    }

    const SetCountry = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetState = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetDistrict = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetCity = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTown = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetLandmark = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetPincode = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetAadharNumber = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetPanNumber = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetOwnerPhoto = (e) => {
        const { name, files } = e.target
        console.log("Files data is: ", files[0])
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    }

    const NextButtonWork = () => {
        console.log("Next button is clicked in the register component 2")
        setLoading(true)

        const registerComponent2ValidationResponse = registerComponent2Validation(theatreDetails)
        console.log("Register component 2 validation response is: ", registerComponent2ValidationResponse)
        if (Object.keys(registerComponent2ValidationResponse).length !== 0) {
            setErrors(registerComponent2ValidationResponse)
            setLoading(false)
            return
        }
        setErrors({})
        setStepCount((prev) => prev + 1)
        setLoading(false)
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">
                <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">

                    {/* <div className="px-5 py-6">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                                🪪
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Owner Verification
                                </h1>

                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                    Help us verify your identity before reviewing your
                                    theatre application.
                                </p>
                            </div>
                        </div>
                    </div> */}

                    <div className="border-t border-gray-200"></div>

                    <div className="px-5 py-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg">
                                📍
                            </div>

                            <h1 className="text-lg font-semibold text-gray-900">
                                Owner Address
                            </h1>
                        </div>
                    </div>

                    <div className="px-5 pb-6 space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Country
                            </label>

                            {/* <button>
                                <span>Select</span>
                                <span><IoChevronDown /></span>
                            </button>
                            <div>
                                India
                            </div> */}

                            <select
                                name="country"
                                value={theatreDetails.country}
                                onChange={SetCountry}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                            </select>

                            {errors.country && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.country}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                State
                            </label>

                            <select
                                name="state"
                                value={theatreDetails.state}
                                onChange={SetState}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            >
                                <option value="">Select State</option>

                                {indianStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.state}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                District
                            </label>

                            <select
                                name="district"
                                value={theatreDetails.district}
                                onChange={SetDistrict}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            >
                                <option value="">Select District</option>

                                {districtNames.map((dist) => (
                                    <option key={dist} value={dist}>
                                        {dist}
                                    </option>
                                ))}
                            </select>

                            {errors.district && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.district}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={theatreDetails.city}
                                onChange={SetCity}
                                placeholder="Enter city name"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />

                            {errors.city && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Town
                            </label>

                            <input
                                type="text"
                                name="town"
                                value={theatreDetails.town}
                                onChange={SetTown}
                                placeholder="Enter town name"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />
                            {errors.town && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.town}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Landmark
                            </label>

                            <input
                                type="text"
                                name="landmark"
                                value={theatreDetails.landmark}
                                onChange={SetLandmark}
                                placeholder="Enter nearby landmark"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />
                            {errors.landmark && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.landmark}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Pin Code
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={theatreDetails.pincode}
                                onChange={SetPincode}
                                placeholder="Enter pin code"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />

                            {errors.pincode && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.pincode}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Aadhaar Number
                            </label>

                            <input
                                type="text"
                                name="aadharNumber"
                                value={theatreDetails.aadharNumber}
                                onChange={SetAadharNumber}
                                placeholder="Enter Aadhaar number"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />

                            {errors.aadharNumber && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.aadharNumber}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                PAN Number
                            </label>

                            <input
                                type="text"
                                name="panNumber"
                                value={theatreDetails.panNumber}
                                onChange={SetPanNumber}
                                placeholder="Enter PAN number"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm uppercase outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition"
                            />
                            {errors.panNumber && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.panNumber}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Owner Photo
                            </label>

                            <input
                                type="file"
                                name="ownerPhoto"
                                onChange={SetOwnerPhoto}
                                className="block w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                            />
                            {errors.ownerPhoto && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.ownerPhoto}</p>}
                        </div>

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <h1 className="font-semibold text-blue-700">
                                ℹ Privacy Notice
                            </h1>

                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                Your identity documents are securely encrypted and used
                                only for verification purposes. Your information is never
                                shared with third parties without your consent.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={PreviousButtonWork}
                                className="flex-1 rounded-2xl border border-gray-300 bg-white py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100">
                                ← Previous
                            </button>

                            <button
                                onClick={NextButtonWork}
                                disabled={loading}
                                className="flex-1 rounded-2xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]">
                                {loading ? "Continuing..." : "Continue →"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent2