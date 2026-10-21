
import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import screenSeatData from "../../services/MovieTicket/screenSeatData";

const formatTime = (time) => {
    if (!time) return "Time not selected";

    if (typeof time === "string" || typeof time === "number") {
        return String(time);
    }

    return time.startTime || time.showTime || time.time || "Time selected";
};

function SelectSeats() {
    const location = useLocation();
    const navigate = useNavigate();
    const { movieId, theatreId } = useParams();

    const {
        selectedTheatre,
        selectedDate,
        selectedTime,
    } = location.state || {};

    const [seatData, setSeatData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const getScreenData = async () => {
            setLoading(true);
            setError("");
            setSeatData(null);
            setSelectedSeats([]);

            try {
                const response = await screenSeatData(movieId, theatreId);

                const result =
                    response?.data?.seatData ??
                    response?.data?.data?.seatData ??
                    response?.seatData ??
                    response?.data?.data ??
                    null;

                if (!result || !Array.isArray(result.seats)) {
                    throw new Error("Invalid seat layout received from server.");
                }

                if (isMounted) {
                    setSeatData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Unable to load the seat layout."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (!movieId || !theatreId) {
            setError("Movie or theatre information is missing.");
            setLoading(false);
        } else {
            getScreenData();
        }

        return () => {
            isMounted = false;
        };
    }, [movieId, theatreId]);

    const createSeatId = (categoryId, row, column) =>
        `${categoryId}-${row}-${column}`;

    const toggleSeat = (seat, category) => {
        const price = seatPrices[category.seatType];
        setSelectedSeats((previous) => {
            const exists = previous.some(
                (item) => item.id === seat.id
            );

            if (exists) {
                return previous.filter(
                    (item) => item.id !== seat.id
                );
            }
            if (!Number.isFinite(price) || price < 0) {
                setError(
                    `Price is not configured for ${category.seatType} seats.`
                );
                return previous;
            }
            setError("");

            return [
                ...previous,
                {
                    ...seat,
                    seatType: category.seatType,
                    price: price,
                },
            ];
        });
    };

    const totalAmount = useMemo(
        () =>
            selectedSeats.reduce(
                (total, seat) => total + seat.price,
                0
            ),
        [selectedSeats]
    );

    const getCategoryCount = (seatType) =>
        selectedSeats.filter(
            (seat) => seat.seatType === seatType
        ).length;

    const handleBack = () => {
        navigate(-1);
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            setError("Please select at least one seat to continue.");
            return;
        }

        setError("");
        navigate(
            `/movie/${movieId}/${theatreId}/booking-summary`,
            {
                state: {
                    selectedTheatre,
                    selectedDate,
                    selectedTime,
                    selectedSeats,
                    totalAmount,
                    screenFormat: seatData?.screenFormat,
                },
            }
        );
    };

    const categories = seatData?.seats ?? [];
    const seatPrices = useMemo(() => {
        return Object.fromEntries(
            (seatData?.seatPrice ?? []).map((item) => [
                item.seatType,
                Number(item.price),
            ])
        );
    }, [seatData]);

    return (
        <div className="min-h-screen w-full bg-slate-50 text-slate-900">
            <div className="mx-auto min-h-screen w-full max-w-md bg-slate-50 pb-36">

                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            aria-label="Go back"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl transition active:scale-95"
                        >
                            ←
                        </button>

                        <div className="min-w-0 flex-1">
                            <h1 className="text-base font-bold">
                                Select Seats
                            </h1>
                            <p className="mt-0.5 text-xs text-slate-500">
                                Choose your favourite seats
                            </p>
                        </div>

                        <div className="rounded-xl bg-blue-50 px-3 py-2 text-center">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-blue-600">
                                Selected
                            </p>
                            <p className="text-sm font-bold text-blue-700">
                                {selectedSeats.length}
                            </p>
                        </div>
                    </div>
                </header>
                <section className="px-4 pt-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                                🎬
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="truncate text-base font-bold">
                                    {selectedTheatre?.theatreName ||
                                        selectedTheatre?.name ||
                                        "Selected Theatre"}
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {selectedTheatre?.address ||
                                        selectedTheatre?.location ||
                                        "Theatre location"}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                                        📅 {selectedDate || "Date not selected"}
                                    </span>

                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                                        🕒 {formatTime(selectedTime)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {error && (
                    <div
                        role="alert"
                        className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <p>{error}</p>
                            <button
                                type="button"
                                onClick={() => setError("")}
                                className="shrink-0 font-bold"
                                aria-label="Dismiss error"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center px-6 py-24">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                        <p className="mt-4 text-sm font-semibold text-slate-700">
                            Loading seat layout...
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Please wait a moment
                        </p>
                    </div>
                )}

                {!loading && !error && categories.length === 0 && (
                    <div className="mx-4 mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
                        <div className="text-4xl">🪑</div>
                        <h2 className="mt-3 font-bold">
                            No seat layout found
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            The selected screen has no configured seats.
                        </p>
                    </div>
                )}
                {!loading && seatData && categories.length > 0 && (
                    <>
                        <section className="px-4 pt-8">
                            <div className="mb-7">
                                <div className="mx-auto h-2 w-[85%] rounded-[50%] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_7px_16px_rgba(59,130,246,0.25)]" />

                                <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                                    SCREEN THIS WAY
                                </p>
                            </div>

                            <div className="space-y-8">
                                {categories.map((category, categoryIndex) => {
                                    const categoryId =
                                        category._id || `category-${categoryIndex}`;

                                    const rows = Math.max(
                                        0,
                                        Math.min(
                                            Number(category.rows) || 0,
                                            26
                                        )
                                    );

                                    const columns = Math.max(
                                        0,
                                        Math.min(
                                            Number(category.columns) || 0,
                                            20
                                        )
                                    );
                                    const price = seatPrices[category.seatType];

                                    return (
                                        <section
                                            key={categoryId}
                                            className="rounded-2xl border border-slate-200 bg-white px-3 py-4 shadow-sm"
                                        >
                                            <div className="mb-4 flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="text-sm font-bold">
                                                        {category.seatType}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {rows} rows · {columns} seats per row
                                                    </p>
                                                </div>

                                                <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                                                    ₹{price}
                                                </span>
                                            </div>

                                            {rows > 0 && columns > 0 ? (
                                                <div className="w-full overflow-x-auto pb-2">
                                                    <div className="mx-auto w-max">
                                                        <div
                                                            className="grid items-center gap-x-1.5 gap-y-2"
                                                            style={{
                                                                gridTemplateColumns:
                                                                    `18px repeat(${columns}, minmax(0, 1fr))`,
                                                            }}
                                                        >
                                                            {Array.from(
                                                                { length: rows },
                                                                (_, rowIndex) => {
                                                                    const rowLabel =
                                                                        String.fromCharCode(
                                                                            65 + rowIndex
                                                                        );

                                                                    return (
                                                                        <div
                                                                            key={`${categoryId}-row-${rowLabel}`}
                                                                            className="contents"
                                                                        >
                                                                            <span className="flex h-6 w-[18px] items-center justify-center text-[10px] font-semibold text-slate-400">
                                                                                {rowLabel}
                                                                            </span>

                                                                            {Array.from(
                                                                                { length: columns },
                                                                                (_, columnIndex) => {
                                                                                    const seatNumber =
                                                                                        columnIndex + 1;

                                                                                    const seatId =
                                                                                        createSeatId(
                                                                                            categoryId,
                                                                                            rowLabel,
                                                                                            seatNumber
                                                                                        );

                                                                                    const isSelected =
                                                                                        selectedSeats.some(
                                                                                            (seat) =>
                                                                                                seat.id === seatId
                                                                                        );

                                                                                    return (
                                                                                        <button
                                                                                            key={seatId}
                                                                                            type="button"
                                                                                            aria-label={`Row ${rowLabel}, seat ${seatNumber}, ${category.seatType}`}
                                                                                            aria-pressed={isSelected}
                                                                                            onClick={() => {
                                                                                                setError("");

                                                                                                toggleSeat(
                                                                                                    {
                                                                                                        id: seatId,
                                                                                                        row: rowLabel,
                                                                                                        number: seatNumber,
                                                                                                        label: `${rowLabel}${seatNumber}`,
                                                                                                    },
                                                                                                    category
                                                                                                );
                                                                                            }}
                                                                                            className={`flex h-6 w-[18px] items-center justify-center rounded-t-md rounded-b-[3px] border text-[8px] font-semibold transition active:scale-90 ${isSelected
                                                                                                ? "border-blue-700 bg-blue-600 text-white shadow-sm"
                                                                                                : "border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50"
                                                                                                }`}
                                                                                        >
                                                                                            {seatNumber}
                                                                                        </button>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-500">
                                                    Invalid seat dimensions.
                                                </p>
                                            )}
                                        </section>
                                    );
                                })}
                            </div>
                        </section>
                        <section className="mx-4 mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                Seat legend
                            </h3>

                            <div className="mt-3 grid grid-cols-3 gap-2">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="h-6 w-6 rounded-t-md rounded-b-sm border border-emerald-600 bg-white" />
                                    <span className="text-[11px] text-slate-600">
                                        Selectable
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <span className="h-6 w-6 rounded-t-md rounded-b-sm border border-blue-700 bg-blue-600" />
                                    <span className="text-[11px] text-slate-600">
                                        Selected
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <span className="h-6 w-6 rounded-t-md rounded-b-sm border border-slate-300 bg-slate-200" />
                                    <span className="text-[11px] text-slate-600">
                                        Unavailable
                                    </span>
                                </div>
                            </div>

                            <p className="mt-3 text-[11px] leading-4 text-amber-700">
                                Seat availability has not been fetched from the
                                backend. Green seats are selectable in this
                                interface, not confirmed available for booking.
                            </p>
                        </section>
                        <section className="mx-4 mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold">
                                    Booking summary
                                </h3>

                                <span className="text-xs text-slate-500">
                                    {selectedSeats.length} seat(s)
                                </span>
                            </div>

                            {selectedSeats.length === 0 ? (
                                <p className="mt-3 text-sm text-slate-500">
                                    Select seats to see your total.
                                </p>
                            ) : (
                                <>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {selectedSeats.map((seat) => (
                                            <span
                                                key={seat.id}
                                                className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700"
                                            >
                                                {seat.label} · {seat.seatType}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                                        {Object.keys(
                                            selectedSeats.reduce((types, seat) => {
                                                types[seat.seatType] = true;
                                                return types;
                                            }, {})
                                        ).map((seatType) => {
                                            const count = getCategoryCount(seatType);
                                            const price = seatPrices[seatType];

                                            return (
                                                <div
                                                    key={seatType}
                                                    className="flex justify-between text-sm text-slate-600"
                                                >
                                                    <span>
                                                        {seatType} × {count}
                                                    </span>
                                                    <span>
                                                        ₹{count * price}
                                                    </span>
                                                </div>
                                            );
                                        })}

                                        <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-bold">
                                            <span>Subtotal</span>
                                            <span>₹{totalAmount}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </section>
                    </>
                )}
            </div>

            <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_18px_rgba(15,23,42,0.06)]">
                <div className="mx-auto flex w-full max-w-md items-center gap-3">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="h-12 w-[34%] rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition active:scale-[0.98]"
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={
                            loading ||
                            !seatData ||
                            selectedSeats.length === 0
                        }
                        className="flex h-12 flex-1 items-center justify-between rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                    >
                        <span>Continue</span>
                        <span>₹{totalAmount} →</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default SelectSeats;
