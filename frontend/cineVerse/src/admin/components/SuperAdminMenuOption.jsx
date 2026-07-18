import { RiUserFill } from "@remixicon/react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { adminPropContext } from "../context/AdminContextProvider/adminContextApi.js";
import logOutService from "../services/adminlogOutService.js";

function SuperAdminMenuOption() {

    const {setIsAdminLoggedIn} = useContext(adminPropContext)

    const LogOutService = () => {
        const logOutDetails = async () => {
            try {
                const logOutResponse = await logOutService();
                if (logOutResponse) {
                    setIsAdminLoggedIn(false)
                }
            } catch (error) {
                console.log("Error from backend is: ", error)
            }
        }

        logOutDetails();
    }

    return (
        <>
            <div className="w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>
                    <span className="text-2xl">🏠</span>
                    <h1 className="font-medium text-slate-700">
                        Dashboard
                    </h1>
                </NavLink>

                <NavLink
                    to="/admin/administration"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>
                    <span className="text-2xl">👨</span>
                    <h1 className="font-medium text-slate-700">
                        Administration
                    </h1>
                </NavLink>

                <button className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-blue-50 transition-all duration-200 border-t border-slate-100">
                    <span className="text-2xl">📊</span>
                    <h1 className="font-medium text-slate-700">
                        Analytics
                    </h1>
                </button>

                <button className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-blue-50 transition-all duration-200 border-t border-slate-100">
                    <span className="text-2xl">💬</span>
                    <h1 className="font-medium text-slate-700">
                        Feedback
                    </h1>
                </button>
                <NavLink
                    to="/admin/profile"
                    className={({ isActive }) => `w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 border-l-4 ${isActive
                        ? "bg-blue-50 border-blue-600 shadow-sm"
                        : "border-transparent hover:bg-slate-50 hover:border-blue-300"
                        }`}>
                    <div className="text-blue-600">
                        <RiUserFill size={22} />
                    </div>

                    <h1 className="font-medium text-slate-700">
                        Profile
                    </h1>
                </NavLink>

                <button
                    onClick={LogOutService}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-red-50 transition-all duration-200 border-t border-slate-100">

                    <span className="text-2xl">🚪</span>

                    <h1 className="font-medium text-red-600">
                        Logout
                    </h1>

                </button>

            </div >
        </>
    )
}

export default SuperAdminMenuOption