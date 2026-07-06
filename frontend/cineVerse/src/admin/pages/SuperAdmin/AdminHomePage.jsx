import { useState } from "react"
import { RiNotification4Line, RiMenuFill } from "@remixicon/react";
import SuperAdminMenuOption from "../../components/SuperAdminMenuOption";
import SuoerAdminTopBar from "../../components/SuoerAdminTopBar";
import AdminLoginPage from "./AdminLoginPage";
function AdminHomePage() {
    const [menuButton, setMenuButton] = useState(false)

    return (
        <>
            < div className="min-h-screen bg-[#F8FAFC]">
                <div>
                    <SuoerAdminTopBar menuButton={menuButton} setMenuButton={setMenuButton} />
                </div>

                <div
                    className={`fixed top-20 right-5 z-[100] transition-all duration-300 ${menuButton
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                >
                    <SuperAdminMenuOption />
                </div>
                <div className="px-5 py-6">
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5">

                        <div className="text-center">

                            <h1 className="text-xl font-bold tracking-wide text-slate-800">
                                COMPANY OVERVIEW
                            </h1>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">

                            <div className="bg-[#FFF7ED] border border-orange-200 rounded-2xl p-4 shadow-sm">

                                <h2 className="text-sm text-slate-500">
                                    Revenue
                                </h2>

                                <h1 className="mt-2 text-xl font-bold text-orange-600">
                                    ₹0
                                </h1>

                            </div>

                            <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-4 shadow-sm">

                                <h2 className="text-sm text-slate-500">
                                    Bookings
                                </h2>

                                <h1 className="mt-2 text-xl font-bold text-blue-600">
                                    0
                                </h1>

                            </div>

                            <div className="bg-[#ECFDF5] border border-green-200 rounded-2xl p-4 shadow-sm">

                                <h2 className="text-sm text-slate-500">
                                    Theatres
                                </h2>

                                <h1 className="mt-2 text-xl font-bold text-green-600">
                                    0
                                </h1>

                            </div>

                            <div className="bg-[#F5F3FF] border border-violet-200 rounded-2xl p-4 shadow-sm">

                                <h2 className="text-sm text-slate-500">
                                    Movies
                                </h2>

                                <h1 className="mt-2 text-xl font-bold text-violet-600">
                                    0
                                </h1>

                            </div>

                        </div>

                        <div className="mt-8">

                            <div className="h-64 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">

                                {/* Here will be graph space leave it as it is */}

                            </div>

                        </div>

                        <div className="mt-6">

                            <h1 className="text-center text-lg font-bold text-slate-800">
                                Company Growth Graph
                            </h1>

                            <div className="flex flex-wrap justify-center gap-3 mt-5 text-sm font-medium text-slate-600">

                                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                                    Revenue
                                </span>

                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                    Bookings
                                </span>

                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                    Users
                                </span>

                                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                                    Movies
                                </span>

                                <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700">
                                    Theatres
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div >

        </>
    )
}

export default AdminHomePage