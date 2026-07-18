import React from "react"
import { RiUser3Fill } from "@remixicon/react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import adminDetails from "../services/adminDetailsService.js";
import deactivateAdmin from "../services/deActivateAdminService.js";
import activateAdmin from "../services/activateAdminService.js";
import AdminStatusUpdateConfirmation from "./AdminStatusUpdateConfirmation.jsx";
import adminUpdateDetails from "../context/adminUpdateDetailsValidation.js";
import updateAdminDetails from "../services/updateAdminDetailsService.js";

function AdminProfileDetails() {

    const personalInformationRef = useRef(null)
    const navigate = useNavigate()
    const { adminDetailsIdRoute } = useParams()

    const [adminData, setAdminData] = useState([])
    const [adminStatusUpdate, setAdminStatusUpdate] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false)
    const [editDetails, setEditDetails] = useState(false)
    const [adminEditValue, setAdminEditValue] = useState({})
    const [editAdminValueErrors, setEditAdminValueErrors] = useState({});
    const [editAdminDetailsMessage, setEditAdminDetailsMessage] = useState(false)
    const [editAdminDetailsLoading, setEditAdminDetailsLoading] = useState(false)

    useEffect(() => {
        const getAdminDetails = async () => {
            try {
                const adminResponse = await adminDetails(adminDetailsIdRoute)
                if (adminDetails) {
                    console.log("Admin response from frontend is: ", adminResponse)
                    setAdminData(adminResponse.data)
                    setAdminEditValue(adminResponse.data)
                }
            } catch (error) {
                console.log("Error from the backend while getting the admin data is: ", error)
            }
        }
        getAdminDetails()
    }, [adminStatusUpdate, editAdminDetailsMessage])

    useEffect(() => {
        if (updateMessage) {
            setTimeout(() => {
                setUpdateMessage(false)
            }, 2000);
        }
    }, [updateMessage])


    const UpdateAdminActiveStatus = () => {
        console.log("Status clicked");
        setAdminStatusUpdate(true)
        // if (updateStatus) {
        //     const setAdminStatus = async () => {
        //         if (adminData.isActive) {
        //             console.log("Admin deactivate button is clicked")
        //             try {
        //                 const deActivateAdminResponse = await deactivateAdmin(adminDetailsIdRoute)
        //                 if (deActivateAdminResponse) {
        //                     console.log("Admin status updated successfully");
        //                 }
        //             } catch (error) {
        //                 console.log("Error while deactivating the admin", error)

        //             }
        //         }
        //         else {
        //             console.log("Admin activate button is clicked")
        //             try {
        //                 const activateAdminResponse = await activateAdmin(adminDetailsIdRoute)
        //                 if (activateAdminResponse) {
        //                     console.log("Admin status updated successfully");
        //                 }
        //             } catch (error) {
        //                 console.log("Error while activating the admin", error)
        //             }
        //         }
        //     }
        //     setAdminStatus()
        // }
    }

    const CloseAdminProfilePage = () => {
        setAdminStatusUpdate(false)
        navigate("/admin/administration");
    }

    const EditAdminProfile = () => {
        setEditDetails(true);

        setTimeout(() => {
            personalInformationRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);

        console.log("Admin Editable value is: ", adminEditValue)
    }

    const UpdateAdminFullName = (e) => {
        const { name, value } = e.target
        setAdminEditValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const UpdateAdminMobileNumber = (e) => {
        const { name, value } = e.target;
        setAdminEditValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const UpdateAdminJoiningDate = (e) => {
        const { name, value } = e.target
        setAdminEditValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const UpdateAdminDetails = () => {
        setEditAdminDetailsLoading(true)
        const updateDetails = async () => {
            const adminUpdateValidationResponse = adminUpdateDetails(adminEditValue)
            if (Object.keys(adminUpdateValidationResponse).length !== 0) {
                setEditAdminValueErrors(adminUpdateValidationResponse)
                setEditAdminDetailsLoading(false)
                return;
            }
            setEditAdminValueErrors({})
            setEditAdminDetailsLoading(true);
            try {
                const adminUpdateResponse = await updateAdminDetails(adminEditValue, adminDetailsIdRoute)
                if (adminUpdateResponse) {
                    console.log("Admin Update Successfull")
                    setEditDetails(false)
                    setEditAdminDetailsMessage(true)
                    setTimeout(() => {
                        setEditAdminDetailsMessage(false)
                    }, 2000);
                }
            } catch (error) {
                console.log("Error from backend while updating the admin details: ", error)
                setEditAdminValueErrors((prev) => ({
                    ...prev,
                    message: error.message
                }))
                setEditAdminDetailsMessage(false);
            } finally {
                setEditAdminDetailsLoading(false);
            }
        }

        updateDetails()
    }

    return (
        <>
            <div className={`min-h-screen bg-slate-50 p-4 space-y-5 ${updateStatus ? "h-screen overflow-hidden" : ""}`}>

                <div className="rounded-2xl bg-white shadow-md border border-slate-200 p-6">

                    <div className="text-center">

                        <h1 className="text-2xl font-bold text-slate-900">
                            Profile Details
                        </h1>

                        <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl text-blue-600">
                            <RiUser3Fill />
                        </div>

                        <h1 className="mt-5 text-xl font-bold text-slate-900">
                            {adminData.fullName}
                        </h1>

                        <h1 className="mt-1 text-sm font-medium text-blue-600">
                            Admin
                        </h1>

                        <div className="mt-4 flex items-center justify-center gap-2">

                            {adminData.isActive && <div className="flex items-center justify-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <h1 className="text-sm font-medium text-green-600">
                                    Active
                                </h1>
                            </div>}
                            {!adminData.isActive && <div className="flex items-center justify-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <h1 className="text-sm font-medium text-red-600">
                                    InActive
                                </h1>
                            </div>}

                        </div>

                    </div>

                </div>

                <div
                    ref={personalInformationRef}
                    className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                    <h1 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                        Personal Information
                    </h1>

                    <div className="space-y-6">

                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-lg">👤</h1>

                                <h1 className="font-medium text-slate-700">
                                    Name
                                </h1>

                            </div>

                            {!editDetails && (
                                <div className="max-w-[55%] break-words text-right text-sm font-medium text-slate-700">
                                    {adminData.fullName}
                                </div>
                            )}

                            {editDetails && (
                                <div className="w-[55%]">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={adminEditValue.fullName}
                                        onChange={UpdateAdminFullName}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            )}

                        </div>

                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-lg">📧</h1>

                                <h1 className="font-medium text-slate-700">
                                    Email
                                </h1>

                            </div>

                            <div className="max-w-[55%] break-all text-right text-sm text-slate-600">
                                {adminData.email}
                            </div>

                        </div>

                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-lg">📱</h1>

                                <h1 className="font-medium text-slate-700">
                                    Mobile Number
                                </h1>

                            </div>

                            {!editDetails && (
                                <div className="max-w-[55%] text-right text-sm text-slate-600">
                                    {adminData.mobileNumber}
                                </div>
                            )}

                            {editDetails && (
                                <div className="w-[55%]">
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={adminEditValue.mobileNumber}
                                        onChange={UpdateAdminMobileNumber}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            )}

                        </div>

                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-lg">📅</h1>

                                <h1 className="font-medium text-slate-700">
                                    Joining Date
                                </h1>

                            </div>

                            {!editDetails && (
                                <div className="text-right text-sm text-slate-600">
                                    {new Date(adminData.joiningdate).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </div>
                            )}

                            {editDetails && (
                                <div className="w-[55%]">
                                    <input
                                        type="date"
                                        name="joiningdate"
                                        value={adminEditValue.joiningdate}
                                        onChange={UpdateAdminJoiningDate}
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            )}

                        </div>

                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3">

                                <h1 className="text-lg">🕒</h1>

                                <h1 className="font-medium text-slate-700">
                                    Last Login
                                </h1>

                            </div>

                            <div className="text-right text-sm text-slate-600">
                                {new Date(adminData.lastLogin).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </div>

                        </div>

                    </div>

                    {editDetails && (
                        <div className="mt-8 flex justify-center">

                            <button
                                disabled={editAdminDetailsLoading}
                                onClick={UpdateAdminDetails}
                                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
                            >
                                {editAdminDetailsLoading ? "Updating.." : "Update Details"}
                            </button>

                        </div>
                    )}

                    {editAdminValueErrors.message && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                            <p className="flex items-center gap-2 text-sm font-medium text-red-600">

                                <span>⚠️</span>

                                {editAdminValueErrors.message}

                            </p>

                        </div>
                    )}
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                    <h1 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                        Admin Performance
                    </h1>

                    <div className="space-y-4">

                        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">

                            <div className="flex items-center gap-3">

                                <h1 className="text-2xl">🎬</h1>

                                <h1 className="font-medium text-slate-700">
                                    Movies Created
                                </h1>

                            </div>

                            <div className="flex items-center gap-3">

                                <h1 className="font-bold text-slate-900">
                                    Count
                                </h1>

                                <h1>›</h1>

                            </div>

                        </button>

                        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">

                            <div className="flex items-center gap-3">

                                <h1 className="text-2xl">🎭</h1>

                                <h1 className="font-medium text-slate-700">
                                    Theatre Approved
                                </h1>

                            </div>

                            <div className="flex items-center gap-3">

                                <h1 className="font-bold text-slate-900">
                                    Count
                                </h1>

                                <h1>›</h1>

                            </div>

                        </button>

                        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">

                            <div className="flex items-center gap-3">

                                <h1 className="text-2xl">❌</h1>

                                <h1 className="font-medium text-slate-700">
                                    Theatre Rejected
                                </h1>

                            </div>

                            <div className="flex items-center gap-3">

                                <h1 className="font-bold text-slate-900">
                                    Count
                                </h1>

                                <h1>›</h1>

                            </div>

                        </button>

                        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">

                            <div className="flex items-center gap-3">

                                <h1 className="text-2xl">⭐</h1>

                                <h1 className="font-medium text-slate-700">
                                    User Rating
                                </h1>

                            </div>

                            <div className="font-bold text-slate-900">
                                /5
                            </div>

                        </button>

                    </div>

                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5">

                    <h1 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">
                        Actions
                    </h1>

                    <div className="space-y-3">

                        <button
                            onClick={EditAdminProfile}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">

                            <h1>✏</h1>

                            <h1>Edit Admin</h1>

                        </button>

                        {adminData.isActive && <button
                            onClick={UpdateAdminActiveStatus}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600">

                            <h1>🚫</h1>

                            <h1>Deactivate Admin</h1>

                        </button>}

                        {!adminData.isActive && (
                            <button
                                onClick={UpdateAdminActiveStatus}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-95">

                                <h1>✅</h1>

                                <h1>Activate Admin</h1>

                            </button>
                        )}

                        <button
                            onClick={CloseAdminProfilePage}
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 hover:border-slate-400 active:scale-95">

                            <h1>←</h1>

                            <h1>Back</h1>

                        </button>

                    </div>

                </div>

            </div >

            {editAdminDetailsMessage && (
                <div className="fixed top-4 left-4 right-4 z-50">

                    <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 shadow-xl">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                            ✅
                        </div>

                        <div className="flex-1">

                            <h1 className="text-base font-semibold text-green-800">
                                Success
                            </h1>

                            <p className="mt-1 text-sm leading-5 text-green-700">
                                Admin details updated successfully.
                            </p>

                        </div>

                    </div>

                </div>
            )}

            {adminStatusUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <AdminStatusUpdateConfirmation updateStatus={updateStatus} setUpdateStatus={setUpdateStatus} setAdminStatusUpdate={setAdminStatusUpdate} setUpdateMessage={setUpdateMessage} />
                </div>
            )}

            {updateMessage && (
                <div className="fixed top-4 left-4 right-4 z-50">

                    <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 shadow-xl">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                            ✅
                        </div>

                        <div className="flex-1">

                            <h1 className="text-base font-semibold text-green-800">
                                Success
                            </h1>

                            <p className="mt-1 text-sm leading-5 text-green-700">
                                Admin status updated successfully.
                            </p>

                        </div>

                    </div>

                </div>
            )}
        </>
    )
}

export default AdminProfileDetails