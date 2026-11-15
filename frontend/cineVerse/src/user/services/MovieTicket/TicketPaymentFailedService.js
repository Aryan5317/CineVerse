const TicketPaymentFailedService = async ({
    bookingId,
    orderId,
    paymentId,
    errorCode,
    errorDescription
}) => {
    try {
        const response = await fetch(
            "http://localhost:8000/cineVerse/app/api/payments/payment-failed",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bookingId,
                    orderId,
                    paymentId,
                    errorCode,
                    errorDescription
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to record payment failure"
            );
        }

        return data;

    } catch (error) {
        console.error(
            "Ticket Payment Failed Service Error:",
            error.message
        );

        throw error;
    }
};

export default TicketPaymentFailedService;