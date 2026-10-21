
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { uesEffect } from "react"

const formatDate = (date) => {
    if (!date) return "Not selected";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

function TicketBookingSummaryPage() {
    const { movieId, theatreId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const {
        selectedTheatre,
        selectedDate,
        selectedTime,
        selectedSeats = [],
        totalAmount = 0,
        screenFormat,
    } = state || {};

    if (!state || selectedSeats.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <div className="text-4xl">🎟️</div>
                    <h1 className="mt-4 text-lg font-bold text-slate-900">
                        No Booking Details Found
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Please select your seats before continuing.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const groupedSeats = selectedSeats.reduce((groups, seat) => {
        if (!groups[seat.seatType]) {
            groups[seat.seatType] = [];
        }

        groups[seat.seatType].push(seat);
        return groups;
    }, {});

    const ProceedPaymentButtonWork = () => {
        console.log("Proceed payment button is clicked")
        navigate(
            `/movie/${movieId}/${theatreId}/payment`,
            {
                state: {
                    selectedTheatre,
                    selectedDate,
                    selectedTime,
                    selectedSeats,
                    totalAmount,
                    screenFormat,
                },
            }
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto min-h-screen w-full max-w-md pb-28">
                <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-xl"
                    >
                        ←
                    </button>
                    <div>
                        <h1 className="text-base font-bold">
                            Booking Summary
                        </h1>
                        <p className="text-xs text-slate-500">
                            Review your ticket details
                        </p>
                    </div>
                </header>

                <main className="space-y-4 px-4 pt-5">
                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                                🎬
                            </div>
                            <div className="min-w-0 flex-1">
                                <h2 className="text-base font-bold">
                                    {selectedTheatre?.theatreName ||
                                        selectedTheatre?.name ||
                                        "Selected Theatre"}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    {selectedTheatre?.address ||
                                        selectedTheatre?.location ||
                                        "Theatre location"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                            <div>
                                <p className="text-xs text-slate-500">Date</p>
                                <p className="mt-1 text-sm font-semibold">
                                    {formatDate(selectedDate)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Showtime</p>
                                <p className="mt-1 text-sm font-semibold">
                                    {typeof selectedTime === "object"
                                        ? selectedTime?.startTime ||
                                        selectedTime?.showTime ||
                                        selectedTime?.time ||
                                        "Selected show"
                                        : selectedTime || "Not selected"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Screen Format</p>
                                <p className="mt-1 text-sm font-semibold">
                                    {screenFormat || "Standard"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total Seats</p>
                                <p className="mt-1 text-sm font-semibold">
                                    {selectedSeats.length}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold">
                                Selected Seats
                            </h2>
                            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                {selectedSeats.length} seats
                            </span>
                        </div>

                        <div className="mt-4 space-y-4">
                            {Object.entries(groupedSeats).map(
                                ([seatType, seats]) => {
                                    const categoryTotal = seats.reduce(
                                        (sum, seat) =>
                                            sum + Number(seat.price || 0),
                                        0
                                    );

                                    return (
                                        <div key={seatType}>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold">
                                                    {seatType}
                                                </p>
                                                <p className="text-sm font-semibold">
                                                    ₹{categoryTotal.toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {seats.map((seat) => (
                                                    <span
                                                        key={seat.id}
                                                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                                                    >
                                                        {seat.label}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="mt-2 text-xs text-slate-500">
                                                {seats.length} × ₹
                                                {Number(seats[0]?.price || 0).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-bold">
                            Price Details
                        </h2>

                        <div className="mt-4 space-y-3">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Tickets ({selectedSeats.length})</span>
                                <span>
                                    ₹{selectedSeats
                                        .reduce(
                                            (sum, seat) =>
                                                sum + Number(seat.price || 0),
                                            0
                                        )
                                        .toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Convenience fee</span>
                                <span>Calculated at checkout</span>
                            </div>

                            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold">
                                <span>Ticket Subtotal</span>
                                <span>
                                    ₹{Number(totalAmount).toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_18px_rgba(15,23,42,0.06)]">
                <div className="mx-auto flex w-full max-w-md items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="h-12 w-[34%] rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => ProceedPaymentButtonWork()}
                        className="flex h-12 flex-1 items-center justify-between rounded-xl bg-blue-600 px-4 text-sm font-bold text-white"
                    >
                        <span>Proceed to Payment</span>
                        <span>→</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default TicketBookingSummaryPage;
