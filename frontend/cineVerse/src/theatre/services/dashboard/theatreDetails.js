async function theatreDetails() {
    try {
        const response = await fetch(
            "http://localhost:8000/cineVerse/app/api/theatre/theatre-details",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await response.json();

        console.log("Data is received is: ", data);

        if (!response.ok) {
            console.log(
                "Error from backend while fetching theatre data is: ",
                data.message || data
            );

            throw new Error(data.message || "Failed to fetch theatre details");
        }

        return data;

    } catch (error) {
        console.log("Error from backend is: ", error);
        throw error;
    }
}

export default theatreDetails;