import React from "react"
import AdminTopBar from "../../components/Admin's/AdminTopBar"
import AdminMenuOption from "../../components/Admin's/AdminMenuOption"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Theatres() {

    const navigate = useNavigate()
    const [menuButton, setMenuButton] = useState(false)

    const PendingRequestButtonWork = () => {
        console.log("Pending request button click")
        navigate("/admin/panel/theatre/pending-request")
    }

    return (
        <>
            <div className="min-h-screen w-full max-w-md mx-auto bg-slate-50 border-x border-gray-200 shadow-xl">

                <div>
                    <AdminTopBar
                        menuButton={menuButton}
                        setMenuButton={setMenuButton}
                    />
                </div>

                <div
                    className={`fixed top-20 right-5 z-[100] transition-all duration-300 ${menuButton
                        ? "opacity-100 translate-y-0"
                        : "pointer-events-none opacity-0 -translate-y-3"
                        }`}
                >
                    <AdminMenuOption />
                </div>

                <div className="px-5 pt-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                            🎭
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Theatres
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage theatre partners
                            </p>
                        </div>

                    </div>

                </div>

                <div className="px-5 pt-6">

                    <div className="rounded-3xl border border-orange-200 bg-orange-50 p-5">

                        <div className="flex items-start gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                                📝
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Applications
                                </h2>

                                <p className="mt-1 text-sm text-orange-700 leading-relaxed">
                                    New theatre registrations awaiting admin action.
                                </p>
                            </div>

                        </div>

                        <div className="mt-5 space-y-3">

                            <button
                                onClick={PendingRequestButtonWork}
                                className="flex w-full items-center justify-between rounded-2xl border border-white bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50">

                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">
                                        Pending Request
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Awaiting Review
                                    </p>
                                </div>

                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                                    Open →
                                </span>

                            </button>

                            <button className="flex w-full items-center justify-between rounded-2xl border border-white bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50">

                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">
                                        Rejected Theatres
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Previously rejected applications
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                    Open →
                                </span>

                            </button>

                        </div>

                    </div>

                </div>

                <div className="px-5 pt-5">

                    <div className="rounded-3xl border border-green-200 bg-green-50 p-5">

                        <div className="flex items-start gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                                🎭
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Theatre Partners
                                </h2>

                                <p className="mt-1 text-sm text-green-700 leading-relaxed">
                                    Manage all approved CineVerse theatre partners.
                                </p>
                            </div>

                        </div>

                        <div className="mt-5 space-y-3">

                            <button className="flex w-full items-center justify-between rounded-2xl border border-white bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:border-green-300 hover:bg-green-50">

                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">
                                        Active Partners
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Approved and active theatres
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                    Open →
                                </span>

                            </button>

                            <button className="flex w-full items-center justify-between rounded-2xl border border-white bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50">

                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-800">
                                        Suspended
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Currently inactive theatres
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                    Open →
                                </span>

                            </button>

                        </div>

                    </div>

                </div>

                <div className="px-5 py-6">

                    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">

                        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                📌
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Activity
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Latest actions performed by admins
                                </p>
                            </div>

                        </div>

                        <div className="px-5 py-10 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                                📋
                            </div>

                            <p className="mt-4 text-sm text-gray-500">
                                No recent activity available.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
export default Theatres