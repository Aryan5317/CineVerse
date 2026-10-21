import React from "react";
import { useState, useContext } from "react";
import { theatrePropContext } from "../../context/TheatreContextProvider/theatreContextApi.js";
import screenStatusUpdate from "../../services/dashboard/screenStatusUpdate.js";
import { useParams } from "react-router-dom";

function UpdateScreenStatus({ setScreenStatusOption, ScreenStatus }) {

    const { selectedTheatre } = useContext(theatrePropContext)

    console.log("Theatre Screen status updation is: ", selectedTheatre.theatreId)

    const [screenStatus, setScreenStatus] = useState(ScreenStatus)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const { screenId } = useParams()

    console.log("Screen Status is: ", ScreenStatus)

    console.log("Screen id on updating screen status is: ", screenId)

    const CancelScreenStatusOption = () => {
        console.log("Cancel button clicked on the edit screen page")
        setScreenStatusOption(false);
    }

    const EditScreenStatus = async () => {
        console.log("Edit screen status button is clicked")
        setLoading(true)
        if (!screenStatus) {
            setErrors((prev) => ({
                ...prev,
                "screenStatus": "*Screen Status is required"
            }))
            setLoading(false)
            return;
        }
        else if (screenStatus === ScreenStatus) {
            setMessage(true)
            setLoading(false)
            setTimeout(() => {
                setScreenStatusOption(false)
            }, 1000);
            return;
        }

        try {
            const screenStatusUpdateResponse = await screenStatusUpdate(screenId, selectedTheatre.theatreId, screenStatus)
            console.log("Screen Status updation response is: ", screenStatusUpdateResponse)
            if (screenStatusUpdateResponse) {
                setLoading(false)
                setMessage(true)
                setTimeout(() => {
                    setScreenStatusOption(false)
                }, 1000);
            }
        } catch (error) {
            console.log("Error from backend is: ", error)
            setErrors((prev) => ({
                ...prev,
                error: error.message
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="border-b border-slate-100 pb-4">
                    <h1 className="text-lg font-bold text-slate-900">
                        Change Screen Status
                    </h1>

                    <p className="mt-1 text-xs text-slate-500">
                        Select the status you want to set for this screen.
                    </p>
                </div>

                <div className="mt-4 space-y-2.5">

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition hover:border-slate-300 hover:bg-slate-100">

                        <input
                            type="radio"
                            name="screenStatus"
                            value="Available"
                            checked={screenStatus === "Available"}
                            className="h-4 w-4 shrink-0"
                            onChange={(e) => setScreenStatus(e.target.value)}
                        />

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                                🟢 Available
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Available for shows
                            </p>
                        </div>

                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition hover:border-slate-300 hover:bg-slate-100">

                        <input
                            type="radio"
                            name="screenStatus"
                            value="Maintenance"
                            checked={screenStatus === "Maintenance"}
                            className="h-4 w-4 shrink-0"
                            onChange={(e) => setScreenStatus(e.target.value)}
                        />

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                                🟠 Maintenance
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Temporarily unavailable
                            </p>
                        </div>

                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition hover:border-slate-300 hover:bg-slate-100">

                        <input
                            type="radio"
                            name="screenStatus"
                            value="Closed"
                            checked={screenStatus === "Closed"}
                            className="h-4 w-4 shrink-0"
                            onChange={(e) => setScreenStatus(e.target.value)}
                        />

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                                🔴 Closed
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Not available for use
                            </p>
                        </div>

                    </label>

                    {errors.screenStatus && (
                        <p className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-600">
                            <span>{errors.screenStatus}</span>
                        </p>
                    )}

                </div>

                <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">

                    <button
                        type="button"
                        onClick={() => CancelScreenStatusOption()}
                        className="h-11 flex-1 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => EditScreenStatus()}
                        className="h-11 flex-1 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

                {message && (
                    <p className="mt-3 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2.5 text-xs font-semibold text-green-600">
                        <span>✅</span>
                        <span>Screen Status Updated Successfully</span>
                    </p>
                )}

            </div>
        </>
    )
}

export default UpdateScreenStatus