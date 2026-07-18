import React from "react"
import { useState, useEffect } from "react"
import { adminPropContext } from "./adminContextApi"
import currentAdminDetails from "../../services/currentAdminDetails.js"
import { Outlet } from "react-router-dom"

function AdminContextProvider() {

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
    const [adminRole, setAdminRole] = useState("")
    const [adminData, setAdminData] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const superAdminToken = async () => {
            try {
                const handleTokenResponse = await currentAdminDetails()
                console.log("Handle token response is: ", handleTokenResponse)
                if (handleTokenResponse && handleTokenResponse.data.role === "superAdmin") {
                    console.log("Super Admin login and it is printed through: ", handleTokenResponse.data)
                    setIsAdminLoggedIn(true);
                    setAdminData(handleTokenResponse.data)
                    setAdminRole(handleTokenResponse.data.role)
                }
                else if (handleTokenResponse && handleTokenResponse.data.role == "admin") {
                    console.log("Admin login and it is printed through: ", handleTokenResponse.data)
                    setIsAdminLoggedIn(true)
                    setAdminData(handleTokenResponse.data)
                    setAdminRole(handleTokenResponse.data.role)
                }
                else {
                    setIsAdminLoggedIn(false)
                }
            } catch (error) {
                console.log("Error from backend from handle admin token: ", error);
                setIsAdminLoggedIn(false);
                setAdminData(null)
                setAdminRole("")
            }finally{
                setLoading(false)
            }
        }

        superAdminToken();
    }, [])

    return (
        <>
            <adminPropContext.Provider
                value={{ isAdminLoggedIn, setIsAdminLoggedIn, adminRole, setAdminRole, adminData, setAdminData, loading }}
            >
                <Outlet />
            </adminPropContext.Provider>
        </>
    )
}

export default AdminContextProvider