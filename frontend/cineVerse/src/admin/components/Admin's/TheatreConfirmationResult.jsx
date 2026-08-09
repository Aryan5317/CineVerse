import React from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TheatreConfirmationResult({ actionValue, setConfirmationResult }) {

    const navigete = useNavigate()
    const { requestId } = useParams()
    console.log("Id to send is: ", requestId)

    useEffect(() => {
        const timer = setTimeout(() => {
            setConfirmationResult(false)
            navigete("/admin/panel/theatre/pending-request")
            console.log("Executed after 2 seconds");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            {actionValue === "Need more documents" && (

                <div className="w-full rounded-3xl bg-white shadow-2xl">

                    <div className="border-b border-gray-200 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
                                ✅
                            </div>

                            <div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Request Sent Successfully
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Documents request has been sent.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-5 px-6 py-6">

                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">

                            <p className="text-sm leading-6 text-gray-700">
                                The theatre owner has been notified to upload the requested documents.
                            </p>

                            <p className="mt-3 font-medium text-yellow-700">
                                The application has been moved to <span className="font-bold">"Need Documents"</span>.
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-100 px-4 py-3 text-center">

                            <p className="text-sm font-medium text-gray-600">
                                Returning to Registration Requests...
                            </p>

                        </div>

                    </div>

                </div>

            )}

            {actionValue === "Reject" && (

                <div className="w-full rounded-3xl bg-white shadow-2xl">

                    <div className="border-b border-gray-200 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                                ✅
                            </div>

                            <div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Request Sent Successfully
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Rejection has been processed.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-5 px-6 py-6">

                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

                            <p className="font-medium text-red-700">
                                The application has been rejected.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-700">
                                The theatre owner has been notified along with the rejection reason.
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-100 px-4 py-3 text-center">

                            <p className="text-sm font-medium text-gray-600">
                                Returning to Registration Requests...
                            </p>

                        </div>

                    </div>

                </div>

            )}

            {actionValue === "Approve" && (

                <div className="w-full rounded-3xl bg-white shadow-2xl">

                    <div className="border-b border-gray-200 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                                ✅
                            </div>

                            <div>

                                <h1 className="text-lg font-bold text-gray-900">
                                    Request Sent Successfully
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Approval completed successfully.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="space-y-5 px-6 py-6">

                        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

                            <p className="font-medium text-green-700">
                                The application has been approved.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-700">
                                The theatre is now an official CineVerse Partner and can access the Theatre Dashboard.
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-100 px-4 py-3 text-center">

                            <p className="text-sm font-medium text-gray-600">
                                Returning to Registration Requests...
                            </p>

                        </div>

                    </div>

                </div>

            )}
        </>
    )
}

export default TheatreConfirmationResult