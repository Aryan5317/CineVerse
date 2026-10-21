import React from "react"
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function ScreenSeatLayout({ setSeatLayout, seatCategories }) {


    const closeSeatLayout = () => {
        console.log("Close Seat Layout button clicked")
        setSeatLayout(false)
        document.body.style.overflow = "";
    }

    console.log("Seat category is: ", seatCategories)

    let seatAlpha = "A";

    return (
        <>
            <div className="relative w-full bg-white">

                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Seat Layout
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() => closeSeatLayout()}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-slate-200 active:scale-95"
                    >
                        <IoClose />
                    </button>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

                    <h1 className="text-center text-lg font-bold text-slate-900">
                        Screen
                    </h1>

                    <div className="mt-3 h-1 w-full rounded-full bg-slate-900" />

                </div>


                <div className="space-y-5 px-4 py-5">

                    {seatCategories.map((seat, index) => {

                        const previousRows = seatCategories
                            .slice(0, index)
                            .reduce((total, category) => total + Number(category.rows), 0)

                        return (
                            <div key={index}>

                                <div className="mb-3 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200" />

                                    <h2 className="shrink-0 text-xs font-bold uppercase tracking-wider text-slate-600">
                                        {seat.seatType}
                                    </h2>

                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>

                                {Array.from({ length: seat.rows }).map((_, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="w-5 shrink-0 text-center text-xs font-semibold text-slate-500">
                                            {String.fromCharCode(
                                                seatAlpha.charCodeAt(0) +
                                                previousRows +
                                                rowIndex
                                            )}
                                        </span>

                                        <div
                                            className="grid flex-1 gap-1.5"
                                            style={{
                                                gridTemplateColumns: `repeat(${seat.columns}, minmax(0, 1fr))`
                                            }}
                                        >
                                            {Array.from({ length: seat.columns }).map((_, columnIndex) => (
                                                <div
                                                    key={columnIndex}
                                                    className="flex h-6 items-center justify-center text-sm font-medium text-slate-500"
                                                >
                                                    ○
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )
                    })}

                </div>

            </div>
        </>
    )
}

export default ScreenSeatLayout