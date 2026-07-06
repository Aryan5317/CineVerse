import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import RegisterPage from "../pages/User/RegisterPage";
import ProfilePage from "../pages/User/ProfilePage";
import ForgetPassword from "../pages/User/ForgetPassword";
import ResetPassword from "../pages/User/ResetPassword";
import UserProvider from "../context/User/ProviderContext/UserProvider";

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
                path: "forget-password",
                element: <ForgetPassword />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            }
        ]
    }
];

export default userRoutes;