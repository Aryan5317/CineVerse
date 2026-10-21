async function allTheatreScreen(theatreId) {
    console.log("Theatre ID is: ", theatreId)

    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/theatre/all-theatre-screen/${theatreId}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data recived is: ", data)

        if (!response.ok) {
            console.log("Error recived from the backend while getting all theatre Screen data is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from the backend is: ", error)
        throw error;
    }
}

export default allTheatreScreen