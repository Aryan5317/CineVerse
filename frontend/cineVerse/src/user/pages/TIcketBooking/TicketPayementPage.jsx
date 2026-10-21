import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function TicketPayementPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { movieId, theatreId } = useParams();

    const {
        selectedTheatre,
        selectedDate,
        selectedTime,
        selectedSeats = [],
        totalAmount = 0,
        screenFormat,
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [isProcessing, setIsProcessing] = useState(false);

    const formatDate = (date) => {
        if (!date) return "Not selected";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return date;

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatPrice = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    const handlePayment = () => {
        // setIsProcessing(true);

        console.log("Payment button is clicked")
        navigate(`/movie/${movieId}/${theatreId}/payment`, {
            state: {
                selectedTheatre,
                selectedDate,
                selectedTime,
                selectedSeats,
                totalAmount,
                screenFormat,
                paymentMethod,
            },
        });
    };

    if (!location.state || selectedSeats.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 px-5 flex items-center justify-center">
                <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 4h.01M10.3 3.9 1.8 18.5A1.7 1.7 0 0 0 3.3 21h17.4a1.7 1.7 0 0 0 1.5-2.5L13.7 3.9a2 2 0 0 0-3.4 0Z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-xl font-bold text-slate-900">
                        Booking details unavailable
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Please select your seats and review your booking
                        before proceeding to payment.
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 w-full rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition active:scale-[0.98]"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-36 text-slate-900">
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-lg items-center gap-4 px-4 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition active:scale-95"
                        aria-label="Go back"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m15 18-6-6 6-6"
                            />
                        </svg>
                    </button>

                    <div>
                        <h1 className="text-lg font-bold">
                            Complete Payment
                        </h1>
                        <p className="text-xs text-slate-500">
                            Secure your movie tickets
                        </p>
                    </div>

                    <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <rect
                                width="18"
                                height="14"
                                x="3"
                                y="5"
                                rx="2"
                            />
                            <path d="M3 10h18" />
                        </svg>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-lg space-y-5 px-4 py-5">
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-4 text-white">
                        <p className="text-xs font-medium text-sky-100">
                            YOUR BOOKING
                        </p>
                        <h2 className="mt-1 text-lg font-bold">
                            {selectedTheatre?.theatreName ||
                                selectedTheatre?.name ||
                                "Selected Theatre"}
                        </h2>
                        <p className="mt-1 text-sm text-sky-100">
                            {selectedTheatre?.location ||
                                selectedTheatre?.address ||
                                "Theatre details"}
                        </p>
                    </div>

                    <div className="space-y-4 p-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500">
                                    Date
                                </p>
                                <p className="mt-1 font-semibold">
                                    {formatDate(selectedDate)}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Show Time
                                </p>
                                <p className="mt-1 font-semibold">
                                    {selectedTime || "Not selected"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Screen Format
                                </p>
                                <p className="mt-1 font-semibold">
                                    {screenFormat || "Standard"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Total Seats
                                </p>
                                <p className="mt-1 font-semibold">
                                    {selectedSeats.length}{" "}
                                    {selectedSeats.length === 1
                                        ? "Seat"
                                        : "Seats"}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-slate-200 pt-4">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Selected Seats
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {selectedSeats.map((seat, index) => (
                                    <span
                                        key={seat.id || seat._id || index}
                                        className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700"
                                    >
                                        {seat.id ||
                                            seat.seatNumber ||
                                            seat.label ||
                                            `Seat ${index + 1}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-bold">
                        Select Payment Method
                    </h2>

                    <div className="mt-4 space-y-3">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("upi")}
                            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                                paymentMethod === "upi"
                                    ? "border-sky-500 bg-sky-50"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 2 4 14h7l-1 8 10-12h-7l1-8Z"
                                    />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold">UPI</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Pay using a UPI app
                                </p>
                            </div>

                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                    paymentMethod === "upi"
                                        ? "border-sky-500"
                                        : "border-slate-300"
                                }`}
                            >
                                {paymentMethod === "upi" && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                                )}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                                paymentMethod === "card"
                                    ? "border-sky-500 bg-sky-50"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <rect
                                        width="20"
                                        height="15"
                                        x="2"
                                        y="4.5"
                                        rx="2"
                                    />
                                    <path d="M2 9.5h20" />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold">
                                    Credit / Debit Card
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Pay using your bank card
                                </p>
                            </div>

                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                    paymentMethod === "card"
                                        ? "border-sky-500"
                                        : "border-slate-300"
                                }`}
                            >
                                {paymentMethod === "card" && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                                )}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("netbanking")}
                            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                                paymentMethod === "netbanking"
                                    ? "border-sky-500 bg-sky-50"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M2 21h20M12 3 2 8h20L12 3Z"
                                    />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold">Net Banking</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Pay through your bank
                                </p>
                            </div>

                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                    paymentMethod === "netbanking"
                                        ? "border-sky-500"
                                        : "border-slate-300"
                                }`}
                            >
                                {paymentMethod === "netbanking" && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                                )}
                            </span>
                        </button>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-bold">
                        Payment Summary
                    </h2>

                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between gap-3 text-slate-600">
                            <span>Tickets ({selectedSeats.length})</span>
                            <span className="font-medium text-slate-900">
                                {formatPrice(totalAmount)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-3 text-slate-600">
                            <span>Convenience fee</span>
                            <span className="font-medium text-slate-900">
                                Included
                            </span>
                        </div>

                        <div className="border-t border-dashed border-slate-200 pt-3">
                            <div className="flex items-center justify-between gap-3">
                                <span className="font-bold">
                                    Total Amount
                                </span>
                                <span className="text-xl font-extrabold text-sky-600">
                                    {formatPrice(totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex items-start gap-3 rounded-xl bg-slate-100 p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-0.5 h-5 w-5 shrink-0 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <rect
                            width="16"
                            height="11"
                            x="4"
                            y="10"
                            rx="2"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"
                        />
                    </svg>

                    <p className="text-xs leading-5 text-slate-600">
                        Your payment will be processed securely once the
                        payment gateway is integrated. Tickets are not
                        confirmed until the server verifies the payment
                        and completes the booking.
                    </p>
                </div>
            </main>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
                <div className="mx-auto flex max-w-lg items-center gap-4">
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">
                            Total payable
                        </p>
                        <p className="mt-1 text-xl font-extrabold text-slate-900">
                            {formatPrice(totalAmount)}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-bold text-white shadow-lg shadow-sky-100 transition hover:bg-sky-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isProcessing
                            ? "Please wait..."
                            : "Pay Now"}
                        {!isProcessing && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12h14m-7-7 7 7-7 7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TicketPayementPage;