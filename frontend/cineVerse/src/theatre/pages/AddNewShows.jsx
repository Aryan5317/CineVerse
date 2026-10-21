import React from "react"
import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { theatrePropContext } from "../context/TheatreContextProvider/theatreContextApi.js"
import activeScreens from "../services/shows/activeScreens.js"
import addNewShow from "../context/theatreUser/addNewShowValidation.js"
import addNewShowsService from "../services/shows/addNewShowsService.js"

function AddNewShows() {

    const navigate = useNavigate()
    const { selectedTheatre } = useContext(theatrePropContext)
    console.log("Selected Theatre is add new shows page is: ", selectedTheatre)

    const { theatreId } = useParams();

    const [totalScreens, setTotalScreens] = useState([])
    const [showDetails, setShowDetails] = useState({
        movieName: "",
        showsStartTime: "",
        showsDuration: "",
        showImage: "",
        showsDate: "",
        showStatus: "",
        seatPrices: [],
        screenNumber: "",
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const SetMovieName = (e) => {
        const { name, value } = e.target;
        setShowDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetShowDate = (e) => {
        const { name, value } = e.target
        setShowDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetShowStartTIme = (e) => {
        const { name, value } = e.target
        setShowDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetShowDuration = (e) => {
        const { name, value } = e.target;
        setShowDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetShowStatus = (e) => {
        const { name, checked, value } = e.target
        console.log("Checked value is: ", checked)
        console.log("Value is: ", value)
        setShowDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetMovieImage = (e) => {
        const { name, files } = e.target
        console.log("Files value is: ", files[0])
        setShowDetails((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    }

    const SetSelectedScreenData = (value) => {
        const name = "screenNumber"
        console.log("Screen Value is: ", value)
        console.log("Name for selected screen is: ", name)
        setShowDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const screens = async () => {
            try {
                const activeScreensResponse = await activeScreens(theatreId)
                console.log("Active screen response is: ", activeScreensResponse.data.screens)
                if (activeScreensResponse) {
                    setTotalScreens(activeScreensResponse.data.screens)
                }
            } catch (error) {
                console.log("Error from backend while getting active screens: ", error)
            }
        }
        screens()
    }, [theatreId])

    useEffect(() => {
        setShowDetails((prev) => ({
            ...prev,
            seatPrices: ["Normal", "Premium", "Recliner"].map((category) => ({
                seatType: category,
                price: ""
            }))
        }))
    }, [theatreId])


    const SetSeatPrice = (e, type) => {
        const { name, value } = e.target;

        setShowDetails((prev) => ({
            ...prev,
            seatPrices: prev.seatPrices.map((seats) => seats.seatType === type ? { ...seats, [name]: value } : seats)
        }));
    }


    const CancelAddShow = () => {
        console.log("Cancel button clicked")
        navigate(-1)
    }

    const AddShow = async () => {
        console.log("Add Show button clicked")
        setLoading(true)
        const addNewShowValidationResponse = addNewShow(showDetails);
        console.log("Add new show validation: ", addNewShowValidationResponse)
        if (Object.keys(addNewShowValidationResponse).length !== 0) {
            setErrors(addNewShowValidationResponse)
            setLoading(false)
            return;
        }
        try {
            const addNewShowResponse = await addNewShowsService(showDetails, theatreId)
            console.log("Add new Show Response: ", addNewShowResponse)
            if (addNewShowResponse) {
                setMessage(true)
                navigate(-1);
            }
        } catch (error) {
            console.log("Error from backend while adding show is: ", error)
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
            <div>
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

                <div className="space-y-4">

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Movie Name
                            </label>

                            <input
                                type="text"
                                name="movieName"
                                placeholder="Enter movie name"
                                value={showDetails.movieName}
                                onChange={SetMovieName}
                                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            {errors.movieName && (
                                <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                    <span>{errors.movieName}</span>
                                </p>
                            )}

                        </div>

                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Show Date
                            </label>

                            <input
                                type="date"
                                name="showsDate"
                                value={showDetails.showsDate}
                                onChange={SetShowDate}
                                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            {errors.showsDate && (
                                <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                    <span>{errors.showsDate}</span>
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Show Start Time
                            </label>

                            <input
                                type="time"
                                name="showsStartTime"
                                value={showDetails.showsStartTime}
                                onChange={SetShowStartTIme}
                                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            {errors.showsStartTime && (
                                <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                    <span>{errors.showsStartTime}</span>
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Show Duration
                            </label>

                            <input
                                type="number"
                                name="showsDuration"
                                min="1"
                                placeholder="Duration in minutes"
                                value={showDetails.showsDuration}
                                onChange={SetShowDuration}
                                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            {errors.showsDuration && (
                                <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                    <span>{errors.showsDuration}</span>
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <h2 className="text-base font-bold text-slate-900">
                            Show Status
                        </h2>

                        <div className="mt-3 space-y-2">

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100">

                                <input
                                    type="radio"
                                    name="showStatus"
                                    value="Completed"
                                    checked={showDetails.showStatus === "Completed"}
                                    onChange={SetShowStatus}
                                    className="h-4 w-4"
                                />

                                <span className="text-sm font-medium text-slate-700">
                                    Completed
                                </span>

                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100">

                                <input
                                    type="radio"
                                    name="showStatus"
                                    value="Cancelled"
                                    checked={showDetails.showStatus === "Cancelled"}
                                    onChange={SetShowStatus}
                                    className="h-4 w-4"
                                />

                                <span className="text-sm font-medium text-slate-700">
                                    Cancelled
                                </span>

                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100">

                                <input
                                    type="radio"
                                    name="showStatus"
                                    value="Scheduled"
                                    checked={showDetails.showStatus === "Scheduled"}
                                    onChange={SetShowStatus}
                                    className="h-4 w-4"
                                />

                                <span className="text-sm font-medium text-slate-700">
                                    Scheduled
                                </span>

                            </label>

                        </div>

                        {errors.showStatus && (
                            <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                <span>{errors.showStatus}</span>
                            </p>
                        )}

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Movie Image
                        </label>

                        <input
                            type="file"
                            name="showImage"
                            onChange={SetMovieImage}
                            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-600 file:mr-3 file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                        />

                        {errors.showImage && (
                            <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                <span>{errors.showImage}</span>
                            </p>
                        )}

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <h2 className="text-base font-bold text-slate-900">
                            Select Screen
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Choose the screen for this show.
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-2">

                            {totalScreens.map((screen) => (

                                <button
                                    key={screen._id}
                                    type="button"
                                    onClick={() => SetSelectedScreenData(screen.screenNumber)}
                                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition active:scale-[0.98] ${showDetails.screenNumber === screen.screenNumber
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                        }`}
                                >
                                    Screen {screen.screenNumber}
                                </button>

                            ))}

                        </div>

                        {errors.screenNumber && (
                            <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                <span>{errors.screenNumber}</span>
                            </p>
                        )}

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <h2 className="text-base font-bold text-slate-900">
                            Seat Price
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Set the ticket price for each seat category.
                        </p>

                        <div className="mt-4 space-y-3">

                            {["Normal", "Premium", "Recliner"].map((seats, index) => (

                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                                >

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        {seats}
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="price"
                                            min="0"
                                            placeholder="Enter price"
                                            value={seats.price}
                                            onChange={(e) => SetSeatPrice(e, seats)}
                                            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-8 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />

                                    </div>

                                    {errors.price && (
                                        <p className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                            <span>{errors.price}</span>
                                        </p>
                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="border-b border-slate-100 pb-4">
                        <h1 className="text-lg font-bold text-slate-900">Shows Summary</h1>
                        <p className="mt-1 text-xs text-slate-500">
                            Review the show details before adding it.
                        </p>
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5">
                            <h1 className="text-xs font-semibold text-slate-500">Show</h1>
                            <p className="text-right text-sm font-semibold text-slate-800">
                                {showDetails.movieName}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5">
                            <h1 className="text-xs font-semibold text-slate-500">Show Start Time</h1>
                            <p className="text-right text-sm font-semibold text-slate-800">
                                {showDetails.showsStartTime}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5">
                            <h1 className="text-xs font-semibold text-slate-500">Show Duration</h1>
                            <p className="text-right text-sm font-semibold text-slate-800">
                                {showDetails.showsDuration}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5">
                            <h1 className="text-xs font-semibold text-slate-500">Show Status</h1>
                            <p className="text-right text-sm font-semibold text-slate-800">
                                {showDetails.showStatus}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5">
                            <h1 className="text-xs font-semibold text-slate-500">Show Date</h1>
                            <p className="text-right text-sm font-semibold text-slate-800">
                                {showDetails.showsDate}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2.5">
                            <h1 className="text-xs font-semibold text-slate-500">Screen Number</h1>
                            <p className="text-right text-sm font-semibold text-slate-800">
                                {showDetails.screenNumber}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <h1 className="text-sm font-bold text-slate-900">Seat Prices</h1>

                        <div className="mt-3 space-y-2">
                            {showDetails.seatPrices.map((seats, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                                >
                                    <h1 className="text-sm font-semibold text-slate-700">
                                        {seats.seatType}
                                    </h1>
                                    <p className="text-sm font-bold text-slate-900">
                                        ₹{seats.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <h1 className="text-sm font-bold text-slate-900">Show Image</h1>

                        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            <img
                                src={
                                    showDetails?.showImage
                                        ? URL.createObjectURL(showDetails.showImage)
                                        : ""
                                }
                                alt="Show Image"
                                className="h-48 w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={() => CancelAddShow()}
                            className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={() => AddShow()}
                            className="h-11 flex-1 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                        >
                            + Add Show
                        </button>

                        {errors.message && (
                            <p className="mt-3 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-600">
                                <span>⚠️</span>
                                <span>{errors.message}</span>
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddNewShows