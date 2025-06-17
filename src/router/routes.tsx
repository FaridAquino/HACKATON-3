import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "register",
                        element: <RegisterPage />,
                    },
                ],
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    // Hijos vacíos, puedes agregar nuevos aquí cuando los necesites
                ],
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);