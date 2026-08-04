import RegisterPage from "../pages/RegisterPage"
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import ForgetPasswordPage from "../pages/ForgetPasswordPage"

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
            }
        ]
    }
]

export default theatreRoutes