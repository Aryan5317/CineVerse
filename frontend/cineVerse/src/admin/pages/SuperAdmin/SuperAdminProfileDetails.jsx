import React from "react"
import { useState, useEffect, useContext } from "react"
import currentAdminDetails from "../../services/currentAdminDetails"
import { useNavigate } from "react-router-dom"
import logOutService from "../../services/adminlogOutService.js"
import { adminPropContext } from "../../context/AdminContextProvider/adminContextApi"

function SuperAdminProfileDetails() {

    const navigate = useNavigate()
    const [profileDetails, setProfileDetails] = useState([])
    const {setIsAdminLoggedIn} = useContext(adminPropContext)

    useEffect(() => {
        const adminDetails = async () => {
            try {
                const adminDeailsResponse = await currentAdminDetails()
                if (adminDeailsResponse) {
                    console.log("Admin details data is: ", adminDeailsResponse)
                    setProfileDetails(adminDeailsResponse?.data)
                }
            } catch (error) {
                console.log("Error from the fetch admin data", error)
                setProfileDetails([])
            }
        }
        adminDetails()
    }, [])

    const MoveBack = () => {
        console.log("Go Back to last page")
        navigate("/admin/dashboard")
    }

    const SuperAdminLogOutOption = () => {
        console.log("Super Admin logOut button is clicked")
        const logOutActivity = async () => {
            try {
                const logOutResponse = await logOutService()
                if(logOutResponse){
                    console.log("Super Admin logOut Successfully")
                    setIsAdminLoggedIn(false)
                }
            } catch (error) {
                console.log("Error while loging out admin: ", error)
                setIsAdminLoggedIn(true)
            }
        }
        logOutActivity()
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 p-4">

                <div className="mb-5">
                    <button
                        onClick={MoveBack}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 active:scale-95">

                        <h1 className="text-lg font-semibold">←</h1>

                        <h1 className="font-semibold">
                            Back
                        </h1>

                    </button>
                </div>

                <div className="space-y-5">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            My Profile
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View your profile information and account settings.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">

                        <div className="flex flex-col items-center">

                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl text-blue-600">
                                👤
                            </div>

                            <h1 className="mt-5 text-xl font-bold text-slate-900">
                                {profileDetails?.fullName}
                            </h1>

                            <h1 className="mt-1 text-sm font-medium text-blue-600">
                                Super Admin
                            </h1>

                            <div className="mt-4 flex items-center gap-2">

                                <div className="h-3 w-3 rounded-full bg-green-500"></div>

                                <h1 className="text-sm font-medium text-green-600">
                                    Active
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                        <h1 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                            Personal Information
                        </h1>

                        <div className="space-y-4">

                            <div className="flex items-center justify-between rounded-xl px-2 py-3 hover:bg-slate-50">

                                <div className="flex items-center gap-3">
                                    <h1 className="text-lg">👤</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Name
                                    </h1>
                                </div>

                                <h1 className="max-w-[55%] break-words text-right text-sm font-medium text-slate-600">
                                    {profileDetails?.fullName}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-2 py-3 hover:bg-slate-50">

                                <div className="flex items-center gap-3">
                                    <h1 className="text-lg">📧</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Email
                                    </h1>
                                </div>

                                <h1 className="max-w-[55%] break-all text-right text-sm text-slate-600">
                                    {profileDetails?.email}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-2 py-3 hover:bg-slate-50">

                                <div className="flex items-center gap-3">
                                    <h1 className="text-lg">📱</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Mobile Number
                                    </h1>
                                </div>

                                <h1 className="text-right text-sm text-slate-600">
                                    {profileDetails?.mobileNumber}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-2 py-3 hover:bg-slate-50">

                                <div className="flex items-center gap-3">
                                    <h1 className="text-lg">📅</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Joining Date
                                    </h1>
                                </div>

                                <h1 className="text-right text-sm text-slate-600">
                                    {new Date(profileDetails?.joiningdate).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-2 py-3 hover:bg-slate-50">

                                <div className="flex items-center gap-3">
                                    <h1 className="text-lg">🕒</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Last Login
                                    </h1>
                                </div>

                                <h1 className="text-right text-sm text-slate-600">
                                    {new Date(profileDetails?.lastLogin).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">

                        <h1 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                            Account
                        </h1>

                        <div className="space-y-4">

                            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 transition-all duration-200 hover:border-blue-200 hover:bg-slate-50 active:scale-[0.98]">

                                <h1 className="font-medium text-slate-700">
                                    Change Password
                                </h1>

                                <h1 className="text-xl font-semibold text-slate-400">
                                    →
                                </h1>

                            </button>

                            <button
                            onClick={SuperAdminLogOutOption}
                                className="w-full rounded-xl bg-red-500 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-600 active:scale-95">

                                Log Out

                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}


export default SuperAdminProfileDetails