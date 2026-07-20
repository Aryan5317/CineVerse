async function movieDetails(movieId) {
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/movies/user/${movieId}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data is: ", data)

        if (!response.ok) {
            console.log("Error from backend while fetching the data is: ", data.message || data)
            throw new Error(data.message || data)
        }

        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}

export default movieDetails