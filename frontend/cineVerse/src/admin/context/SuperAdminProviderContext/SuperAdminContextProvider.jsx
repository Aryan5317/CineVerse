import React from "react"
import { useState, useEffect } from "react"
import { superPropContext } from "../superAdminContextApi"
import { Outlet } from "react-router-dom"
import handleSuperAdminToken from "../../services/handleSuperAdminToken"
function SuperAdminContextProvider() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

    useEffect(() => {
        const superAdminToken = async () => {
            try {
                const handleTokenResponse = await handleSuperAdminToken()
                if (handleTokenResponse) {
                    setIsAdminLoggedIn(true);
                }
                else {
                    setIsAdminLoggedIn(false)
                }
            } catch (error) {
                console.log("Error from backend from handle super admin token: ", error);
                setIsAdminLoggedIn(false);
            }
        }

        superAdminToken();
    }, [])


    return (
        <>
            <superPropContext.Provider
                value={{ isAdminLoggedIn, setIsAdminLoggedIn }}
            >
                <Outlet />
            </superPropContext.Provider>
        </>
    )
}

export default SuperAdminContextProvider