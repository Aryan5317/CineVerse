import React from "react"
import { useState, useEffect } from "react"
import { theatrePropContext } from "./theatreContextApi.js"
import { Outlet } from "react-router-dom"

function TheatreProvider() {

    const [selectedTheatre, setSelectedTheatre] = useState([])
    const [theatreIsLoggedIn, setTheatreIsLoggedIn] = useState(false)

    return (
        <theatrePropContext.Provider
            value={{ selectedTheatre, setSelectedTheatre, theatreIsLoggedIn, setTheatreIsLoggedIn }}
        >
            <Outlet />
        </theatrePropContext.Provider >
    )
}

export default TheatreProvider