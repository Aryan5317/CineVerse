import React from "react"
import { FiCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

function RegisterComponent6() {

    const navigate = useNavigate()

    const BackToHomeButtonWork = () => {
        console.log("Back to home button clicked")
        navigate(-1)
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center">

                <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">

                    <div className="px-6 py-8 text-center">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
                            🎉
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            Application Submitted!
                        </h1>

                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                            Thank you for applying to become a CineVerse Theatre Partner.
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                            Your application has been received successfully.
                        </p>

                    </div>

                    <div className="border-t border-gray-200"></div>

                    <div className="px-5 py-6">

                        <div className="rounded-3xl border border-gray-200 bg-white p-5">

                            <h2 className="text-lg font-bold text-gray-900">
                                Current Status
                            </h2>

                            <div className="mt-4 flex items-center gap-3">

                                <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></div>

                                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                                    Pending Verification
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="px-5 pb-6">

                        <div className="rounded-3xl border border-gray-200 bg-white p-5">

                            <h2 className="text-lg font-bold text-gray-900">
                                Progress
                            </h2>

                            <div className="mt-6 space-y-6">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        ✓
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Application Submitted
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            Completed Successfully
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Under Verification
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            In Progress
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                        <FiCircle />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-500">
                                            Approval
                                        </h3>

                                        <p className="text-xs text-gray-400">
                                            Waiting
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                        <FiCircle />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-500">
                                            Account Activation
                                        </h3>

                                        <p className="text-xs text-gray-400">
                                            Pending
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="px-5 pb-6">

                        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                    ℹ️
                                </div>

                                <h1 className="text-lg font-bold text-blue-700">
                                    What Happens Next?
                                </h1>

                            </div>

                            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700">

                                <li className="flex gap-3">
                                    <span>✔️</span>
                                    <span>Your application will be reviewed by CineVerse.</span>
                                </li>

                                <li className="flex gap-3">
                                    <span>✔️</span>
                                    <span>Verification usually takes 12–24 hours.</span>
                                </li>

                                <li className="flex gap-3">
                                    <span>✔️</span>
                                    <span>You will receive updates via email.</span>
                                </li>

                                <li className="flex gap-3">
                                    <span>✔️</span>
                                    <span>
                                        Once approved, you'll receive an activation email to create your password.
                                    </span>
                                </li>

                                <li className="flex gap-3">
                                    <span>✔️</span>
                                    <span>
                                        After creating your password, you can log in to your Theatre Dashboard from the CineVerse landing page.
                                    </span>
                                </li>

                            </ul>

                        </div>

                    </div>

                    <div className="px-5 pb-6">

                        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 text-center">

                            <h2 className="text-lg font-bold text-gray-900">
                                Need Help?
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Our support team is here to assist you.
                            </p>

                            <p className="mt-4 font-semibold text-blue-600">
                                support@cineverse.com
                            </p>

                        </div>

                    </div>

                    <div className="px-5 pb-6">

                        <button
                            onClick={BackToHomeButtonWork}
                            className="w-full rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 active:scale-[0.98]">
                            Back to Home
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default RegisterComponent6