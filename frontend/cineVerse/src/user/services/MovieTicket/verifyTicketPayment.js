
async function verifyTicketPayment({
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
}) {
    try {
        const requestData = {
            bookingId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        };

        const response = await fetch(
            "http://localhost:8000/cineVerse/app/api/payments/verify-payment",
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
                data.message || "Payment verification failed"
            );
        }

        return data;
    } catch (error) {
        console.log("Error from backend is:", error);
        throw error;
    }
}

export default verifyTicketPayment;
