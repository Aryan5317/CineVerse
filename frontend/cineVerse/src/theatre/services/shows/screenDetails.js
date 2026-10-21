async function screenDetails(theatreId) {
    console.log("Theatre Id is: ", theatreId)

    try {
        const response = await fetch(` http://localhost:8000/cineVerse/app/api/shows/get-screens/${theatreId}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data recived is: ", data)

        if (!response.ok) {
            console.log("Error from backend while fetching the screen details is: ", data.message || data)
            throw new Error(data.message || data)
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default screenDetails