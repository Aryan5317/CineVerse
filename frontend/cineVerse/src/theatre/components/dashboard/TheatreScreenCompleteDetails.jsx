import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { theatrePropContext } from "../../context/TheatreContextProvider/theatreContextApi.js"
import theatreScreenCompleteDetails from "../../services/dashboard/theatreScreenCompleteDetails.js"
import ScreenSeatLayout from "./ScreenSeatLayout.jsx"
import UpdateScreenStatus from "./UpdateScreenStatus.jsx"

function TheatreScreenCompleteDetails() {

    const { screenId } = useParams()
    const navigate = useNavigate()

    console.log("Screen id came to details page is: , ", screenId)

    const { selectedTheatre } = useContext(theatrePropContext)

    console.log("Theatre Screen Details Page selected Theatre is: ", selectedTheatre)

    const [screenData, setScreenData] = useState({})
    const [seatLayout, setSeatLayout] = useState(false)
    const [screenStatusOption, setScreenStatusOption] = useState(false)

    useEffect(() => {
        const screenDetails = async () => {
            try {
                const theatreScreenCompleteDetailsResponse = await theatreScreenCompleteDetails(screenId, selectedTheatre.theatreId)
                console.log("Theatre Screen Complete Details is: ", theatreScreenCompleteDetailsResponse.data.screenData)
                if (theatreScreenCompleteDetailsResponse) {
                    setScreenData(theatreScreenCompleteDetailsResponse.data.screenData)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
            }
        }
        screenDetails()
    }, [screenId, selectedTheatre.theatreId])

    const MoveLastPage = () => {
        console.log("Back button is clicked in the screen complete details page")
        navigate(-1)
    }

    const OpenSeatLayout = () => {
        console.log("Seat Layout button is clicked");
        setSeatLayout(true)
        document.body.style.overflow = "hidden";
    }

    const EditScreenStatus = () => {
        console.log("Edit screen button is clicked")
        setScreenStatusOption((prev) => !prev)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-slate-200 px-4 pb-8">

                <div className="pt-5">

                    <button
                        onClick={() => MoveLastPage()}
                        type="button"
                        className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 active:scale-[0.98]"
                    >
                        <span className="text-lg">
                            ←
                        </span>
                        <span>
                            Back
                        </span>
                    </button>

                </div>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                            🎬
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-base font-bold text-slate-900">
                                Screen Information
                            </h1>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Overview and configuration details
                            </p>
                        </div>

                    </div>

                    <div className="mt-3 space-y-2">

                        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">

                            <span className="text-xs font-medium text-slate-500">
                                Screen
                            </span>

                            <span className="text-sm font-semibold text-slate-800">
                                {screenData.screenNumber}
                            </span>

                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">

                            <span className="shrink-0 text-xs font-medium text-slate-500">
                                Screen ID
                            </span>

                            <span className="truncate text-xs font-medium text-slate-700">
                                {screenData._id}
                            </span>

                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">

                            <span className="text-xs font-medium text-slate-500">
                                Screen Name
                            </span>

                            <span className="truncate text-sm font-semibold text-slate-800">
                                {screenData?.screenName || "Not specified"}
                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                    <h2 className="text-base font-bold text-slate-900">
                        Current Status
                    </h2>

                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5">

                        <div
                            className={`h-3 w-3 shrink-0 rounded-full ${screenData?.screenStatus === "Available"
                                ? "bg-green-500"
                                : screenData?.screenStatus === "Maintenance"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                                }`}
                        />

                        <h3 className="text-sm font-semibold text-slate-800">
                            {screenData?.screenStatus}
                        </h3>

                    </div>

                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Seating
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Current seating configuration
                            </p>
                        </div>

                        <div className="rounded-xl bg-blue-50 px-3 py-2 text-center">

                            <p className="text-[11px] font-medium text-blue-600">
                                Total Seats
                            </p>

                            <p className="mt-0.5 text-lg font-bold text-blue-700">
                                {screenData.totalSeats}
                            </p>

                        </div>

                    </div>

                    <div className="mt-5">

                        <h3 className="text-sm font-semibold text-slate-700">
                            Seat Distribution
                        </h3>

                        <div className="mt-3 space-y-2">

                            {screenData.seatCategories?.map((category) => (

                                <div
                                    key={category._id}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                                >

                                    <div className="flex items-center justify-between">

                                        <h4 className="text-sm font-semibold text-slate-800">
                                            {category.seatType}
                                        </h4>

                                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                                            {category.rows * category.columns} Seats
                                        </span>

                                    </div>

                                    <div className="mt-2 flex items-center gap-4">

                                        <p className="text-xs text-slate-500">
                                            Rows: <span className="font-semibold text-slate-700">{category.rows}</span>
                                        </p>

                                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                                        <p className="text-xs text-slate-500">
                                            Columns: <span className="font-semibold text-slate-700">{category.columns}</span>
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => OpenSeatLayout()}
                        className="mt-4 flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 active:scale-[0.98]"
                    >
                        <span>
                            View Seat Layout
                        </span>

                        <span className="text-base">
                            →
                        </span>
                    </button>

                </div>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <h2 className="text-base font-bold text-slate-900">
                        Current Show
                    </h2>

                    <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center">

                        <div className="text-xl">
                            🎬
                        </div>

                        <h3 className="mt-1.5 text-sm font-semibold text-slate-700">
                            No show currently assigned
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-500">
                            A currently running show will appear here.
                        </p>

                    </div>

                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                    <h2 className="text-base font-bold text-slate-900">
                        Activity
                    </h2>

                    <div className="mt-4 space-y-4">

                        <div className="flex items-start gap-3">

                            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-600">
                                ✓
                            </div>

                            <div className="min-w-0">

                                <p className="text-sm font-medium text-slate-700">
                                    Screen Added
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {new Date(screenData.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-3">

                            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">
                                ✓
                            </div>

                            <div className="min-w-0">

                                <p className="text-sm font-medium text-slate-700">
                                    Marked for {screenData.screenStatus}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {new Date(screenData.updatedAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={() => EditScreenStatus()}
                    className="mt-5 h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                >
                    Edit Screen
                </button>

                {seatLayout && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
                        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
                            <ScreenSeatLayout setSeatLayout={setSeatLayout} seatCategories={screenData.seatCategories}
                            />
                        </div>
                    </div>
                )}

                {screenStatusOption && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
                        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
                            <UpdateScreenStatus setScreenStatusOption={setScreenStatusOption} ScreenStatus={screenData?.screenStatus}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default TheatreScreenCompleteDetails