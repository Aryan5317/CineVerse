import React from "react"
import { IoNotificationsOutline } from "react-icons/io5";
import MultipleTheatreOptions from "../components/dashboard/MultipleTheatreOptions";
import TheatreMultipleNavButton from "../components/dashboard/TheatreMultipleNavButton";
import DailyShows from "../components/dashboard/DailyShows";
import { MdSupportAgent } from "react-icons/md";

import { useState, useEffect } from "react";

function HomePage() {

    const [currentTheatreData, setCurrentTheatreData] = useState([])

    useEffect(() => {
        console.log("Current theatre data is: ", currentTheatreData)
    }, [currentTheatreData])

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-slate-200 pb-24">

                <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl">
                            🎭
                        </div>

                        <div>
                            <h1 className="text-base font-bold leading-tight text-slate-900">
                                CineVerse
                            </h1>

                            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                                Theatre
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 active:scale-95"
                    >
                        <IoNotificationsOutline className="text-[22px]" />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                </header>


                <main>

                    <div className="px-4 pt-4">
                        <MultipleTheatreOptions />
                    </div>


                    <section className="px-4 pt-5">

                        <div className="mb-3">
                            <h2 className="text-sm font-bold tracking-wide text-slate-900">
                                TODAY'S OVERVIEW
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Quick summary of today's theatre activity
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">

                            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-lg">
                                    🎟
                                </div>

                                <p className="mt-3 text-xs font-medium text-slate-500">
                                    Bookings
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    0
                                </h3>

                            </div>


                            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-lg">
                                    🎬
                                </div>

                                <p className="mt-3 text-xs font-medium text-slate-500">
                                    Shows
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    0
                                </h3>

                            </div>


                            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-lg">
                                    💰
                                </div>

                                <p className="mt-3 text-xs font-medium text-slate-500">
                                    Revenue
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    ₹0
                                </h3>

                            </div>

                        </div>

                    </section>


                    <section className="px-4 pt-5">

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="mb-4 flex items-center justify-between">

                                <div>
                                    <h2 className="text-sm font-bold tracking-wide text-slate-900">
                                        TODAY'S SHOWS
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Manage your scheduled shows
                                    </p>
                                </div>

                                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-600">
                                    Today
                                </span>

                            </div>

                            <DailyShows
                                currentTheatreData={currentTheatreData}
                            />

                        </div>

                    </section>


                    <section className="px-4 pt-5">

                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                                    ⚠
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold tracking-wide text-amber-900">
                                        NEEDS ATTENTION
                                    </h2>

                                    <p className="mt-1 text-xs text-amber-700">
                                        Items that may require your attention
                                    </p>
                                </div>

                            </div>

                            <div className="mt-4 space-y-2">

                                <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3">

                                    <span className="text-sm text-amber-500">
                                        ⚠
                                    </span>

                                    <p className="text-sm font-medium text-slate-700">
                                        Low seat availability
                                    </p>

                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3">

                                    <span className="text-sm text-amber-500">
                                        ⚠
                                    </span>

                                    <p className="text-sm font-medium text-slate-700">
                                        Pending settlement
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    <section className="px-4 pt-5">

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                                    🕘
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold tracking-wide text-slate-900">
                                        RECENT ACTIVITY
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Latest theatre updates
                                    </p>
                                </div>

                            </div>

                            <div className="mt-4 space-y-3">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                                        ✓
                                    </div>

                                    <p className="text-sm text-slate-700">
                                        Show created
                                    </p>

                                </div>

                                <div className="flex items-center gap-3">

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                                        ✓
                                    </div>

                                    <p className="text-sm text-slate-700">
                                        Booking received
                                    </p>

                                </div>

                                <div className="flex items-center gap-3">

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600">
                                        ✓
                                    </div>

                                    <p className="text-sm text-slate-700">
                                        Payment processed
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    <section className="px-4 py-5">

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
                                    <MdSupportAgent />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-slate-900">
                                        Support
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-slate-600">
                                        Need help with your theatre?
                                    </p>
                                </div>

                            </div>

                            <button
                                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                            >
                                <span>
                                    Get Support
                                </span>

                                <span>
                                    →
                                </span>
                            </button>

                        </div>

                    </section>

                </main>


                <footer className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-md">
                    <TheatreMultipleNavButton />
                </footer>

            </div>
        </>
    )
}

export default HomePage