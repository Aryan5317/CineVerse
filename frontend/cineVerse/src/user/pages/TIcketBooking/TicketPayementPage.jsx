import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ticketOrder from "../../services/MovieTicket/ticketOrder.js";
import verifyTicketPayment from "../../services/MovieTicket/verifyTicketPayment.js";
import TicketPaymentFailedService from "../../services/MovieTicket/TicketPaymentFailedService.js";
import BookingTicket from "../../components/Booking/BookingTicket.jsx";

const RAZORPAY_SCRIPT_URL =
    "https://checkout.razorpay.com/v1/checkout.js";

const PAYMENT_METHODS = [
    {
        value: "upi",
        apiValue: "UPI",
        title: "UPI",
        description: "Google Pay, PhonePe, Paytm and other UPI apps",
    },
    {
        value: "card",
        apiValue: "Card",
        title: "Debit / Credit Card",
        description: "Pay securely using your bank card",
    },
    {
        value: "netbanking",
        apiValue: "NetBanking",
        title: "Net Banking",
        description: "Pay through your bank account",
    },
];

function TicketPayementPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state?.verifiedBookingDetails;

    const {
        movieId,
        movieName,
        theatreId,
        theatreName,
        screenId,
        screenNumber,
        showId,
        showDate,
        showTime,
        selectedSeats = [],
        ticketSubtotal,
        convenienceFee,
        totalAmount,
    } = booking || {};

    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const formatPrice = (amount) =>
        typeof amount === "number" && Number.isFinite(amount)
            ? `₹${amount.toLocaleString("en-IN")}`
            : "—";

    const formatDate = (date) => {
        if (!date) return "Not available";

        const parsed = new Date(date);

        return Number.isNaN(parsed.getTime())
            ? "Not available"
            : parsed.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
    };

    const hasValidBooking = Boolean(
        booking &&
        movieId &&
        theatreId &&
        screenId &&
        showId &&
        movieName &&
        theatreName &&
        typeof totalAmount === "number" &&
        typeof ticketSubtotal === "number" &&
        typeof convenienceFee === "number" &&
        Array.isArray(selectedSeats) &&
        selectedSeats.length > 0 &&
        selectedSeats.every(
            (seat) =>
                seat?.seatId &&
                seat?.seatLabel &&
                seat?.seatType
        )
    );

    const loadRazorpay = () =>
        new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            let script = document.querySelector(
                `script[src="${RAZORPAY_SCRIPT_URL}"]`
            );

            if (script) {
                script.addEventListener(
                    "load",
                    () => resolve(Boolean(window.Razorpay)),
                    { once: true }
                );

                script.addEventListener(
                    "error",
                    () => resolve(false),
                    { once: true }
                );

                return;
            }

            script = document.createElement("script");
            script.src = RAZORPAY_SCRIPT_URL;
            script.async = true;
            script.onload = () => resolve(Boolean(window.Razorpay));
            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });


    const handlePayment = async () => {
        if (!hasValidBooking || isProcessing || paymentSuccess) return;

        setIsProcessing(true);
        setPaymentMessage("");

        try {
            const loaded = await loadRazorpay();

            if (!loaded) {
                throw new Error(
                    "Unable to load Razorpay. Check your internet connection and try again."
                );
            }

            const orderResponse = await ticketOrder({
                movieId,
                theatreId,
                screenId,
                showId,
                selectedSeats: selectedSeats.map((seat) => ({
                    seatId: seat.seatId,
                    seatLabel: seat.seatLabel,
                    seatType: seat.seatType,
                })),
                paymentMethod: PAYMENT_METHODS.find(
                    (method) => method.value === paymentMethod
                )?.apiValue,
            });

            const {
                bookingId,
                orderId,
                keyId,
                amountInPaise,
                currency,
            } = orderResponse?.data || {};

            if (
                !bookingId ||
                !orderId ||
                !keyId ||
                !Number.isSafeInteger(amountInPaise) ||
                amountInPaise <= 0
            ) {
                throw new Error(
                    "The backend returned incomplete payment order details."
                );
            }

            const checkoutOptions = {
                key: keyId,
                amount: amountInPaise,
                currency: currency || "INR",
                name: "CineVerse",
                description: `Tickets for ${movieName}`,
                order_id: orderId,

                // config: {
                //     display: {
                //         blocks: {
                //             selected_method: {
                //                 name:
                //                     paymentMethod === "upi"
                //                         ? "Pay with UPI"
                //                         : paymentMethod === "card"
                //                             ? "Pay with Debit / Credit Card"
                //                             : "Pay with Net Banking",

                //                 instruments: [
                //                     {
                //                         method: paymentMethod,
                //                     },
                //                 ],
                //             },
                //         },
                //         sequence: ["block.selected_method"],
                //         preferences: {
                //             show_default_blocks: false,
                //         },
                //     },
                // },

                theme: {
                    color: "#0ea5e9",
                },

                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                        setPaymentMessage(
                            "Checkout was closed. Your booking is not confirmed."
                        );
                    },
                },

                handler: async (response) => {
                    setPaymentMessage(
                        "Payment received. Verifying with CineVerse..."
                    );

                    try {
                        const verificationResponse =
                            await verifyTicketPayment({
                                bookingId,
                                razorpay_order_id:
                                    response.razorpay_order_id,
                                razorpay_payment_id:
                                    response.razorpay_payment_id,
                                razorpay_signature:
                                    response.razorpay_signature,
                            });

                        if (verificationResponse?.success !== true) {
                            throw new Error(
                                verificationResponse?.message ||
                                "Payment verification failed."
                            );
                        }
                        setConfirmedBooking(verificationResponse.data?.booking);
                        setPaymentSuccess(true);
                        setPaymentMessage(
                            "Payment verified successfully. Your booking is confirmed."
                        );
                    } catch (error) {
                        setPaymentMessage(
                            `${error.message} Please check your booking status before trying again.`
                        );
                    } finally {
                        setIsProcessing(false);
                    }
                },
            };

            const checkout = new window.Razorpay(checkoutOptions);

            checkout.on("payment.failed", async (response) => {
                console.log("========== PAYMENT FAILED EVENT FIRED ==========");
                console.log("Booking ID:", bookingId);
                console.log("Order ID:", orderId);
                console.log("Payment Error:", response.error);

                const razorpayErrorDesc =
                    response.error?.description || "Payment failed. Please try again.";

                let finalMessage = razorpayErrorDesc;

                try {
                    console.log("Calling backend payment-failed API...");

                    const result = await TicketPaymentFailedService({
                        bookingId,
                        orderId,
                        paymentId: response.error?.metadata?.payment_id,
                        errorCode: response.error?.code,
                        errorDescription: razorpayErrorDesc
                    });

                    console.log("Backend Response:", result);

                    // Use backend message if available
                    if (result?.message) {
                        finalMessage = result.message;
                    }
                } catch (error) {
                    console.error("Backend API Error:", error);
                    finalMessage = error.message || razorpayErrorDesc;
                } finally {
                    setIsProcessing(false);
                    // Update state to display the error message on the payment page UI
                    setPaymentMessage(finalMessage);
                }
            });

            checkout.open();
        } catch (error) {
            setPaymentMessage(
                error.message || "Unable to start payment."
            );

            setIsProcessing(false);
        }
    };


    if (!hasValidBooking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
                <div className="max-w-sm rounded-2xl bg-white p-6 text-center shadow">
                    <h1 className="text-xl font-bold">
                        Booking details unavailable
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Return to your booking summary and verify the
                        booking again.
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-5 w-full rounded-xl bg-sky-500 p-3 font-semibold text-white"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (confirmedBooking) {
        return <BookingTicket booking={confirmedBooking} />;
    }
    if (paymentSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
                <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow">
                    <div className="text-5xl text-green-600">✓</div>

                    <h1 className="mt-4 text-2xl font-bold">
                        Payment Successful!
                    </h1>

                    <p className="mt-2 text-sm text-slate-600">
                        {paymentMessage}
                    </p>

                    <p className="mt-5 font-semibold">{movieName}</p>

                    <p className="text-sm text-slate-500">
                        {theatreName}
                    </p>

                    <p className="mt-4 text-2xl font-bold text-green-600">
                        {formatPrice(totalAmount)}
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 w-full rounded-xl bg-sky-500 p-3 font-bold text-white"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const activeMethod = PAYMENT_METHODS.find(
        (method) => method.value === paymentMethod
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-32 text-slate-900">
            <header className="sticky top-0 z-20 border-b bg-white">
                <div className="mx-auto flex max-w-lg items-center gap-3 p-4">
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="rounded-full bg-slate-100 px-3 py-2"
                    >
                        ←
                    </button>

                    <div>
                        <h1 className="font-bold">Complete Payment</h1>
                        <p className="text-xs text-slate-500">
                            Choose how you want to pay
                        </p>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-lg space-y-5 p-4">
                {/* Booking information */}
                <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-5 text-white">
                        <p className="text-xs text-sky-100">
                            YOUR BOOKING
                        </p>

                        <h2 className="mt-1 text-lg font-bold">
                            {movieName}
                        </h2>

                        <p className="mt-1 text-sm text-sky-100">
                            {theatreName}
                        </p>
                    </div>

                    <div className="space-y-4 p-5">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-500">Date</p>
                                <p className="mt-1 font-semibold">
                                    {formatDate(showDate)}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500">Show time</p>
                                <p className="mt-1 font-semibold">
                                    {showTime}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500">Screen</p>
                                <p className="mt-1 font-semibold">
                                    {screenNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-500">Seats</p>
                                <p className="mt-1 font-semibold">
                                    {selectedSeats.length}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-dashed pt-4">
                            <p className="mb-3 text-xs font-semibold uppercase text-slate-500">
                                Selected seats
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {selectedSeats.map((seat) => (
                                    <span
                                        key={seat.seatId}
                                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700"
                                    >
                                        {seat.seatLabel} ·{" "}
                                        {formatPrice(seat.price)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Select a payment method */}
                <section className="rounded-2xl border bg-white p-5 shadow-sm">
                    <h2 className="font-bold">
                        Select Payment Method
                    </h2>

                    <div className="mt-4 space-y-3">
                        {PAYMENT_METHODS.map((method) => (
                            <button
                                key={method.value}
                                type="button"
                                onClick={() => {
                                    setPaymentMethod(method.value);
                                    setPaymentMessage("");
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left ${paymentMethod === method.value
                                    ? "border-sky-500 bg-sky-50"
                                    : "border-slate-200 hover:border-sky-300"
                                    }`}
                            >
                                <span className="text-2xl">
                                    {method.value === "upi"
                                        ? "📱"
                                        : method.value === "card"
                                            ? "💳"
                                            : "🏦"}
                                </span>

                                <span className="flex-1">
                                    <span className="block font-semibold">
                                        {method.title}
                                    </span>

                                    <span className="mt-1 block text-xs text-slate-500">
                                        {method.description}
                                    </span>
                                </span>

                                <span
                                    className={`h-4 w-4 rounded-full border ${paymentMethod === method.value
                                        ? "border-4 border-sky-500"
                                        : "border-slate-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </section>

                {/* Method-specific information */}
                <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                    <h2 className="font-bold">
                        {activeMethod.title} Payment
                    </h2>

                    {paymentMethod === "upi" && (
                        <div className="mt-3 space-y-3">
                            <p className="text-sm text-slate-600">
                                Continue to Razorpay to choose an available
                                UPI app or a supported QR-code payment option.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Google Pay",
                                    "PhonePe",
                                    "Paytm",
                                    "Other UPI apps",
                                ].map((app) => (
                                    <span
                                        key={app}
                                        className="rounded-full border bg-slate-50 px-3 py-2 text-xs font-medium"
                                    >
                                        {app}
                                    </span>
                                ))}
                            </div>

                            <p className="text-xs text-slate-500">
                                App and QR availability depends on your
                                device and the payment options provided
                                by Razorpay.
                            </p>
                        </div>
                    )}

                    {paymentMethod === "card" && (
                        <div className="mt-3 space-y-3">
                            <p className="text-sm text-slate-600">
                                Razorpay will display the secure card
                                payment form for your debit or credit card.
                            </p>

                            <div className="rounded-xl border border-dashed bg-slate-50 p-4">
                                <p className="font-medium">
                                    Debit / Credit Card
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Card number, expiry, cardholder details
                                    and CVV are entered securely in Checkout.
                                </p>
                            </div>

                            <p className="text-xs text-slate-500">
                                CineVerse does not collect or store your
                                card number or CVV.
                            </p>
                        </div>
                    )}

                    {paymentMethod === "netbanking" && (
                        <div className="mt-3 space-y-3">
                            <p className="text-sm text-slate-600">
                                Continue to Razorpay to select your bank
                                and complete authentication through the
                                bank's payment flow.
                            </p>

                            <div className="rounded-xl border bg-slate-50 p-4">
                                <p className="font-medium">
                                    Bank selection
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Available banks will be displayed by
                                    Checkout.
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Price summary */}
                <section className="rounded-2xl border bg-white p-5 shadow-sm">
                    <h2 className="font-bold">Payment Summary</h2>

                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Tickets ({selectedSeats.length})
                            </span>

                            <span className="font-medium">
                                {formatPrice(ticketSubtotal)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Convenience fee
                            </span>

                            <span className="font-medium">
                                {formatPrice(convenienceFee)}
                            </span>
                        </div>

                        <div className="flex justify-between border-t border-dashed pt-3">
                            <span className="font-bold">
                                Total amount
                            </span>

                            <span className="text-xl font-extrabold text-sky-600">
                                {formatPrice(totalAmount)}
                            </span>
                        </div>
                    </div>
                </section>

                {paymentMessage && (
                    <p
                        role="status"
                        className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
                    >
                        {paymentMessage}
                    </p>
                )}

                <p className="text-xs leading-5 text-slate-500">
                    Your booking is confirmed only after the backend
                    verifies the payment. Closing Checkout does not
                    confirm your booking.
                </p>
            </main>

            {/* Fixed Pay Now bar */}
            <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white p-4">
                <div className="mx-auto flex max-w-lg items-center gap-4">
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">
                            Total payable
                        </p>

                        <p className="mt-1 text-xl font-extrabold">
                            {formatPrice(totalAmount)}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePayment}
                        disabled={isProcessing || paymentSuccess}
                        className="min-h-12 flex-1 rounded-xl bg-sky-500 px-5 py-3 font-bold text-white shadow-lg shadow-sky-100 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            </div>
            <div>
                {confirmedBooking ? (
                    <BookingTicket booking={confirmedBooking} />
                ) : (
                    <>
                        {/* Put your existing payment page JSX here */}
                    </>
                )}
            </div>
        </div>
    );
}

export default TicketPayementPage;
