import React from "react";
import AdminTopBar from "../../components/Admin's/AdminTopBar";
import AdminMenuOption from "../../components/Admin's/AdminMenuOption";
import { useEffect, useState } from "react";
import currentAdminDetails from "../../services/currentAdminDetails.js";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate()
    const [menuButton, setMenuButton] = useState(false)
    const [adminData, setAdminData] = useState([])
    const [adminLoginDateTime, setAdminLoginDateTime] = useState({})

    const loginTime = [
        {
            index: 0,
            startTimings: "05:00:00 am",
            endTimings: "11:59:59 am",
            greeting: "Good Morning!",
            message: "Ready to kickstart today's work?"
        },
        {
            index: 1,
            startTimings: "12:00:00 pm",
            endTimings: "04:59:59 pm",
            greeting: "Good Afternoon!",
            message: "Let's keep today's operations running smoothly."
        },
        {
            index: 2,
            startTimings: "5:00:00 pm",
            endTimings: "08:59:59 pm",
            greeting: "Good Evening!",
            message: "Let's wrap up today's tasks efficiently."
        },
        {
            index: 3,
            startTimings: "09:00:00 pm",
            endTimings: "04:59:59 am",
            greeting: "Good Night!",
            message: "Working late? Everything is under control."
        },
    ]

    useEffect(() => {
        const getAdminDetails = async () => {
            try {
                const adminDataResponse = await currentAdminDetails()
                console.log("Admin data is: ", adminDataResponse.data)
                if (adminDataResponse) {
                    setAdminData(adminDataResponse.data)
                }
            } catch (error) {
                console.log("Error while geting the admin details: ", error)
                setAdminData([])
            }
        }
        getAdminDetails()
    }, [])

    useEffect(() => {
        const istDate = new Date(adminData.lastLogin).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const istTime = new Date(adminData.lastLogin).toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
        setAdminLoginDateTime((prev) => ({
            ...prev,
            ["time"]: istTime,
            ["date"]: istDate,
        }))
    }, [adminData])


    const CreateMovies = () => {
        console.log("Add movie button is clicked")
        navigate("/admin/panel/movies/create-movie")
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50">

                <div>
                    <AdminTopBar setMenuButton={setMenuButton} />
                </div>

                <div
                    className={`fixed top-20 right-5 z-[100] transition-all duration-300 ${menuButton
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                >
                    <AdminMenuOption />
                </div>

                <div className="p-4 space-y-5">

                    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                        <div className="flex items-center gap-3">

                            <h1 className="text-4xl">
                                👋
                            </h1>

                            <div>

                                <h1 className="text-lg font-medium text-slate-500">
                                    Welcome Back,
                                </h1>

                                <h1 className="text-3xl font-bold text-slate-900">
                                    {adminData.fullName}
                                </h1>

                            </div>

                        </div>

                        {

                            loginTime.map((time) => {
                                {
                                    const currentTime = new Date(`2000-01-01 ${adminLoginDateTime.time}`);
                                    const startTime = new Date(`2000-01-01 ${time.startTimings}`);
                                    const endTime = new Date(`2000-01-01 ${time.endTimings}`);
                                    return (currentTime > startTime) && (currentTime < endTime) && (<div key={time.index}>
                                        <div className="mt-5">

                                            <h1 className="text-lg font-semibold text-slate-800">
                                                {time.greeting}
                                            </h1>

                                        </div>

                                        <div className="mt-2">

                                            <h1 className="text-sm text-slate-600 leading-6">
                                                {time.message}
                                            </h1>

                                        </div>
                                    </div>)
                                }
                            })
                        }



                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-3xl">
                                    🎬
                                </h1>

                                <h1 className="font-semibold text-slate-700">
                                    Movies
                                </h1>

                            </div>

                            <div className="mt-5">

                                <h1 className="text-3xl font-bold text-blue-600">
                                    Count
                                </h1>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-3xl">
                                    🎭
                                </h1>

                                <h1 className="font-semibold text-slate-700">
                                    Theatre Request
                                </h1>

                            </div>

                            <div className="mt-5">

                                <h1 className="text-3xl font-bold text-amber-500">
                                    Count
                                </h1>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-3xl">
                                    🎟
                                </h1>

                                <h1 className="font-semibold text-slate-700">
                                    Bookings
                                </h1>

                            </div>

                            <div className="mt-5">

                                <h1 className="text-3xl font-bold text-green-600">
                                    Count
                                </h1>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-3xl">
                                    ⭐
                                </h1>

                                <h1 className="font-semibold text-slate-700">
                                    Reviews
                                </h1>

                            </div>

                            <div className="mt-5">

                                <h1 className="text-3xl font-bold text-yellow-500">
                                    Count
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                        <div className="flex items-center gap-2 mb-5">

                            <h1 className="text-2xl">
                                ⚡
                            </h1>

                            <h1 className="text-lg font-bold text-slate-900">
                                Quick Actions
                            </h1>

                        </div>

                        <div className="space-y-3">

                            <button
                                onClick={CreateMovies}
                                className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700 active:scale-95">

                                + Add Movie

                            </button>

                            <button className="w-full rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95">

                                Review Theatre Requests

                            </button>

                        </div>

                    </div>

                    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                        <div className="flex items-center gap-2 mb-5">

                            <h1 className="text-2xl">
                                🎯
                            </h1>

                            <h1 className="text-lg font-bold text-slate-900">
                                Action Center
                            </h1>

                        </div>

                        <div className="space-y-4">

                            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                                <div className="h-4 w-4 rounded-full bg-red-500"></div>

                                <div>

                                    <h1 className="text-xl font-bold text-slate-900">
                                        Value
                                    </h1>

                                    <h1 className="text-sm text-slate-600">
                                        Theatre Requests Pending
                                    </h1>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                                <div className="h-4 w-4 rounded-full bg-amber-500"></div>

                                <div>

                                    <h1 className="text-xl font-bold text-slate-900">
                                        Value
                                    </h1>

                                    <h1 className="text-sm text-slate-600">
                                        Movies Need Updates
                                    </h1>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                                <div className="h-4 w-4 rounded-full bg-green-500"></div>

                                <div>

                                    <h1 className="text-xl font-bold text-slate-900">
                                        Value
                                    </h1>

                                    <h1 className="text-sm text-slate-600">
                                        Today's Bookings
                                    </h1>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                        <div className="flex items-center gap-2">

                            <h1 className="text-2xl">
                                📌
                            </h1>

                            <h1 className="text-lg font-bold text-slate-900">
                                Recent Activity
                            </h1>

                        </div>

                        <div className="mt-5 rounded-xl border-2 border-dashed border-slate-300 py-10 text-center">

                            <h1 className="text-slate-500">
                                No recent activities available.
                            </h1>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default HomePage;