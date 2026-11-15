import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import RegisterPage from "../pages/User/RegisterPage";
import ProfilePage from "../pages/User/ProfilePage";
import BookingPage from "../pages/User/BookingPage";
import ForgetPassword from "../pages/User/ForgetPassword";
import ResetPassword from "../pages/User/ResetPassword";
import UserProvider from "../context/User/ProviderContext/UserProvider";
import MovieCompleteDetailsPage from "../pages/User/MovieCompleteDetailsPage";
import BookTicketPage from "../pages/User/BookTicketPage";
import SelectSeats from "../pages/User/SelectSeats";
import TicketBookingSummaryPage from "../pages/TIcketBooking/TicketBookingSummaryPage";
import TicketPayementPage from "../pages/TIcketBooking/TicketPayementPage";
const userRoutes = [
    {
        path: "/",
        element: <UserProvider />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "booking",
                element: <BookingPage />
            },
            {
                path: "forget-password",
                element: <ForgetPassword />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "movie/:movieId",
                element: <MovieCompleteDetailsPage />
            },
            {
                path: "movie/:movieId/book-ticket",
                element: <BookTicketPage />
            },
            {
                path: "movie/:movieId/:theatreId/select-seats",
                element: <SelectSeats />
            },
            {
                path: "/movie/:movieId/:theatreId/booking-summary",
                element: <TicketBookingSummaryPage />
            },
            {
                path: "/movie/:movieId/:theatreId/payment",
                element: <TicketPayementPage />
            }
        ]
    }
];

export default userRoutes;