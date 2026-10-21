async function screenSeatData(movieId, theatreId) {
    console.log("Movie id is: ", movieId)
    console.log("Theatre id is: ", theatreId)
    try {
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/users/seat-data/${movieId}/${theatreId}`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json();
        console.log("Data is: ", data);
        if (!response.ok) {
            console.log("Error from backend is: ", data.message || data);
            throw new Error(data.message || "Unable to fetch Seats data");
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error)
        throw error
    }
}
export default screenSeatData