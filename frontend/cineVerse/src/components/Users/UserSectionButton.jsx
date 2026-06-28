import { useState } from "react"
import { NavLink } from "react-router-dom"

function UserSectionButton() {

    return (
        <div className="flex h-full items-center justify-around">

            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 transition-all duration-200 ${isActive
                        ? "text-red-600 font-bold scale-110"
                        : "text-slate-600 hover:text-red-500"
                    }`
                }
            >
                <span className="text-2xl">🏠</span>
                <h1 className="text-sm">Home</h1>
            </NavLink>

            <div className="flex flex-col items-center gap-1 text-slate-600">
                <span className="text-2xl">🔍</span>
                <h1 className="text-sm">Search</h1>
            </div>

            <div className="flex flex-col items-center gap-1 text-slate-600">
                <span className="text-2xl">🎭</span>
                <h1 className="text-sm">Theatre</h1>
            </div>

            <div className="flex flex-col items-center gap-1 text-slate-600">
                <span className="text-2xl">🎟️</span>
                <h1 className="text-sm">Bookings</h1>
            </div>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 transition-all duration-200 ${isActive
                        ? "text-red-600 font-bold scale-110"
                        : "text-slate-600 hover:text-red-500"
                    }`
                }
            >
                <span className="text-2xl">👤</span>
                <h1 className="text-sm">Profile</h1>
            </NavLink>

        </div>
    )
}

export default UserSectionButton