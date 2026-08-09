import React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import theatreAction from "../../services/Admin/theatreActionService.js"

function TheatrePageConfirmationSection({ actionValue, setConfirmationPageVisibility, setConfirmationResult }) {

    const { requestId } = useParams()
    console.log("Id to send is: ", requestId)

    const [reason, setReason] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const SetReason = (e) => {
        setReason(e.target.value);
    }

    const CancelButtonWork = () => {
        console.log("Cancel button clicked")
        setConfirmationPageVisibility(false)
    }

    const ActionButtonWork = async (e) => {
        console.log("Button is clicked")
        console.log("Data recived to action button is: ", e)
        setLoading(true)
        if (e !== "Approved" && reason === "") {
            setErrors((prev) => ({
                ...prev,
                "reason": "*Please provide a reason before proceeding."
            }))
            setLoading(false)
            return
        }
        try {
            const theatreActionResponse = theatreAction(requestId, e, reason)
            console.log("Response from backend after updating status is: ", theatreActionResponse)
            if (theatreActionResponse) {
                setLoading(true)
                setConfirmationResult(true)
                setConfirmationPageVisibility(false)
            }
        } catch (error) {
            console.log("Error from backend is: ", error)
            setErrors((prev) => ({
                ...prev,
                "message": error.message
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {actionValue === "Approve" && (
                <div className="rounded-3xl bg-white shadow-2xl">
                    <div className="border-b border-gray-200 px-6 py-5">
                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                                ✅
                            </div>

                            <div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Confirm Approval
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Review your decision before proceeding.
                                </p>

                            </div>

                        </div>

                    </div>
                    <div className="space-y-5 px-6 py-6">

                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Are you sure you want to approve this theatre application?
                        </h2>

                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">

                            <div className="flex items-center gap-2">

                                <span className="text-2xl">
                                    ⚠️
                                </span>

                                <h3 className="text-base font-semibold text-yellow-800">
                                    Important Notice
                                </h3>

                            </div>

                            <p className="mt-3 text-sm leading-6 text-gray-700">
                                Please confirm that you have carefully reviewed and verified all submitted information, identity documents, theatre details, and business information before approving this application.
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-3 border-t border-gray-200 px-6 py-5">

                        <button
                            onClick={CancelButtonWork}
                            className="flex-1 rounded-2xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => ActionButtonWork("Approved")}
                            disabled={loading}
                            className="flex-1 rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
                        >
                            {loading ? "Confirming..." : "Confirm Approval"}
                        </button>

                    </div>

                </div>

            )}

            {actionValue === "Reject" && (

                <div className="max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

                    <div className="border-b border-gray-200 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl">
                                ❌
                            </div>

                            <div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Confirm Rejection
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Review your decision before proceeding.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-4 px-5 py-4">

                        <h2 className="text-base font-semibold text-gray-900">
                            Please provide a reason for rejecting this theatre application.
                        </h2>

                        <div className="rounded-xl border border-red-200 bg-red-50 p-3">

                            <div className="flex items-center gap-2">

                                <span className="text-xl">
                                    ⚠️
                                </span>

                                <h3 className="text-sm font-semibold text-red-700">
                                    Rejection Reason
                                </h3>

                            </div>

                            <p className="mt-2 text-xs leading-5 text-gray-700">
                                This message will be sent to the theatre owner. Please clearly mention why the application is being rejected so they understand the reason.
                            </p>

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Reason
                            </label>

                            <textarea
                                name="reason"
                                value={reason}
                                onChange={SetReason}
                                rows={5}
                                placeholder="Example: The uploaded PAN card is not clearly visible. Please upload a valid, clear copy for verification."
                                className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition duration-200 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                            />

                            <div className="mt-2 flex items-center justify-between">

                                {errors.reason && (
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.reason}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    <div className="flex gap-3 border-t border-gray-200 px-5 py-4">

                        <button
                            onClick={CancelButtonWork}
                            className="flex-1 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => ActionButtonWork("Rejected")}
                            disabled={loading}
                            className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
                        >
                            {loading ? "Confirming..." : "Confirm Rejection"}

                        </button>

                    </div>

                </div>

            )}

            {actionValue === "Need more documents" && (

                <div className="min-h-[90vh] max-h-[98vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

                    <div className="border-b border-gray-200 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                                📄
                            </div>

                            <div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Request Additional Documents
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Review your request before sending it.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-4 px-5 py-4">

                        <h2 className="text-base font-semibold text-gray-900">
                            You have selected to request additional documents.
                        </h2>

                        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3">

                            <div className="flex items-center gap-2">

                                <span className="text-xl">
                                    ⚠️
                                </span>

                                <h3 className="text-sm font-semibold text-yellow-700">
                                    Additional Information Required
                                </h3>

                            </div>

                            <p className="mt-2 text-xs leading-5 text-gray-700">
                                Clearly mention the missing or incorrect documents. Your message will be sent directly to the theatre owner so they can update and resubmit their application.
                            </p>

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Reason
                            </label>

                            <textarea
                                name="reason"
                                value={reason}
                                onChange={SetReason}
                                rows={7}
                                placeholder={`Describe what the theatre owner needs to correct or upload.

Example:

1. Upload a clearer GST certificate.
2. Re-upload the theatre entrance image.
3. Submit a valid PAN card copy.
4. Upload a clearer owner photograph.`}
                                className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700 placeholder:text-gray-400 outline-none transition duration-200 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                            />

                            <div className="mt-2 flex items-center justify-between">

                                {errors.reason && (
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.reason}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    <div className="flex gap-3 border-t border-gray-200 px-5 py-4">

                        <button
                            onClick={CancelButtonWork}
                            className="flex-1 rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => ActionButtonWork("NeedMoreDocuments")}
                            disabled={loading}
                            className="flex-1 rounded-xl bg-yellow-500 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 active:scale-[0.98]"
                        >
                            {loading ? "Sending..." : "Send Request"}
                        </button>

                    </div>

                </div>

            )}

        </>
    )
}

export default TheatrePageConfirmationSection