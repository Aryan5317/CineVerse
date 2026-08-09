import React from "react"
import { RiUserFill } from "@remixicon/react";
import { useContext } from "react";
import logOutService from "../../services/adminlogOutService.js";
import { adminPropContext } from "../../context/AdminContextProvider/adminContextApi";
import { useNavigate, NavLink } from "react-router-dom";

function AdminMenuOption() {

    const { setIsAdminLoggedIn } = useContext(adminPropContext)
    const navigate = useNavigate()

    const logOutButton = () => {
        const logOutData = async () => {
            console.log("LogOut button is clicked")
            try {
                const logOutResponse = await logOutService()
                if (logOutResponse) {
                    console.log("Admin logOut successfully")
                    setIsAdminLoggedIn(false);
                    navigate("/admin/login")
                }
            } catch (error) {
                console.log("Error while user logOut", error)
            }
        }
        logOutData()
    }

    return (
        <>
            <div className="w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <NavLink
                    to="/admin/panel/dashboard"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>
                    <span className="text-2xl">🏠</span>

                    <h1 className="font-semibold tracking-wide text-slate-700">
                        Dashboard
                    </h1>

                </NavLink>

                <NavLink
                    to="/admin/panel/movies"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>
                    <span className="text-2xl">🎬</span>

                    <h1 className="font-semibold tracking-wide text-slate-700">
                        Movies
                    </h1>

                </NavLink>

                <NavLink
                    to="/admin/panel/theatre"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>

                    <span className="text-2xl">🎭</span>

                    <h1 className="font-semibold tracking-wide text-slate-700">
                        Theatre
                    </h1>

                </NavLink>

                <NavLink
                    to="/admin/panel/profile"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>
                    <div className="text-blue-600">
                        <RiUserFill size={24} />
                    </div>

                    <h1 className="font-semibold tracking-wide text-slate-700">
                        Profile
                    </h1>

                </NavLink>

                <button
                    onClick={logOutButton}
                    className="flex w-full items-center gap-4 px-6 py-4 text-left transition-all duration-300 hover:bg-red-50 active:scale-[0.98]"
                >

                    <span className="text-2xl">🚪</span>

                    <h1 className="font-semibold tracking-wide text-red-600">
                        Logout
                    </h1>

                </button>

            </div >
        </>
    )
}

export default AdminMenuOption