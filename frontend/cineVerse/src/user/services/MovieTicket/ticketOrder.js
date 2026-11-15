async function ticketOrder({
    movieId,
    theatreId,
    screenId,
    showId,
    selectedSeats,
    paymentMethod,
}) {
    try {
        const requestData = {
            movieId,
            theatreId,
            screenId,
            showId,
            selectedSeats,
            paymentMethod,
        };

        const response = await fetch(
            "http://localhost:8000/cineVerse/app/api/payments/create-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(requestData),
            }
        );

        const data = await response.json();

        console.log("HTTP status:", response.status);
        console.log("Frontend received response:", data);

        if (!response.ok) {
            throw new Error(
                data.message || "Payment order creation failed"
            );
        }

        return data;
    } catch (error) {
        console.log("Error from backend is:", error);
        throw error;
    }
}

export default ticketOrder;
