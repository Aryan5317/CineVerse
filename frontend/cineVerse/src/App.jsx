import { createBrowserRouter, RouterProvider } from "react-router-dom";

import userRoutes from "./user/routes/UserRoute.jsx";
import adminRoutes from "./admin/routes/AdminRoute.jsx";

const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;