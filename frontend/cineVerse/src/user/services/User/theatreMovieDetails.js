async function theatreMovieDetails() {
    try {
        const response = await fetch("http://localhost:8000/cineVerse/app/api/movies/users/all-theatre", {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        console.log("Data recived from backend is: ", data)
        if(!response.ok){
            console.log("Error from backend while returing theater movies is: ", data.message || data)
            throw new Error(data.message || "Movie Fetch Failed")
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error;
    }
}

export default theatreMovieDetails