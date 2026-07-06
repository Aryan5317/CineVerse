import AdminLoginPage from "../pages/SuperAdmin/AdminLoginPage";
import AdminForgetPassword from "../pages/SuperAdmin/AdminForgetPassword";
import AdminHomePage from "../pages/SuperAdmin/AdminHomePage";
import AdminAdministrationPage from "../pages/SuperAdmin/AdminAdministrationPage";
import SuperAdminContextProvider from "../context/SuperAdminProviderContext/SuperAdminContextProvider";

const adminRoutes = [
    {
        path: "/admin/forget-password",
        element: <AdminForgetPassword />
    },
    {
        path: "/admin",
        element: <SuperAdminContextProvider />,
        children: [
            {
                index: true,
                element: <AdminLoginPage />
            },
            {
                path: "login",
                element: <AdminLoginPage />
            },
            {
                path: "dashboard",
                element: <AdminHomePage />
            },
            {
                path: "administration",
                element: <AdminAdministrationPage />
            },
        ]
    }
];

export default adminRoutes;