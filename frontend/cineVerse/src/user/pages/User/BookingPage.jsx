import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import UserSectionButton from "../../components/Users/UserSectionButton";
import BookingTicket from "../../components/Booking/BookingTicket";
import BookingHistoryCard from "../../components/Booking/BookingHistoryCard";
import getMyBookings from "../../services/MovieTicket/getMyBookings ";

function BookingPage() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Input filter states
    const [selectedDate, setSelectedDate] = useState("");
    const [movieName, setMovieName] = useState("");
    const [theatreName, setTheatreName] = useState("");

    // Applied filter states
    const [appliedFilters, setAppliedFilters] = useState({
        date: "",
        movie: "",
        theatre: "",
    });

    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const [showAll, setShowAll] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Fetch bookings
    useEffect(() => {
        let isMounted = true;

        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getMyBookings();

                const result =
                    response?.data?.bookings ??
                    response?.data?.data?.bookings ??
                    response?.bookings ??
                    [];

                if (!Array.isArray(result)) {
                    throw new Error("Invalid booking data received.");
                }

                if (isMounted) {
                    setBookings(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err?.response?.data?.message ||
                        err.message ||
                        "Unable to load your bookings."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchBookings();

        return () => {
            isMounted = false;
        };
    }, []);

    // Convert date into local YYYY-MM-DD format
    const getLocalDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "";
        }

        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // Apply filters only when Search is clicked
    const handleSearch = () => {
        setAppliedFilters({
            date: selectedDate,
            movie: movieName.trim().toLowerCase(),
            theatre: theatreName.trim().toLowerCase(),
        });

        setIsFilterApplied(true);
        setShowAll(false);
    };

    // Filter bookings using applied filters
    const filteredBookings = useMemo(() => {
        if (!isFilterApplied) {
            return bookings;
        }

        return bookings.filter((booking) => {
            const currentMovie =
                booking.movieId?.title?.toLowerCase() || "";

            const currentTheatre =
                booking.theatreId?.theatreName?.toLowerCase() || "";

            const currentDate = getLocalDate(
                booking.showId?.showsDate
            );

            const matchesDate =
                !appliedFilters.date ||
                currentDate === appliedFilters.date;

            const matchesMovie =
                !appliedFilters.movie ||
                currentMovie.includes(appliedFilters.movie);

            const matchesTheatre =
                !appliedFilters.theatre ||
                currentTheatre.includes(appliedFilters.theatre);

            return (
                matchesDate &&
                matchesMovie &&
                matchesTheatre
            );
        });
    }, [bookings, appliedFilters, isFilterApplied]);

    // Show first five tickets or all tickets
    const displayedBookings = showAll
        ? filteredBookings
        : filteredBookings.slice(0, 5);

    // Clear all filters
    const clearFilters = () => {
        setSelectedDate("");
        setMovieName("");
        setTheatreName("");

        setAppliedFilters({
            date: "",
            movie: "",
            theatre: "",
        });

        setIsFilterApplied(false);
        setShowAll(false);
    };

    // Open ticket details
    const openTicket = (booking) => {
        setSelectedBooking(booking);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Ticket detail view
    if (selectedBooking) {
        return (
            <BookingTicket
                booking={selectedBooking}
                onBack={() => setSelectedBooking(null)}
            />
        );
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 pb-28">

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="mx-auto flex max-w-2xl items-center gap-3">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-700"
                    >
                        ←
                    </button>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            My Bookings
                        </h1>

                        <p className="text-xs text-slate-500">
                            Your movie tickets in one place
                        </p>
                    </div>

                </div>
            </header>

            <main className="mx-auto max-w-2xl space-y-5 px-4 py-5">

                {/* Booking count */}
                <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-5 text-white shadow-md">

                    <p className="text-sm font-medium text-blue-50">
                        Your CineVerse Tickets
                    </p>

                    <div className="mt-2 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {bookings.length}
                            </h2>

                            <p className="mt-1 text-xs text-blue-50">
                                Confirmed bookings
                            </p>
                        </div>

                        <span className="text-4xl">🎟️</span>
                    </div>

                </section>

                {/* Filters */}
                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Find Your Tickets
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Select any filter or combine multiple filters
                            </p>
                        </div>

                        <span className="text-xl">🔍</span>
                    </div>

                    <div className="space-y-4">

                        {/* Date filter */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Booking Date
                            </label>

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                        {/* Movie filter */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Movie Name
                            </label>

                            <input
                                type="text"
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                                placeholder="Enter movie name..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                        {/* Theatre filter */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Theatre Name
                            </label>

                            <input
                                type="text"
                                value={theatreName}
                                onChange={(e) => setTheatreName(e.target.value)}
                                placeholder="Enter theatre name..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                        {/* Search and Clear buttons */}
                        <div className="flex gap-3 pt-1">

                            <button
                                type="button"
                                onClick={handleSearch}
                                disabled={loading}
                                className="flex-1 rounded-xl bg-sky-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Search Tickets
                            </button>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Clear
                            </button>

                        </div>

                    </div>
                </section>

                {/* Ticket list */}
                <section>

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Your Tickets
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                {filteredBookings.length} ticket(s) found
                            </p>
                        </div>

                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            Latest First
                        </span>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center py-16">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                            <p className="mt-4 text-sm text-slate-500">
                                Loading your tickets...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-2 block font-semibold underline"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* No bookings */}
                    {!loading && !error && bookings.length === 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">

                            <div className="text-5xl">🎬</div>

                            <h3 className="mt-4 font-bold text-slate-900">
                                No Bookings Yet
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Your confirmed movie tickets will appear here.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="mt-5 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white"
                            >
                                Explore Movies
                            </button>

                        </div>
                    )}

                    {/* No filter matches */}
                    {!loading &&
                        !error &&
                        bookings.length > 0 &&
                        filteredBookings.length === 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">

                                <div className="text-4xl">🔍</div>

                                <h3 className="mt-3 font-bold text-slate-900">
                                    No Tickets Found
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    No booking matches your selected filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-4 font-semibold text-sky-600"
                                >
                                    Clear Filters
                                </button>

                            </div>
                        )}

                    {/* Booking cards */}
                    {!loading &&
                        !error &&
                        displayedBookings.length > 0 && (
                            <div className="space-y-4">

                                {displayedBookings.map((booking) => (
                                    <BookingHistoryCard
                                        key={booking._id}
                                        booking={booking}
                                        onClick={() => openTicket(booking)}
                                    />
                                ))}

                            </div>
                        )}

                    {/* Show more / less */}
                    {!loading &&
                        !error &&
                        filteredBookings.length > 5 && (
                            <button
                                type="button"
                                onClick={() => setShowAll((previous) => !previous)}
                                className="mt-5 w-full rounded-xl border border-sky-200 bg-white py-3 text-sm font-bold text-sky-600 shadow-sm transition hover:bg-sky-50"
                            >
                                {showAll
                                    ? "Show Less ↑"
                                    : `Show More (${filteredBookings.length - 5} more) ↓`}
                            </button>
                        )}

                </section>

            </main>

            {/* Bottom navigation */}
            <footer className="fixed bottom-0 left-0 z-50 h-20 w-full border-t border-gray-200 bg-white shadow-lg">
                <UserSectionButton />
            </footer>

        </div>
    );
}

export default BookingPage;
