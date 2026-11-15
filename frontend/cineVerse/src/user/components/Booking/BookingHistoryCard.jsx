function BookingHistoryCard({ booking, onClick }) {
    const movie = booking.movieId;
    const theatre = booking.theatreId;
    const show = booking.showId;

    const showDate = show?.showsDate
        ? new Date(show.showsDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "Date unavailable";

    const seatLabels = booking.selectedSeats
        ?.map((seat) => seat.seatLabel)
        .join(", ");

    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
        >
            <div className="flex gap-3 p-3">
                <img
                    src={movie?.moviePosterUrl}
                    alt={movie?.title || "Movie poster"}
                    className="h-28 w-20 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                            {movie?.title || "Movie"}
                        </h3>

                        <span className="shrink-0 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700">
                            Paid
                        </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-600">
                        {theatre?.theatreName || "Theatre unavailable"}
                    </p>

                    <div className="mt-3 space-y-1">
                        <p className="text-xs text-slate-500">
                            📅 {showDate}
                        </p>

                        <p className="text-xs text-slate-500">
                            🕒 {show?.showsStartTime || "Time unavailable"}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                            Seats: {seatLabels || "Unavailable"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-slate-200 px-3 py-3">
                <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Booking ID
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-700">
                        {String(booking._id).slice(-12).toUpperCase()}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Total Amount
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-green-600">
                        ₹{booking.totalAmount}
                    </p>
                </div>

                <span className="text-lg text-sky-600">→</span>
            </div>
        </button>
    );
}

export default BookingHistoryCard;