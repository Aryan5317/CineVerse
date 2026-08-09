import RegisterPage from "../pages/RegisterPage"
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import ForgetPasswordPage from "../pages/ForgetPasswordPage"
import HomePage from "../pages/HomePage"
import ScreensPage from "../pages/ScreensPage"
import ShowsPage from "../pages/ShowsPage"

const theatreRoutes = [
    {
        path: "/theatre",
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
            }
        ]
    }
]

export default theatreRoutes