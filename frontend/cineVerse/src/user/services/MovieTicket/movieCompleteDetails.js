async function movieCompleteDetails(movieId, state, district) {
    try {
        console.log("Movie id is: ", movieId);
        const response = await fetch(`http://localhost:8000/cineVerse/app/api/users/theatre-movie-details/${movieId}?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`, {
            method: "GET",
            credentials: "include",
        }
        );
        const data = await response.json();
        console.log("Data is: ", data);
        if (response.status === 404 && data.message === "No theatre Found") {
            return {
                theatreNotFound: true,
                message: data.message
            };
        }
        if (!response.ok) {
            console.log("Error from backend is: ", data.message || data);
            throw new Error(data.message || "Unable to fetch data");
        }
        return data;
    } catch (error) {
        console.log("Error from backend is: ", error);
        throw error;
    }
}

export default movieCompleteDetails;