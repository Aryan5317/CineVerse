async function getAllActiveMovie(availabilityType) {
    console.log("availabilityType value to send to backend is: ", availabilityType)
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/movies/all-active-movie?availabilityType=${availabilityType}`, {
            method: "Get",
            credentials: "include"
        })
        const data = await response.json()
        console.log("Data from response is: ", data)
        if (!response.ok) {
            console.log("Error from backend while fetching the movie data is: ", data.message || data)
            throw new Error(data.message || "Movie details fetched error")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}


export default getAllActiveMovie