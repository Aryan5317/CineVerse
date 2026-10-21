import { useState, useContext, useEffect } from "react"
import TheatreMultipleNavButton from "../components/dashboard/TheatreMultipleNavButton"
import { useNavigate } from "react-router-dom"
import { theatrePropContext } from "../context/TheatreContextProvider/theatreContextApi.js"
import allTheatreScreen from "../services/dashboard/getAllTheatreScreen.js"
import screenDashboard from "../services/dashboard/theatreScreenDashboardApi.js"

function ScreensPage() {

    const navigate = useNavigate()
    const { selectedTheatre } = useContext(theatrePropContext)

    const userTheatreId = selectedTheatre?.theatreId

    console.log("User Theatre id value is: ", userTheatreId)

    const [screenDashboardData, setScreenDashboardData] = useState([])
    const [theatreScreensData, setTheatreScreensData] = useState([])

    const AddScrren = () => {
        console.log("Add New Screen button is clicked")
        navigate(`/theatre/${userTheatreId}/screens/add-new-screen`)
    }

    useEffect(() => {
        console.log("Selected Theatre is: ", selectedTheatre)
    }, [selectedTheatre])

    useEffect(() => {
        const screenDashboardDetails = async () => {
            try {
                const screenDashboardResponse = await screenDashboard(userTheatreId)
                console.log("Response from the screen dashboard api is: ", screenDashboardResponse.data.data)
                if (screenDashboardResponse) {
                    setScreenDashboardData(screenDashboardResponse.data.data)
                }
            } catch (error) {
                console.log("Errro from backend is: ", error)
                setScreenDashboardData([])
            }
        }
        screenDashboardDetails()
    }, [])


    useEffect(() => {
        const theatreScreenDetails = async () => {
            try {
                const allTheatreScreenResponse = await allTheatreScreen(userTheatreId)
                console.log("Theatre all Screen data response is: ", allTheatreScreenResponse.data.theatreScreen)
                if (allTheatreScreenResponse) {
                    setTheatreScreensData(allTheatreScreenResponse.data.theatreScreen)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
                setTheatreScreensData([])
            }
        }
        theatreScreenDetails()
    }, [])

    const ScreenCompleteDetails = (id) => {
        console.log("Screen view Details is clicked")
        console.log("Screen id is: ", id);
        navigate(`/theatre/screen/${id}/shows/add-new-show`)
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-slate-200 pb-24">

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

                <section className="px-4 pt-5">

                    <div className="mb-4">
                        <h1 className="text-xl font-bold text-slate-900">
                            Screen Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage and monitor your theatre screens.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-lg">
                                🎬
                            </div>

                            <p className="mt-3 text-xs font-medium text-slate-500">
                                Total Screens
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                {screenDashboardData.totalScreen}
                            </h2>

                        </div>

                        <div className="rounded-2xl border border-green-200 bg-green-50 p-3 shadow-sm">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-lg">
                                ✓
                            </div>

                            <p className="mt-3 text-xs font-medium text-green-700">
                                Available
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-green-800">
                                {screenDashboardData.availableScreen}
                            </h2>

                        </div>

                        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-3 shadow-sm">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-lg">
                                🔧
                            </div>

                            <p className="mt-3 text-xs font-medium text-orange-700">
                                Maintenance
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-orange-800">
                                {screenDashboardData.maintenanceScreen}
                            </h2>

                        </div>

                    </div>

                </section>

                <section className="px-4 pt-5">

                    <button
                        onClick={() => AddScrren()}
                        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-base font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 active:scale-[0.98]"
                    >
                        <span className="text-xl">
                            +
                        </span>

                        <span>
                            Add Screen
                        </span>
                    </button>

                </section>

                <section className="px-4 pt-5">

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                                🖥️
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-slate-900">
                                    Your Screens
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Your theatre screens will appear here.
                                </p>
                            </div>

                        </div>

                        {theatreScreensData.length === 0 && <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">

                            <div className="text-3xl">
                                🖥️
                            </div>

                            <h3 className="mt-3 text-sm font-semibold text-slate-700">
                                No Screens Added
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Add your first screen to start managing shows and seating.
                            </p>

                        </div>}

                        {theatreScreensData.length !== 0 && (
                            <div className="mt-5 space-y-3">

                                {theatreScreensData.map((screen) => (

                                    <div
                                        key={screen._id}
                                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <span className="text-sm font-medium text-slate-500">
                                                    Screen:
                                                </span>

                                                <span className="text-base font-bold text-slate-900">
                                                    {screen.screenNumber}
                                                </span>

                                            </div>

                                            <div
                                                className={`h-3 w-3 shrink-0 rounded-full ${screen.screenStatus === "Available"
                                                    ? "bg-green-500"
                                                    : screen.screenStatus === "Maintenance"
                                                        ? "bg-orange-500"
                                                        : "bg-red-500"
                                                    }`}
                                            />

                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-sm">

                                            <span className="font-semibold text-slate-800">
                                                {screen.totalSeats}
                                            </span>

                                            <span className="text-slate-500">
                                                Seats
                                            </span>

                                            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />

                                            <span className="font-medium text-slate-600">
                                                {screen.screenFormat}
                                            </span>

                                        </div>

                                        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3">

                                            <div className="flex items-center gap-2">

                                                <span className="text-xs font-semibold text-slate-500">
                                                    Current Show:
                                                </span>

                                                <span className="truncate text-xs font-medium text-slate-700">
                                                    No show currently running
                                                </span>

                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => ScreenCompleteDetails(screen._id)}
                                            className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98]"
                                        >
                                            <span>
                                                View Details
                                            </span>

                                            <span className="text-base">
                                                →
                                            </span>
                                        </button>

                                    </div>

                                ))}

                            </div>
                        )}
                    </div>

                </section>

                <footer className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-md">
                    <TheatreMultipleNavButton />
                </footer>
            </div>
        </>
    )
}

export default ScreensPage