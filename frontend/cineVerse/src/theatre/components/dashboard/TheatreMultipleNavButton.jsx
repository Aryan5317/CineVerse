import React from "react"
import { MdMovie, MdDesktopWindows, MdConfirmationNumber } from "react-icons/md";
import { IoPersonOutline, IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function TheatreMultipleNavButton() {
    return (
        <>
            <div className="grid grid-cols-4 items-center rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-sm">

                <NavLink
                    to="/theatre/home"
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-sky-50 py-2 text-sky-600"
                >
                    <IoHomeOutline className="text-xl" />
                    <span className="text-[11px] font-semibold">
                        Home
                    </span>
                </NavLink>

                <NavLink
                    to="/theatre/shows"
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-slate-500 transition active:bg-sky-50 active:text-sky-600"
                >
                    <MdMovie className="text-xl" />
                    <span className="text-[11px] font-semibold">
                        Shows
                    </span>
                </NavLink>

                <NavLink
                    to="/theatre/screen"
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-slate-500 transition active:bg-sky-50 active:text-sky-600"
                >
                    <MdDesktopWindows className="text-xl" />
                    <span className="text-[11px] font-semibold">
                        Screens
                    </span>
                </NavLink>

                <button
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-slate-500 transition active:bg-sky-50 active:text-sky-600"
                >
                    <MdConfirmationNumber className="text-xl" />
                    <span className="text-[11px] font-semibold">
                        Bookings
                    </span>
                </button>


            </div>
        </>
    )
}

export default TheatreMultipleNavButton