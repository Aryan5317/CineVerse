import RegisterPage from "../pages/RegisterPage"
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import ForgetPasswordPage from "../pages/ForgetPasswordPage"
import HomePage from "../pages/HomePage"
import ScreensPage from "../pages/ScreensPage"
import ShowsPage from "../pages/ShowsPage"
import AddNewScreen from "../pages/AddNewScreen"
import TheatreScreenCompleteDetails from "../components/dashboard/TheatreScreenCompleteDetails"
import TheatreProvider from "../context/TheatreContextProvider/TheatreProvider"
import AddNewShows from "../pages/AddNewShows"

const theatreRoutes = [
    {
        path: "/theatre",
        element: <TheatreProvider />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "forget-password",
                element: <ForgetPasswordPage />
            },
            {
                path: "home",
                element: <HomePage />
            },
            {
                path: "screen",
                element: <ScreensPage />
            },
            {
                path: "shows",
                element: <ShowsPage />
            },
            {
                path: ":theatreId/screens/add-new-screen",
                element: <AddNewScreen />
            },
            {
                path: "screen/:screenId",
                element: <TheatreScreenCompleteDetails />
            },
            {
                path: ":theatreId/shows/add-new-show",
                element: <AddNewShows />
            }
        ]
    }
]

export default theatreRoutes