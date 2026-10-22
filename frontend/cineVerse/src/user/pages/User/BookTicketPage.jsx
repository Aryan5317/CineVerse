import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { indianStates } from "../../utils/Address/stateName";
import { stateDistricts } from "../../utils/Address/districtName";

import movieCompleteDetails from "../../services/MovieTicket/movieCompleteDetails";

function BookTicketPage() {
    const navigate = useNavigate();
    const { movieId } = useParams()

    const [addressData, setAddressData] = useState({
        state: "",
        district: "",
    })
    const [districtNames, setDistrictNames] = useState([])
    const [movieData, setMovieData] = useState([]);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [theatreLoading, setTheatreLoading] = useState(false)
    const [theatresError, setTheatresError] = useState({})
    const [errors, setErrors] = useState({})
    const [theatreFlag, setTheatresFlag] = useState(false)


    useEffect(() => {
        setDistrictNames(stateDistricts[addressData.state] || []);
    }, [addressData.state]);

    const SetState = (e) => {
        const { name, value } = e.target
        setAddressData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const SetDistrict = (e) => {
        const { name, value } = e.target
        setAddressData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const GetTheatres = async () => {
        console.log("Get theatres button is clicked");
        setTheatresError({});
        if (addressData.state === "") {
            setTheatresError((prev) => ({
                ...prev,
                state: "Select the state to get all theatres"
            }));
            return;
        }
        if (addressData.district === "") {
            setTheatresError((prev) => ({
                ...prev,
                district: "Select the district to get all theatres"
            }));
            return;
        }
        setTheatreLoading(true);
        try {
            const getMovieDataResponse = await movieCompleteDetails(movieId, addressData.state, addressData.district);
            if (getMovieDataResponse.theatreNotFound) {
                setMovieData(null);
                setTheatresError((prev) => ({
                    ...prev,
                    message: getMovieDataResponse.message
                }));
                return;
            }
            console.log("Movie data is: ", getMovieDataResponse.data.data);
            setMovieData(getMovieDataResponse.data.data);
            setTheatresFlag(true)
        } catch (error) {
            setTheatresError((prev) => ({
                ...prev,
                message: error.message
            }));
        } finally {
            setTheatreLoading(false);
        }
    };

    const SelectedTheatreValue = (theatre) => {
        console.log("Theatre is: ", theatre)
        setSelectedTheatre(theatre)
    }

    const SelectedMovieDate = (date) => {
        console.log("Selected date is: ", date);
        setSelectedDate(date);
    }

    const SetSelectedMovieTime = (time) => {
        console.log("Selected time is: ", time);
        setSelectedTime(time)
    }

    const BackButtonData = () => {
        console.log("Back button is clicked")
        navigate(-1);
    }

    const ContinueButtonWork = () => {
        console.log("Continue button clicked");
        setErrors({});
        if (selectedTheatre === null) {
            console.log("Theatre not selected");
            setErrors({
                selectedTheatre: "*Select any theatre where you want to book the show"
            });
            return;
        }
        else if (selectedDate === "") {
            console.log("Theatre date is not selected");
            setErrors({
                selectedDate: "*Select the date on which you want to book the show"
            });
            return;
        }
        else if (selectedTime === "") {
            console.log("Theatre time is not selected");
            setErrors({
                selectedTime: "*Select a time slot to book the ticket"
            });
            return;
        }
        setErrors({});
        navigate(`/movie/${movieId}/${selectedTheatre._id}/select-seats`, {
            state: {
                selectedTheatre,
                selectedDate,
                selectedTime
            }
        });

    };

    return (
        <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-900">
                        Find Theatres
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                        Select your state and district to find available theatres.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            State
                        </label>

                        <select
                            name="state"
                            value={addressData.state}
                            onChange={SetState}
                            className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Select State</option>
                            {indianStates.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>

                        {theatresError.state && (
                            <p className="mt-1.5 text-sm font-medium text-red-500">
                                {theatresError.state}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            District
                        </label>

                        <select
                            name="district"
                            value={addressData.district}
                            onChange={SetDistrict}
                            className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Select District</option>
                            {districtNames.map((dist) => (
                                <option key={dist} value={dist}>
                                    {dist}
                                </option>
                            ))}
                        </select>

                        {theatresError.district && (
                            <p className="mt-1.5 text-sm font-medium text-red-500">
                                {theatresError.district}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => GetTheatres()}
                        disabled={theatreLoading}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {theatreLoading ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Loading Theatres...
                            </>
                        ) : (
                            <>
                                <span>🔍</span>
                                Get Theatres
                            </>
                        )}
                    </button>
                    {theatresError.message && (
                        <p className="mt-3 flex justify-center text-center text-sm font-medium text-red-500">
                            {`*${theatresError.message}`}
                        </p>
                    )}
                </div>
            </div>
            {theatreFlag && (
                <div className="min-h-screen w-full bg-slate-50 pb-24">
                    <div className="border-b border-slate-200 bg-white px-5 py-5">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            BOOK TICKETS
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Select your theatre, date and show time
                        </p>
                    </div>

                    <div className="space-y-5 px-4 py-5">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl">
                                    🎬
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Movie
                                    </p>
                                    <h1 className="mt-1 truncate text-lg font-bold text-slate-900">
                                        {movieData.MovieName}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg">📍</span>
                                <span className="text-base font-bold text-slate-800">
                                    Select Theatre
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => SelectedTheatreValue(movieData)}
                                className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left shadow-sm transition-all duration-200 active:scale-[0.99] ${selectedTheatre?._id === movieData?._id
                                    ? "border-blue-600 bg-blue-600 ring-2 ring-blue-200"
                                    : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50"
                                    }`}
                            >
                                <div className="min-w-0 flex-1">
                                    <p
                                        className={`text-xs font-medium ${selectedTheatre?._id === movieData?._id
                                            ? "text-blue-100"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        Theatre Name
                                    </p>

                                    {movieData?.TheatreName?.map((theatre, index) => (
                                        <div key={index}>
                                            <span
                                                className={`mt-1 block truncate text-base font-bold ${selectedTheatre?._id === movieData?._id
                                                    ? "text-white"
                                                    : "text-slate-900"
                                                    }`}
                                            >
                                                {theatre}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="mt-3">
                                        <p
                                            className={`text-xs font-medium ${selectedTheatre?._id === movieData?._id
                                                ? "text-blue-100"
                                                : "text-slate-500"
                                                }`}
                                        >
                                            Location
                                        </p>

                                        <div
                                            className={`mt-1 space-y-0.5 text-sm leading-5 ${selectedTheatre?._id === movieData?._id
                                                ? "text-blue-100"
                                                : "text-slate-600"
                                                }`}
                                        >
                                            <span>{movieData?.TheatreAddress?.theatreLandMark}</span>
                                            <span>, {movieData?.TheatreAddress?.theatreCity}</span>
                                            <span>, {movieData?.TheatreAddress?.theatreDistrict}</span>
                                            <span>, {movieData?.TheatreAddress?.theatrePinCode}</span>
                                            <span>, {movieData?.TheatreAddress?.theatreState}</span>
                                        </div>
                                    </div>
                                </div>

                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${selectedTheatre?._id === movieData?._id
                                        ? "bg-white text-blue-600"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {selectedTheatre?._id === movieData?._id ? "✓" : "→"}
                                </span>
                            </button>

                            {errors.selectedTheatre && (
                                <p className="mt-2 text-sm font-medium text-red-600">
                                    {errors.selectedTheatre}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg">📅</span>
                                <span className="text-base font-bold text-slate-800">
                                    Select Date
                                </span>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {movieData?.ShowDate?.map((date) => (
                                    <button
                                        key={date}
                                        type="button"
                                        onClick={() => SelectedMovieDate(date)}
                                        className={`shrink-0 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98] ${selectedDate === date
                                            ? "border-blue-600 bg-blue-600 text-white shadow-md ring-2 ring-blue-200"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                                            }`}
                                    >
                                        {new Date(date).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </button>
                                ))}
                            </div>

                            {errors.selectedDate && (
                                <p className="mt-2 text-sm font-medium text-red-600">
                                    {errors.selectedDate}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg">🕐</span>
                                <span className="text-base font-bold text-slate-800">
                                    Select Show Time
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                {movieData?.ShowTimings?.map((time) => (
                                    <button
                                        key={time._id}
                                        type="button"
                                        onClick={() => SetSelectedMovieTime(time)}
                                        className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98] ${selectedTime?._id === time._id
                                                ? "border-blue-600 bg-blue-600 text-white shadow-md ring-2 ring-blue-200"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                                            }`}
                                    >
                                        {time.startTime}
                                    </button>
                                ))}
                            </div>
                            {errors.selectedTime && (
                                <p className="mt-2 text-sm font-medium text-red-600">
                                    {errors.selectedTime}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-md gap-3 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                        <button
                            type="button"
                            onClick={() => BackButtonData()}
                            className="w-1/3 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                        >
                            ← Back
                        </button>

                        <button
                            type="button"
                            onClick={() => ContinueButtonWork()}
                            className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookTicketPage