const getMyBookings = async () => {
    try {
        const response = await fetch(
            "http://localhost:8000/cineVerse/app/api/payments/my-bookings",
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const responseText = await response.text();

        console.log("My Bookings API Status:", response.status);
        console.log("My Bookings API Response:", responseText);

        let result;

        try {
            result = JSON.parse(responseText);
        } catch {
            throw new Error(
                `Backend returned HTML or invalid JSON. Status: ${response.status}. Check your API URL and backend route.`
            );
        }

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to fetch bookings"
            );
        }

        return result;

    } catch (error) {
        console.error("Get My Bookings Error:", error);
        throw error;
    }
};

export default getMyBookings;