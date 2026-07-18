import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { adminPropContext } from "./adminContextApi"

function AdminProtectedRoute() {
    const { isAdminLoggedIn, loading } = useContext(adminPropContext)

    if (loading) {
        return <div>Loading...</div>
    }
    
    if (!isAdminLoggedIn) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />
}

export default AdminProtectedRoute