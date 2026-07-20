async function movieDetails(movieId) {
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/movies/admin/${movieId}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error from bacekend while geting movie data is: ", data.message || data)
            throw new Error(data.message || "Failed movie data fetched")
        }
        return data;
    } catch (error) {
        console.log("Error from backend while getting backend is: ", error)
        throw error;
    }
}

export default movieDetails