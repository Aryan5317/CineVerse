import React from "react"
import { useState, useEffect } from "react"
import activateAdmin from "../services/activateAdminService.js"
import deactivateAdmin from "../services/deActivateAdminService.js"
import adminDetails from "../services/adminDetailsService"
import { useParams } from "react-router-dom"


function AdminStatusUpdateConfirmation({ updateStatus, setUpdateStatus, setAdminStatusUpdate, setUpdateMessage }) {

    const [adminData, setAdminData] = useState([])

    const { adminDetailsIdRoute } = useParams()

    useEffect(() => {
        const getAdminDetails = async () => {
            try {
                const adminResponse = await adminDetails(adminDetailsIdRoute)
                if (adminResponse) {
                    console.log("Admin response from frontend is: ", adminResponse)
                    setAdminData(adminResponse.data)
                }
            } catch (error) {
                console.log("Error from the backend while getting the admin data is: ", error)
            }
        }
        getAdminDetails()
    }, [])

    const SetUpdateStatus = () => {
        console.log("Admin Updation started")
        // setUpdateStatus(true)
        const setAdminStatus = async () => {
            console.log("Status function is started running")
            if (adminData.isActive) {
                console.log("This service is running")
                console.log("Admin deactivate button is clicked")
                try {
                    const deActivateAdminResponse = await deactivateAdmin(adminDetailsIdRoute)
                    if (deActivateAdminResponse) {
                        console.log("Admin status updated successfully");
                        setAdminStatusUpdate(false)
                        setUpdateMessage(true)
                    }
                } catch (error) {
                    console.log("Error while deactivating the admin", error)

                }
            }
            else {
                console.log("Admin activate button is clicked")
                try {
                    const activateAdminResponse = await activateAdmin(adminDetailsIdRoute)
                    if (activateAdminResponse) {
                        console.log("Admin status updated successfully");
                        setAdminStatusUpdate(false)
                        setUpdateMessage(true)
                    }
                } catch (error) {
                    console.log("Error while activating the admin", error)
                }
            }
        }
        setAdminStatus()
    }

    const CancelUpdateStatus = () => {
        console.log("Admin Updation Failed")
        setAdminStatusUpdate(false)
    }

    return (
        <>
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">

                <div className="text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl">
                        ⚠️
                    </div>

                    <h1 className="text-xl font-bold text-slate-900">
                        Update Status?
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Are you sure you want to update the status of this administrator?
                    </p>

                </div>

                <div className="mt-8 flex gap-3">

                    <button
                        onClick={SetUpdateStatus}
                        className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-95"
                    >
                        Yes
                    </button>

                    <button
                        onClick={CancelUpdateStatus}
                        className="flex-1 rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95"
                    >
                        No
                    </button>

                </div>

            </div>
        </>
    )
}

export default AdminStatusUpdateConfirmation