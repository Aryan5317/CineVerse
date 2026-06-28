import React from "react"
import handleToken from "../../../services/User/handleTokenRouteService"
import logOutService from "../../../services/User/logOutService"
import { useContext } from "react"
import { propContext } from "../../../context/User/contextApi"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"


function ProfileSectionAfterLogin() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const { isLoggedIn, setIsLoggedIn } = useContext(propContext)

    useEffect(() => {
        const getUserDetails = async () => {
            const userDetails = await handleToken();
            console.log("User Details fetched is: ", userDetails.data)
            if (userDetails.data) {
                setUserData(userDetails.data)
            }
        }
        getUserDetails()
    }, [])


    const logOutAction = async () => {
        console.log("Logout button clicked.")

        if (isLoggedIn) {
            try {
                const logOutDataValue = await logOutService()

                console.log("Data received from logout:", logOutDataValue)

                if (logOutDataValue) {
                    setIsLoggedIn(false)
                    setTimeout(() => {
                        navigate("/")
                    })
                }
            } catch (error) {
                console.log("Logout error:", error)
                return
            }
        }
    }



    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] px-6 py-6 pb-24">
                {console.log("User details stored is: ", userData.name)}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-[#0F172A]">
                        Profile
                    </h1>
                </div>

                <div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-200 p-6">

                    <div className="flex flex-col items-center">

                        <div className="w-24 h-24 rounded-full bg-slate-100 border border-gray-300 flex items-center justify-center text-5xl">
                            👤
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">
                            {userData.name}
                        </h1>


                        <div className="mt-5 flex items-center gap-2">

                            <div className="w-3 h-3 rounded-full bg-green-500"></div>

                            <h3 className="font-semibold text-slate-700">
                                Free Member
                            </h3>

                        </div>

                        <button className="mt-5 px-5 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-semibold text-slate-900 shadow">
                            Upgrade to Premium
                        </button>

                    </div>

                </div>

                <div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-200 p-5">

                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                        <div className="flex items-center gap-2">
                            <h1 className="text-xl">📋</h1>

                            <h1 className="text-lg font-semibold text-[#0F172A]">
                                Personal Information
                            </h1>
                        </div>

                        <button className="text-xl hover:scale-110 transition-all">
                            ✏️
                        </button>

                    </div>

                    <div className="mt-5 flex flex-col gap-5">

                        <div>
                            <h2 className="text-sm text-slate-500">
                                Full Name
                            </h2>

                            <h2 className="font-medium text-[#0F172A]">
                                {userData.name}
                            </h2>
                        </div>

                        <div>
                            <h2 className="text-sm text-slate-500">
                                Email
                            </h2>

                            <h2 className="font-medium text-[#0F172A]">
                                {userData.email}
                            </h2>
                        </div>

                        <div>
                            <h2 className="text-sm text-slate-500">
                                Mobile Number
                            </h2>

                            <h2 className="font-medium text-[#0F172A]">
                                {userData.mobileNumber}
                            </h2>
                        </div>

                    </div>

                </div>

                <div className="mt-6 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

                    <div className="px-5 py-4 border-b border-gray-200">
                        <h1 className="text-lg font-semibold text-[#0F172A]">
                            Quick Actions
                        </h1>
                    </div>

                    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-all">

                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl">❤️</h1>

                            <h1 className="font-medium text-[#0F172A]">
                                Watchlist
                            </h1>
                        </div>

                        <span className="text-xl text-slate-500">
                            &gt;
                        </span>

                    </button>

                    <button className="w-full flex items-center justify-between px-5 py-4 border-t border-gray-200 hover:bg-slate-50 transition-all">

                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl">🕒</h1>

                            <h1 className="font-medium text-[#0F172A]">
                                Watch History
                            </h1>
                        </div>

                        <span className="text-xl text-slate-500">
                            &gt;
                        </span>

                    </button>

                    <button className="w-full flex items-center justify-between px-5 py-4 border-t border-gray-200 hover:bg-slate-50 transition-all">

                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl">⚙️</h1>

                            <h1 className="font-medium text-[#0F172A]">
                                Settings
                            </h1>
                        </div>

                        <span className="text-xl text-slate-500">
                            &gt;
                        </span>

                    </button>

                </div>

                <div className="mt-8">
                    <button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-3"
                        onClick={logOutAction}>
                        <span>Logout</span>
                    </button>
                </div>

            </div>
        </>
    )
}

export default ProfileSectionAfterLogin