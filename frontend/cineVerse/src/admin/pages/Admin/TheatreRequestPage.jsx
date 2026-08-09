import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import theatrePendingRequest from "../../services/Admin/theatrePendingRequestService.js"

function TheatreRequestPage() {

    const navigate = useNavigate()
    const [statusValue, setStatusValue] = useState("Both")
    const [theatrePendingRequestValue, setTheatrePendingRequestValue] = useState([])

    const SetStatusValue = (e) => {
        console.log("Value from status button is: ", e)
        setStatusValue(e)
    }

    useEffect(() => {
        const theatreRequestValue = async () => {
            try {
                const theatrePendingRequestResponse = await theatrePendingRequest(statusValue)
                console.log("Data is: ", theatrePendingRequestResponse.data.pendingRequest);
                if (theatrePendingRequestResponse) {
                    setTheatrePendingRequestValue(theatrePendingRequestResponse.data.pendingRequest)
                }
            } catch (error) {
                console.log("Error from backend while fetching the theatre data", error)
                setTheatrePendingRequestValue([])
            }
        }
        theatreRequestValue()
    }, [statusValue])

    const TheatresButtonWork = () => {
        console.log("Theatres button click")
        navigate(-1)
    }

    const ReviewApplicationButtonWork = (id, statusValue) => {
        console.log("Review Application button cliked")
        console.log("Id is: ", id)
        console.log("Status is: ", statusValue)
        navigate(`/admin/panel/theatre/pending-request/${id}?status=${statusValue}`)
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-gray-200 shadow-xl">

                <div className="sticky top-0 z-20 bg-slate-50 px-4 pt-4 pb-3 border-b border-gray-200">

                    <button
                        onClick={TheatresButtonWork}
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700">
                        <span className="text-lg">←</span>
                        <span>Theatres</span>
                    </button>

                    <div className="mt-3">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Pending Requests
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">18</span> theatre applications waiting for review.
                        </p>
                    </div>

                </div>

                <div className="px-4 py-3">

                    <div className="relative">

                        <input
                            type="text"
                            placeholder="Search theatre, owner or city..."
                            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />

                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                            🔍
                        </div>

                    </div>

                </div>

                <div className="mx-4 rounded-2xl border border-gray-200 bg-white p-4">

                    <h2 className="text-lg font-bold text-gray-900">
                        Filters
                    </h2>

                    <div className="mt-4 grid grid-cols-3 gap-2">

                        <button className="rounded-2xl border border-gray-300 bg-gray-50 px-2 py-2 text-center transition hover:border-blue-400 hover:bg-blue-50">

                            <p className="text-xs text-gray-500">
                                📍 State
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-gray-700">
                                All ▼
                            </p>

                        </button>

                        <button className="rounded-2xl border border-gray-300 bg-gray-50 px-2 py-2 text-center transition hover:border-blue-400 hover:bg-blue-50">

                            <p className="text-xs text-gray-500">
                                📅 Date
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-gray-700">
                                Latest ▼
                            </p>

                        </button>

                        <button className="rounded-2xl border border-gray-300 bg-gray-50 px-2 py-2 text-center transition hover:border-blue-400 hover:bg-blue-50">

                            <p className="text-xs text-gray-500">
                                ⇅ Sort
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-gray-700">
                                Newest ▼
                            </p>

                        </button>

                    </div>

                </div>

                <div className="mx-4 rounded-2xl border border-gray-200 bg-white p-4">

                    <h2 className="text-lg font-bold text-gray-900">
                        Status
                    </h2>

                    <div className="mt-4 grid grid-cols-3 gap-2">

                        <button
                            onClick={() => SetStatusValue("Pending")}
                            className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 shadow-sm transition-all duration-200 active:scale-[0.98] ${statusValue === "Pending"
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50"
                                }`}
                        >

                            <span
                                className={`text-xs font-semibold ${statusValue === "Pending"
                                    ? "text-white"
                                    : "text-gray-700"
                                    }`}
                            >
                                Pending
                            </span>

                            <span
                                className={`mt-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusValue === "Pending"
                                    ? "bg-white text-blue-600"
                                    : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                12
                            </span>

                        </button>

                        <button
                            onClick={() => SetStatusValue("Resubmitted")}
                            className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 shadow-sm transition-all duration-200 active:scale-[0.98] ${statusValue === "Resubmitted"
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50"
                                }`}
                        >

                            <span
                                className={`text-xs font-semibold ${statusValue === "Resubmitted"
                                    ? "text-white"
                                    : "text-gray-700"
                                    }`}
                            >
                                Resubmitted
                            </span>

                            <span
                                className={`mt-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusValue === "Resubmitted"
                                    ? "bg-white text-blue-600"
                                    : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                4
                            </span>

                        </button>

                        <button
                            onClick={() => SetStatusValue("Both")}
                            className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 shadow-sm transition-all duration-200 active:scale-[0.98] ${statusValue === "Both"
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50"
                                }`}
                        >

                            <span
                                className={`text-xs font-semibold ${statusValue === "Both"
                                    ? "text-white"
                                    : "text-gray-700"
                                    }`}
                            >
                                Both
                            </span>

                            <span
                                className={`mt-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusValue === "Both"
                                    ? "bg-white text-blue-600"
                                    : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                16
                            </span>

                        </button>

                    </div>

                </div>

                <div className="mx-4 my-3 rounded-2xl border border-gray-200 bg-white p-4">

                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                        <div>

                            <h3 className="text-lg font-bold text-gray-900">
                                Pending Review
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Theatre applications waiting for admin review.
                            </p>

                        </div>

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            Pending
                        </span>

                    </div>

                    {theatrePendingRequestValue.length !== 0 && <div className="mt-4 space-y-4">

                        {console.log("Theatre request data is: ", theatrePendingRequestValue)}

                        {theatrePendingRequestValue.map((theatre) => (

                            <div
                                key={theatre._id}
                                className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 hover:border-blue-300 hover:bg-white"
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                            🏢
                                        </div>

                                        <div>

                                            <h2 className="text-base font-bold text-gray-900">
                                                {theatre.theatreName}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Theatre Partner
                                            </p>

                                        </div>

                                    </div>

                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                        Pending
                                    </span>

                                </div>

                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center gap-3">

                                        <span className="text-lg">👤</span>

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                Owner
                                            </p>

                                            <p className="text-sm font-medium text-gray-800">
                                                {theatre.ownerName}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="text-lg">📍</span>

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                City
                                            </p>

                                            <p className="text-sm font-medium text-gray-800">
                                                {theatre.theatreAddress.theatreCity}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="text-lg">🆔</span>

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                Application ID
                                            </p>

                                            <p className="text-sm font-medium break-all text-gray-800">
                                                {theatre._id}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="text-lg">📅</span>

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                Applied On
                                            </p>

                                            <p className="text-sm font-medium text-gray-800">
                                                {new Date(theatre.createdAt).toLocaleDateString("en-IN", {
                                                    timeZone: "Asia/Kolkata",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl bg-yellow-50 px-3 py-2">

                                        <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></div>

                                        <p className="text-sm font-medium text-yellow-700">
                                            {theatre.theatreStatus === "Pending" && "Waiting for First Review"}
                                        </p>

                                    </div>

                                </div>

                                <button
                                    onClick={() => ReviewApplicationButtonWork(theatre._id, theatre.theatreStatus)}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
                                >

                                    <span>Review Application</span>

                                    <span>→</span>

                                </button>

                            </div>

                        ))}

                    </div>}

                    {theatrePendingRequestValue.length === 0 && (
                        <div className="mx-4 my-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                                📭
                            </div>

                            <h2 className="mt-4 text-lg font-bold text-gray-800">
                                No Applications Found
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                There are currently no theatre applications waiting for review.
                            </p>

                        </div>
                    )}

                </div>

            </div>
        </>
    )
}

export default TheatreRequestPage