import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import currentAdminDetails from "../../services/currentAdminDetails.js"
import logOutService from "../../services/adminlogOutService.js"
import { adminPropContext } from "../../context/AdminContextProvider/adminContextApi.js"

function AdminProfilePage() {

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState([])
    const {setIsAdminLoggedIn} = useContext(adminPropContext)

    useEffect(() => {
        const getAdminDetails = async () => {
            try {
                const adminDataResponse = await currentAdminDetails()
                console.log("Admin details is: ", adminDataResponse.data)
                if (adminDataResponse) {
                    setAdminData(adminDataResponse?.data)
                }
            } catch (error) {
                console.log("Error while retriving the admin data: ", error)
                setAdminData(null)
            }
        }
        getAdminDetails()
    }, [])

    const PreviousPage = () => {
        console.log("Back button is clicked")
        navigate("/admin/panel/dashboard")
    }

    const logOutAdmin = () => {
        console.log("Admin logOut button is clicked")
        const logOutActivity = async () => {
            try {
                const adminLogOutResponse = await logOutService()
                if(adminLogOutResponse){
                    console.log("Admin LogOut successfully")
                    setIsAdminLoggedIn(false)
                }
            } catch (error) {
                console.log("Error while loging Out Admin", error)
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
                        onClick={PreviousPage}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 active:scale-95">

                        <span className="text-lg font-semibold">←</span>

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
                            Manage your profile and account settings.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">

                        <div className="flex flex-col items-center">

                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl text-blue-600">
                                👤
                            </div>

                            <div className="mt-5">
                                <h1 className="text-xl font-bold text-slate-900 text-center">
                                    {adminData?.fullName}
                                </h1>
                            </div>

                            <div className="mt-2 flex items-center gap-5 rounded-full bg-slate-100 px-4 py-1">

                                <h1 className="text-sm font-semibold tracking-wide text-slate-500">
                                    Member Since:
                                </h1>

                                <h1 className="text-md font-semibold text-slate-700">
                                    {new Date(adminData?.joiningdate).toLocaleDateString(
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

                        <h1 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                            Personal Information
                        </h1>

                        <div className="space-y-4">

                            <div className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-lg">📧</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Email
                                    </h1>

                                </div>

                                <h1 className="max-w-[55%] break-all text-right text-sm text-slate-600">
                                    {adminData?.email}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-lg">📱</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Mobile Number
                                    </h1>

                                </div>

                                <h1 className="text-right text-sm text-slate-600">
                                    {adminData?.mobileNumber}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-lg">🆔</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Admin ID
                                    </h1>

                                </div>

                                <h1 className="text-right text-sm font-medium text-slate-600">
                                    {adminData?.adminId}
                                </h1>

                            </div>

                            <div className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50">

                                <div className="flex items-center gap-3">

                                    <h1 className="text-lg">🕒</h1>

                                    <h1 className="font-medium text-slate-700">
                                        Last Login
                                    </h1>

                                </div>

                                <h1 className="text-right text-sm text-slate-600">
                                    {new Date(adminData?.lastLogin).toLocaleDateString(
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

                        <h1 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                            Account
                        </h1>

                        <div className="space-y-3">

                            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-blue-200 hover:bg-slate-50 active:scale-[0.98]">

                                <div className="flex items-center gap-3">

                                    <span className="text-xl">🔑</span>

                                    <h1 className="font-semibold text-slate-700">
                                        Change Password
                                    </h1>

                                </div>

                                <span className="text-lg text-slate-400">
                                    →
                                </span>

                            </button>

                            <button
                                onClick={logOutAdmin}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-600 active:scale-95">

                                <span className="text-xl">🚪</span>

                                <h1>
                                    Log Out
                                </h1>

                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default AdminProfilePage