import React from "react"
import { useState, useEffect } from "react"
import registerComponent5Validation from "../../context/Auth/registerComponent5Validation.js"
import registerTheaterService from "../../services/Auth/registerTheaterService.js"

function RegisterComponent5({ theatreDetails, setStepCount }) {

    const [checkBoxValues, setCheckBoxValues] = useState({
        confirmationCheckbox: false,
        termsCheckbox: false,
        privacyCheckbox: false
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [registerMessage, setRegisterMessage] = useState(false)
    const [aadharNumberDisplay, setAadharNumberDisplay] = useState("")
    const [panNumberDisplay, setPanNumberDisplay] = useState("")
    const [gstNumberDisplay, setGSTNumberDisplay] = useState("")

    useEffect(() => {
        console.log("Aadhar Number is: ", theatreDetails.aadharNumber.length)
        console.log("Pan Number is: ", theatreDetails.panNumber)
        console.log("GST Number is: ", theatreDetails.theatreGSTNumber)
        let aadharValue = ""
        for (let i = 0; i < 12; i++) {
            if (i < 8) {
                aadharValue += "*"
            }
            else {
                aadharValue += theatreDetails.aadharNumber[i];
            }
        }
        let panValue = ""
        for (let j = 0; j < 10; j++) {
            if (j < 5) {
                panValue += "*"
            }
            else {
                panValue += theatreDetails.panNumber[j];
            }
        }
        let gstValue = ""
        for (let k = 0; k < 15; k++) {
            if (k < 2) {
                gstValue += theatreDetails.theatreGSTNumber[k]
            }
            else if (k > 1 && k < 10) {
                gstValue += "*"
            }
            else if (k > 9) {
                gstValue += theatreDetails.theatreGSTNumber[k]
            }
        }
        setAadharNumberDisplay(aadharValue)
        setPanNumberDisplay(panValue)
        setGSTNumberDisplay(gstValue)
    }, [])


    const Component1EditButtonWork = () => {
        console.log("Register Component 1 edit button is clicked")
        setStepCount(1)
    }

    const Component2EditButtonWork = () => {
        console.log("Register Component 2 edit button is clicked")
        setStepCount(2)
    }

    const Component3EditButtonWork = () => {
        console.log("Register component 3 edit button is clicked")
        setStepCount(3)
    }

    const Component4EditButtonWork = () => {
        console.log("Register Component 4 edit button is clicked")
        setStepCount(4)
    }

    const SetConfirmationCheckbox = (e) => {
        const { name, checked } = e.target
        setCheckBoxValues((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const SetTermsCheckbox = (e) => {
        const { name, checked } = e.target
        setCheckBoxValues((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const SetPrivacyCheckbox = (e) => {
        const { name, checked } = e.target
        setCheckBoxValues((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const SubmitButtonWork = async () => {
        console.log("Submit work is clicked in register component 5")
        setLoading(true)
        const registerComponent5ValidationResponse = registerComponent5Validation(checkBoxValues)
        console.log("Register component 5 validation response is: ", registerComponent5ValidationResponse)
        if (Object.keys(registerComponent5ValidationResponse).length !== 0) {
            setErrors(registerComponent5ValidationResponse)
            setLoading(false)
            return
        }
        setErrors({})
        try {
            console.log("Theatre details to send in the backend is: ", theatreDetails)
            const registerTheaterServiceResponse = await registerTheaterService(theatreDetails)
            if (registerTheaterServiceResponse) {
                console.log("Response from register theatre service is: ", registerTheaterServiceResponse)
                setRegisterMessage(true)
                setTimeout(() => {
                    setStepCount(6)
                }, 1000);
            }
        } catch (error) {
            console.log("Error from backend is: ", error)
            setErrors((prev) => ({
                ...prev,
                "message": error.message
            }))
            setRegisterMessage(false)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen px-1 py-5">

                <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">

                    <div className="px-5 py-6">
                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                                ✅
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Review Your Application
                                </h1>

                                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                    Please review all the information before submitting your application.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="px-5 py-3">

                        <div className="rounded-3xl border border-gray-200 bg-white">

                            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                        👤
                                    </div>

                                    <h1 className="text-lg font-bold text-gray-900">
                                        Owner Information
                                    </h1>

                                </div>

                                <button
                                    onClick={Component1EditButtonWork}
                                    className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>

                            </div>

                            <div className="divide-y divide-gray-100 px-5 py-2">

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Full Name
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800 break-words">
                                        {theatreDetails.fullname}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Email Address
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800 break-all">
                                        {theatreDetails.email}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Mobile Number
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.mobileNumber}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Alternate Mobile Number
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.optionalMobileNumber || "Not Provided"}
                                    </h2>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="px-5 pt-2">

                        <div className="rounded-3xl border border-gray-200 bg-white">

                            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                        📍
                                    </div>

                                    <h1 className="text-lg font-bold text-gray-900">
                                        Owner Address
                                    </h1>

                                </div>

                                <button
                                    onClick={Component2EditButtonWork}
                                    className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>

                            </div>

                            <div className="divide-y divide-gray-100 px-5 py-2">

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Country
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.country}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        State
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.state}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        City
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.city}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        District
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.district}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Town
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.town}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Landmark
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.landmark}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Pin Code
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.pincode}
                                    </h2>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="px-5 pt-2">

                        <div className="rounded-3xl border border-gray-200 bg-white">

                            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                        🪪
                                    </div>

                                    <h1 className="text-lg font-bold text-gray-900">
                                        Owner Verification
                                    </h1>

                                </div>

                                <button
                                    onClick={Component2EditButtonWork}
                                    className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>

                            </div>

                            <div className="divide-y divide-gray-100 px-5 py-2">

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Owner Photo
                                    </p>

                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                            📷
                                        </div>

                                        <h2 className="text-base font-semibold text-gray-800 break-all">
                                            {theatreDetails.ownerPhoto.name}
                                        </h2>
                                    </div>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Aadhaar Number
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {aadharNumberDisplay}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        PAN Number
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {panNumberDisplay}
                                    </h2>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="px-5 pt-2">

                        <div className="rounded-3xl border border-gray-200 bg-white">

                            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                        🎭
                                    </div>

                                    <h1 className="text-lg font-bold text-gray-900">
                                        Theatre Information
                                    </h1>

                                </div>

                                <button
                                    onClick={Component3EditButtonWork}
                                    className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>

                            </div>

                            <div className="divide-y divide-gray-100 px-5 py-2">

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Theatre Name
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800 break-words">
                                        {theatreDetails.theatreName}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Theatre Description
                                    </p>

                                    <p className="mt-1 text-sm leading-relaxed text-gray-700 break-words">
                                        {theatreDetails.theatreDescription}
                                    </p>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Theatre Contact Number
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatreContactNo}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        GST Number
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {gstNumberDisplay}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Theatre Images
                                            </p>

                                            <h2 className="mt-1 text-base font-semibold text-gray-800">
                                                {theatreDetails.theatreImages.length} Uploaded
                                            </h2>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                                            📸
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="px-5 pt-2">

                        <div className="rounded-3xl border border-gray-200 bg-white">

                            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                        📍
                                    </div>

                                    <h1 className="text-lg font-bold text-gray-900">
                                        Theatre Address
                                    </h1>

                                </div>

                                <button
                                    onClick={Component4EditButtonWork}
                                    className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
                                    <span>✏️</span>
                                    <span>Edit</span>
                                </button>

                            </div>

                            <div className="divide-y divide-gray-100 px-5 py-2">

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Country
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatreCountry}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        State
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatreState}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        District
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatreDistrict}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        City
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatreCity}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Landmark
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatreLandMark}
                                    </h2>
                                </div>

                                <div className="border-b border-gray-100 py-3 last:border-b-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Pin Code
                                    </p>

                                    <h2 className="mt-1 text-base font-semibold text-gray-800">
                                        {theatreDetails.theatrePinCode}
                                    </h2>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="px-5 py-6">

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                                    📋
                                </div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Before You Submit
                                </h1>

                            </div>

                            <div className="mt-6 space-y-4">

                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="confirmationCheckbox"
                                            checked={checkBoxValues.confirmationCheckbox}
                                            onChange={SetConfirmationCheckbox}
                                            className="h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                        />

                                        <span className="text-sm text-gray-700 leading-6">
                                            I confirm that all the information provided is accurate.
                                        </span>

                                    </label>
                                    {errors.confirmationCheckbox && <p className="ml-8 flex items-center gap-2 text-xs font-medium text-red-500">{errors.confirmationCheckbox}</p>}

                                </div>

                                <div>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="termsCheckbox"
                                            checked={checkBoxValues.termsCheckbox}
                                            onChange={SetTermsCheckbox}
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />

                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            I agree to the Terms & Conditions.
                                        </span>

                                    </label>
                                    {errors.termsCheckbox && <p className="ml-8 flex items-center gap-2 text-xs font-medium text-red-500">{errors.termsCheckbox}</p>}
                                </div>

                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="privacyCheckbox"
                                            checked={checkBoxValues.privacyCheckbox}
                                            onChange={SetPrivacyCheckbox}
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />

                                        <span className="text-sm text-gray-700 leading-relaxed">
                                            I agree to the Privacy Policy.
                                        </span>

                                    </label>
                                    {errors.privacyCheckbox && <p className="ml-8 flex items-center gap-2 text-xs font-medium text-red-500">{errors.privacyCheckbox}</p>}
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="px-5 py-4 space-y-3">

                        <button
                            onClick={SubmitButtonWork}
                            disabled={loading}
                            className="w-full rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {loading ? "Submitting..." : " Submit Application"}
                        </button>

                        {registerMessage &&
                            <div className="flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                                <span className="text-lg">✅</span>
                                <p className="text-sm font-medium text-green-700">Details Submitted Successfully</p>
                            </div>
                        }

                        {errors.message &&
                            <div className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm font-medium text-red-600">{errors.message}</p>
                            </div>
                        }

                    </div>
                </div>
            </div >
        </>
    )
}

export default RegisterComponent5