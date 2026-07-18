import React from "react"
import { useEffect, useState } from "react"
import getAllAdmindetails from "../services/allAdminDetailsService"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"

function GetAllAdmin() {

    const navigate = useNavigate();
    const [adminErrors, setAdminErrors] = useState("")
    const [adminDetails, setAdminDetails] = useState([])

    useEffect(() => {
        const allAdminDetails = async () => {
            try {
                const allAdminDetailsResponse = await getAllAdmindetails();
                if (allAdminDetailsResponse) {
                    console.log("All admin details is: ", allAdminDetailsResponse.data)
                    setAdminDetails(allAdminDetailsResponse.data)
                }
            } catch (error) {
                console.log("Error from backend is: ", error.message)
                setAdminErrors(error.message)
            }
        }
        allAdminDetails()
    }, [])

    const adminDetailsPage = (e) => {
        console.log("Admin id is: ", e);

        navigate(`/admin/administration/${e}`)

        // setAdminDetailsIdRoute(e);
        // setSelectedAdminId(e);
        // setSelectAdmin(true)
    }


    return (
        <>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">

                <div className="border-b border-slate-200 px-5 py-4">
                    <h1 className="text-xl font-bold text-slate-900">
                        All Admin Details
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        View and manage all administrators of CineVerse.
                    </p>
                </div>

                {/* Search Bar (For Future Use) */}
                {/* <div className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200">
                <RiSearchLine className="text-lg text-slate-500" />
                <input
                    type="text"
                    placeholder="Search Admin"
                    className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                />
            </div>
        </div> */}

                <div className="grid grid-cols-4 bg-slate-100 px-5 py-3">

                    <h1 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        S.No
                    </h1>

                    <h1 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Name
                    </h1>

                    <h1 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Email
                    </h1>

                    <h1 className="text-right text-xs font-bold uppercase tracking-wide text-slate-500 px-6">
                        Last Logined
                    </h1>

                </div>
                <div>

                    <div>

                        {adminDetails.length > 0 ? (

                            adminDetails.map((details, i) => (

                                <div
                                    key={details._id}
                                    onClick={() => adminDetailsPage(details._id)}
                                    className="grid grid-cols-4 items-center border-t border-slate-100 px-5 py-4 transition-all duration-200 hover:bg-slate-50"
                                >

                                    <h1 className="text-sm font-semibold text-slate-700">
                                        {i + 1}
                                    </h1>

                                    <h1 className="text-sm font-semibold text-slate-900 break-words">
                                        {details.fullName}
                                    </h1>

                                    <h1 className="break-all text-sm text-slate-600">
                                        {details.email}
                                    </h1>

                                    <h1 className="text-right text-xs font-medium text-slate-500">
                                        {new Date(details.lastLogin).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </h1>

                                </div>

                            ))

                        ) : (

                            <div className="flex min-h-[250px] flex-col items-center justify-center px-6 py-10 text-center">

                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                                    👤
                                </div>

                                <h1 className="text-lg font-semibold text-slate-800">
                                    No Admins Found
                                </h1>

                                <p className="mt-2 max-w-xs text-sm text-slate-500">
                                    There are currently no administrators available.
                                    Create your first admin to get started.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </>
    )
}

export default GetAllAdmin