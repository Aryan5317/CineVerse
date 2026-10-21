async function selectedScreenShows(theatreId, screenNumber, screenStatusData, showDate) {
    console.log("Theatre Id  is: ", theatreId)
    console.log("Screen Number is: ", screenNumber)
    console.log("Show date is: ", showDate)
    console.log("Screen status is: ", screenStatusData)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/shows/get-screen-shows/${theatreId}?screenNumber=${screenNumber}&screenStatusData=${screenStatusData}&showDate=${showDate}`, {
            method: "GET",
            credentials: "include"
        }
        )

        const data = await response.json()
        console.log("Data recived from the backend is: ", data)
        if (!response.ok) {
            console.log("Error came from backend while fetching the shows details after filter is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }

}

export default selectedScreenShows