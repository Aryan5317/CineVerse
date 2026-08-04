import React from "react"
import { useState } from "react"
import registerComponent3Validation from "../../context/Auth/registerComponent3Validation.js"

function RegisterComponent3({ setTheatreDetails, theatreDetails, setStepCount }) {

    const [theatreImagesTempStore, setTheatreImagesTempStore] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const SetTheatreName = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreDescription = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreContactNo = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreBookingAvailability = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreGSTNumber = (e) => {
        const { name, value } = e.target
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetTheatreImages = (e) => {
        const { name, value } = e.target
        console.log("Name for the image upload is: ", name)
        const files = Array.from(e.target.files)
        files.forEach((file) => {
            console.log("Files are: ", file.name);
        });
        setTheatreDetails((prev) => ({
            ...prev,
            [name]: [...prev[name], ...files]
        }))
    }

    const PreviousButtonWork = () => {
        console.log("Previous Button is clicked in the register component 3")
        setStepCount((prev) => prev - 1)
    }

    const NextButtonWork = () => {
        console.log("Continue button is clicked in the register component 3")
        setLoading(true)
        const registerComponent3ValidationResponse = registerComponent3Validation(theatreDetails)
        console.log("Response from the register component 3 is: ", registerComponent3ValidationResponse)
        if (Object.keys(registerComponent3ValidationResponse).length !== 0) {
            setErrors(registerComponent3ValidationResponse)
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
                <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">

                    <div className="px-5 py-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl">🎭</h1>

                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Theatre Information
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Tell us about your theatre.
                                </p>

                                <p className="text-sm text-gray-500">
                                    This information will be visible to customers after approval.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    <div className="space-y-5 px-5 py-6">

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Theatre Name
                            </label>

                            <input
                                type="text"
                                name="theatreName"
                                value={theatreDetails.theatreName}
                                onChange={SetTheatreName}
                                placeholder="Enter theatre name"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            {errors.theatreName && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreName}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Theatre Description
                            </label>

                            <textarea
                                name="theatreDescription"
                                rows={5}
                                value={theatreDetails.theatreDescription}
                                onChange={SetTheatreDescription}
                                placeholder="Write a short description about your theatre..."
                                className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            ></textarea>
                            {errors.theatreDescription && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreDescription}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Theatre Contact Number
                            </label>

                            <input
                                type="text"
                                name="theatreContactNo"
                                value={theatreDetails.theatreContactNo}
                                onChange={SetTheatreContactNo}
                                placeholder="Enter contact number"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            {errors.theatreContactNo && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreContactNo}</p>}
                        </div>
                        <fieldset className="space-y-3">

                            <legend className="mb-2 block text-sm font-semibold text-gray-700">
                                Theatre Availability
                            </legend>

                            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50">

                                <input
                                    type="radio"
                                    name="theatreIsBookingAvailable"
                                    value="Available"
                                    onChange={SetTheatreBookingAvailability}
                                    className="h-5 w-5 flex-shrink-0 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Available
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Customers can book shows online.
                                    </p>
                                </div>

                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50">

                                <input
                                    type="radio"
                                    name="theatreIsBookingAvailable"
                                    value="UnAvailable"
                                    onChange={SetTheatreBookingAvailability}
                                    className="h-5 w-5 flex-shrink-0 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Unavailable
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Theatre is temporarily not accepting bookings.
                                    </p>
                                </div>

                            </label>

                            {errors.theatreIsBookingAvailable && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreIsBookingAvailable}</p>}

                        </fieldset>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                GST Number
                            </label>

                            <input
                                type="text"
                                name="theatreGSTNumber"
                                value={theatreDetails.theatreGSTNumber}
                                onChange={SetTheatreGSTNumber}
                                placeholder="Enter GST Number"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm uppercase text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            {errors.theatreGSTNumber && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreGSTNumber}</p>}
                        </div>

                        <div className="space-y-4">

                            <label className="block text-sm font-semibold text-gray-700">
                                Theatre Images
                            </label>

                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 px-5 py-8 transition hover:bg-blue-100">

                                <span className="text-5xl">📸</span>

                                <span className="mt-3 font-semibold text-blue-700">
                                    Upload Theatre Images
                                </span>

                                <span className="mt-1 text-center text-sm text-gray-500">
                                    JPG, PNG or WEBP • Multiple images supported
                                </span>

                                <input
                                    type="file"
                                    name="theatreImages"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={SetTheatreImages}
                                />
                            </label>
                            <div>
                                {errors.theatreImages && <p className="flex items-center gap-1 text-xs font-medium text-red-500">{errors.theatreImages}</p>}
                            </div>

                            <div className="space-y-3">

                                <h2 className="text-sm font-semibold text-gray-700">
                                    Uploaded Images
                                </h2>

                                {theatreDetails.theatreImages.length > 0 ? (
                                    <div className="space-y-3">

                                        {theatreDetails.theatreImages.map((img, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                                        📸
                                                    </div>

                                                    <div>
                                                        <h1 className="text-sm font-semibold text-gray-800 break-all">
                                                            {img.name}
                                                        </h1>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Type: {img.type || "Unknown"}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            Size: {(img.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}

                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                                            🖼️
                                        </div>

                                        <h2 className="mt-4 text-lg font-semibold text-gray-800">
                                            No Images Uploaded
                                        </h2>

                                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                            Upload theatre images to preview them here.
                                            <br />
                                            Your uploaded images will appear in this section.
                                        </p>

                                    </div>
                                )}


                            </div>

                        </div>

                    </div>

                    <div className="mx-5 mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <h1 className="font-semibold text-blue-700">
                            ℹ Recommendation
                        </h1>

                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            Upload clear photos of your entrance, lobby, screen,
                            seating area and canteen to improve your theatre profile
                            and attract more customers.
                        </p>

                    </div>

                    <div className="flex gap-3 px-5 pb-6">

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
        </>
    )
}

export default RegisterComponent3