import AdminLoginPage from "../pages/AdminLoginPage";
import AdminForgetPassword from "../pages/SuperAdmin/AdminForgetPassword";
import AdminHomePage from "../pages/SuperAdmin/AdminHomePage";
import AdminAdministrationPage from "../pages/SuperAdmin/AdminAdministrationPage";
import SuperAdminProfileDetails from "../pages/SuperAdmin/SuperAdminProfileDetails";
import HomePage from "../pages/Admin/HomePage";
import AdminContextProvider from "../context/AdminContextProvider/AdminContextProvider";
import AdminProtectedRoute from "../context/AdminContextProvider/AdminProtectedRoute";
import AdminProfilePage from "../pages/Admin/AdminProfilePage";
import AddNewMovies from "../pages/Admin/AddNewMovies";
import MoviesPage from "../pages/Admin/MoviesPage";

const adminRoutes = [
    {
        path: "/admin",
        element: <AdminContextProvider />,
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
                path: "/admin/forget-password",
                element: <AdminForgetPassword />
            },
            {
                element: <AdminProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <AdminHomePage />
                    },
                    {
                        path: "administration",
                        element: <AdminAdministrationPage />
                    },
                    {
                        path: "administration/:adminDetailsIdRoute",
                        element: <AdminAdministrationPage />
                    },
                    {
                        path: "profile",
                        element: <SuperAdminProfileDetails />
                    },

                    {
                        path: "panel/dashboard",
                        element: <HomePage />
                    },
                    {
                        path: "panel/profile",
                        element: <AdminProfilePage />
                    },
                    {
                        path: "panel/movies/create-movie",
                        element: <AddNewMovies />
                    },
                    {
                        path: "panel/movies",
                        element: <MoviesPage />
                    }
                ]
            },
        ]
    },
];

export default adminRoutes;

