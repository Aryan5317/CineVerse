async function streamingMovieDetails() {
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/movies/users/all-movie", {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        console.log("Data from backend is: ", data)
        if (!response.ok) {
            console.log("Error from backend while fetching streaming movies is: ", data.message || data)
            throw new Error(data.message || "Movie Fetched Failed");
        }

        return data
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default streamingMovieDetails