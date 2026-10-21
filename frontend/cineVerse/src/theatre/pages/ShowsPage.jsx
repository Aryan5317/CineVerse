import React from "react"
import TheatreMultipleNavButton from "../components/dashboard/TheatreMultipleNavButton"
import { useContext, useState, useEffect } from "react"
import { theatrePropContext } from "../context/TheatreContextProvider/theatreContextApi.js"
import { useNavigate } from "react-router-dom"
import screenDetails from "../services/shows/screenDetails.js"
import { MdDesktopWindows } from "react-icons/md";
import selectedScreenShows from "../services/shows/selectedScreenShows.js"

function ShowsPage() {

    const navigate = useNavigate()

    const { selectedTheatre } = useContext(theatrePropContext)

    console.log("Selected Theatre is shows page is: ", selectedTheatre)

    const TodayDate = new Date().toISOString().split("T")[0]

    const [screenData, setScreenData] = useState([])
    const [selectedDate, setSelectedDate] = useState(TodayDate)
    const [selectedScreenData, setSelectedScreenData] = useState("All")
    const [screenStatusData, setSelectedScreenStatusData] = useState("Scheduled");
    const [filterShowData, setFilterShowData] = useState([])

    useEffect(() => {
        const screenCompleteData = async () => {
            try {
                const screenDetailsResponse = await screenDetails(selectedTheatre.theatreId)
                console.log("Screen Details response is: ", screenDetailsResponse.data.screens)
                if (screenDetailsResponse) {
                    setScreenData(screenDetailsResponse.data.screens)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
            }
        }
        screenCompleteData()
    }, [selectedTheatre.theatreId])

    useEffect(() => {
        const screenShows = async () => {
            try {
                const screenShowsDetailsResponse = await selectedScreenShows(selectedTheatre.theatreId, selectedScreenData, screenStatusData, selectedDate);
                if (screenShowsDetailsResponse) {
                    console.log("Screen shows details are: ", screenShowsDetailsResponse.data.showsData)
                    setFilterShowData(screenShowsDetailsResponse.data.showsData)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
            }
        }
        screenShows()
    }, [selectedDate, selectedScreenData])



    const SelectedScreen = (value) => {
        console.log("Value is: ", value)
        setSelectedScreenData(value)
    }

    const SelectedScreenStatus = (value) => {
        console.log("Value is: ", value)
        setSelectedScreenStatusData(value)
    }

    const SetDate = (e) => {
        const { name, value } = e.target;
        console.log("Name is date feild: ", name)
        console.log("Value in date feild:", value)
        setSelectedDate(value)
    }

    const NavigateToScreenPage = () => {
        console.log("Add screen button is clicked")
        navigate(`/theatre/${selectedTheatre.theatreId}/screens/add-new-screen`)
    }

    const NavigateAddShowPage = () => {
        console.log("Add new show button is clicked")
        navigate(`/theatre/${selectedTheatre.theatreId}/shows/add-new-show`)
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-slate-200 px-4 pb-24">

                <div className="mt-4 flex w-full min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl">
                        🏢
                    </div>

                    <div className="min-w-0 flex-1">

                        <h1 className="truncate text-sm font-bold text-slate-900">
                            {selectedTheatre.theatreName}
                        </h1>

                        <div className="mt-1.5 flex min-w-0 items-center gap-2">

                            <span className="truncate text-xs font-medium text-slate-500">
                                {selectedTheatre.theatreAddress?.theatreCity}
                            </span>

                            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />

                            <span
                                className={`shrink-0 text-[11px] font-semibold ${selectedTheatre.theatreAvailability
                                    ? "text-emerald-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {selectedTheatre.theatreAvailability ? "Active" : "Inactive"}
                            </span>

                        </div>

                    </div>

                </div>

                {screenData.length === 0 && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">

                        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-blue-50 text-2xl">
                            <MdDesktopWindows className="text-xl" />

                        </div>

                        <h2 className="mt-3 text-base font-bold text-slate-900">
                            Add a Screen First
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            Add a screen for this theatre before adding shows.
                        </p>

                        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">

                            <p className="text-xs leading-5 text-slate-500">
                                To add a screen, navigate to the Screen page or use the button below.
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() => NavigateToScreenPage()}
                            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                        >
                            <span className="text-xl leading-none">
                                +
                            </span>

                            <span>
                                Add Screen
                            </span>
                        </button>

                    </div>
                )}

                {screenData.length !== 0 && <div className="mt-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Shows
                        </h1>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Manage theatre shows
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => NavigateAddShowPage()}
                        className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        + Add Shows
                    </button>

                </div>}

                {screenData.length !== 0 && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Screen
                            </p>

                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {screenData.map((screen) => (
                                    <button
                                        onClick={() => SelectedScreen(screen.screenNumber)}
                                        key={screen._id}
                                        type="button"
                                        className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${selectedScreenData === screen.screenNumber
                                                ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                            }`}
                                    >
                                        Screen {screen.screenNumber}
                                    </button>
                                ))}

                                <button
                                    onClick={() => SelectedScreen("All")}
                                    type="button"
                                    className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${selectedScreenData === "All"
                                            ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                >
                                    All
                                </button>
                            </div>
                        </div>

                        <div className="my-3 border-t border-slate-100" />

                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </p>

                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {["Completed", "Cancelled", "Scheduled"].map((screen, index) => (
                                    <button
                                        onClick={() => SelectedScreenStatus(screen)}
                                        key={index}
                                        type="button"
                                        className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${screenStatusData === screen
                                                ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                            }`}
                                    >
                                        {screen}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {screenData.length !== 0 && <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <label
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Select Date
                    </label>

                    <input
                        type="date"
                        id="date"
                        name="selectedDate"
                        value={selectedDate}
                        onChange={SetDate}
                        className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                </div>}

                {screenData.length !== 0 && <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="flex items-center justify-between">

                        <h1 className="text-base font-bold text-slate-900">
                            Shows {selectedDate}
                        </h1>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            0 Shows
                        </span>

                    </div>

                    {filterShowData.length === 0 && <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">

                        <div className="text-2xl">
                            🎬
                        </div>

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                            No shows available
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Shows scheduled for this date will appear here.
                        </p>

                    </div>}
                    {filterShowData.length !== 0 && (
                        <div className="mt-4 space-y-3">
                            {filterShowData.map((data, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <div className="flex gap-3 p-3">
                                        <img
                                            src={data.movieImage}
                                            alt="Error 404"
                                            className="h-28 w-20 shrink-0 rounded-xl object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <h1 className="truncate text-base font-bold text-slate-900">
                                                {data.movieName}
                                            </h1>

                                            <div className="mt-2 space-y-1.5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-xs text-slate-500">Screen</span>
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {data.screenNumber}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-xs text-slate-500">Status</span>
                                                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                                                        {data.showStatus}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-xs text-slate-500">Duration</span>
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {data.showsDuration}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="text-xs text-slate-500">Show Date</span>
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {new Date(data.showsDate).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50 p-3">
                                        <div className="rounded-xl bg-white px-3 py-2.5">
                                            <p className="text-[11px] font-medium text-slate-500">
                                                Booked Seats
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-slate-900">
                                                {data.totalBookedSeats}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-white px-3 py-2.5">
                                            <p className="text-[11px] font-medium text-slate-500">
                                                Revenue
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-slate-900">
                                                ₹{data.totalRevenue}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 p-3">
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Seat Prices
                                        </h2>

                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {data.seatPrices.map((slot, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                                                >
                                                    <p className="text-xs font-medium text-slate-500">
                                                        {slot.seatType}
                                                    </p>
                                                    <p className="mt-1 text-sm font-bold text-slate-800">
                                                        ₹{slot.price}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>}

                <footer className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-md">

                    <TheatreMultipleNavButton />

                </footer>

            </div>
        </>
    )
}

export default ShowsPage