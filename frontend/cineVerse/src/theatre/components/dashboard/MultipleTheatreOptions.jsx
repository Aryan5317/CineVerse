import React from "react"
import theatreDetails from "../../services/dashboard/theatreDetails.js"
import { useState, useEffect } from "react"
import { IoChevronDown } from "react-icons/io5";

function MultipleTheatreOptions({setCurrentTheatreData}) {

    const [theatreData, setTheatreData] = useState([])

    useEffect(() => {
        console.log("MultipleTheatreOptions mounted");

        const theatreValue = async () => {
            console.log("Calling theatreDetails service...");

            try {
                const theatreDetailsResponse = await theatreDetails()
                console.log("Theatre Deatils Response is: ", theatreDetailsResponse.data.length)
                if (theatreDetailsResponse) {
                    setTheatreData(theatreDetailsResponse.data)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
                setTheatreData([])
            }
        }
        theatreValue()
    }, [])

    return (
        <>
            {theatreData?.map((theatre, index) => (
                <div
                    key={index}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 shadow-sm"
                >

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-lg">
                                🏢
                            </div>

                            <div className="min-w-0">
                                <h1 className="truncate text-sm font-bold text-slate-900">
                                    {theatre.theatreName}
                                </h1>

                                <div className="mt-1 flex items-center gap-2">
                                    <span className="truncate text-xs font-medium text-slate-500">
                                        {theatre.theatreAddress?.theatreCity}
                                    </span>

                                    <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />

                                    <span
                                        className={`shrink-0 text-[11px] font-semibold ${theatre.theatreAvailability
                                            ? "text-emerald-600"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {theatre.theatreAvailability
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {theatreData.length > 1 && <button
                        type="button"
                        className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 active:bg-slate-100"
                    >
                        <IoChevronDown className="text-base" />
                    </button>}
                </div>
            ))}
        </>
    )
}

export default MultipleTheatreOptions