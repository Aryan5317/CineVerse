import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";

function BookingTicket({ booking, onBack }) {

    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    const handleHome = () => {
        navigate("/");
    };

    if (!booking) return null;

    const movie = booking.movieId;
    const theatre = booking.theatreId;
    const show = booking.showId;

    const seats = booking.selectedSeats || [];

    const theatreAddress = theatre?.theatreAddress;

    const location = [
        theatreAddress?.theatreCity,
        theatreAddress?.theatreDistrict,
        theatreAddress?.theatreState,
        theatreAddress?.theatrePinCode,
    ]
        .filter(Boolean)
        .join(", ");

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatAmount = (amount) =>
        Number(amount || 0).toLocaleString("en-IN");

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-8">
            <div className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg">

                {/* Movie Information */}
                <div className="flex gap-3 border-b border-dashed border-slate-300 p-4">

                    <img
                        src={movie?.moviePosterUrl}
                        alt={movie?.title || "Movie poster"}
                        className="h-28 w-20 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                        <h2 className="text-base font-bold text-slate-900">
                            {movie?.title || "Movie"}
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            {movie?.language?.join(", ")}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-800">
                            {theatre?.theatreName}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            {location}
                        </p>
                    </div>
                </div>

                {/* Show Details */}
                <div className="grid grid-cols-2 gap-4 border-b border-dashed border-slate-300 p-4">

                    <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-400">
                            Date
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-800">
                            {formatDate(show?.showsDate)}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-400">
                            Show Time
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-800">
                            {show?.showsStartTime}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-400">
                            Screen
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-800">
                            {show?.screenNumber}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-400">
                            Total Seats
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-800">
                            {seats.length}
                        </p>
                    </div>
                </div>

                {/* QR Code and Seat Details */}
                <div className="p-5 text-center">

                    <div className="inline-block rounded-xl border border-slate-200 p-3">
                        <QRCodeSVG
                            value={`CineVerse:BOOKING:${booking._id}`}
                            size={160}
                            level="H"
                            includeMargin
                        />
                    </div>

                    <p className="mt-3 text-xs font-medium text-slate-500">
                        Scan your ticket at the theatre
                    </p>

                    <p className="mt-4 text-[10px] font-semibold uppercase text-slate-400">
                        Booking ID
                    </p>

                    <p className="mt-1 break-all text-xs font-bold text-slate-800">
                        {booking._id}
                    </p>

                    <div className="mt-5 rounded-xl bg-slate-50 p-4">
                        <p className="text-[10px] font-semibold uppercase text-slate-400">
                            Selected Seats
                        </p>

                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                            {seats.map((seat, index) => (
                                <span
                                    key={seat.seatId || index}
                                    className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-bold text-blue-800"
                                >
                                    {seat.seatLabel}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="border-t border-dashed border-slate-300 p-4">

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-500">
                            Payment Status
                        </span>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                            {booking.paymentStatus}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">
                            Total Amount
                        </span>

                        <span className="text-xl font-bold text-green-600">
                            ₹{formatAmount(booking.totalAmount)}
                        </span>
                    </div>

                    <p className="mt-4 text-center text-[10px] text-slate-400">
                        Thank you for booking with CineVerse!
                    </p>
                </div>

            </div>
            <div className="mt-6 flex items-center gap-3 px-4 pb-5">

                <button
                    type="button"
                    onClick={handleBack}
                    className="flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
                >
                    ← Back
                </button>

                <button
                    type="button"
                    onClick={handleHome}
                    className="flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-xl bg-sky-500 px-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-600 active:scale-95"
                >
                    Go to Home
                </button>

            </div>
        </div>
    );
}

export default BookingTicket;
