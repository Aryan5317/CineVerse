import { createBrowserRouter, RouterProvider } from "react-router-dom";

import userRoutes from "./user/routes/UserRoute.jsx";
import adminRoutes from "./admin/routes/AdminRoute.jsx";
import theatreRoutes from "./theatre/routes/TheatreRoutes.jsx";

const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes,
    ...theatreRoutes,
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;