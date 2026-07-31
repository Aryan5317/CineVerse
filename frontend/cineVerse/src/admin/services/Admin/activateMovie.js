async function activateMovie(movieId) {
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/movies/admin/${movieId}/active`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json()
        console.log("Data is : ", data)
        if (!response.ok) {
            console.log("Error from backend is while activating the movie: ", data.message || data)
            throw new Error(data.message || "Movie Activate Error")
        }
        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default activateMovie