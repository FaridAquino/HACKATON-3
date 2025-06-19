import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import DashboardPage from "@pages/DashboardPage";
import Page1 from "@pages/Page1";
import Page2 from "@pages/Page2";
import ExpensesPage from "@pages/ExpensesPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "auth",
				children: [{
					path: "login",
					element: <LoginPage />
				}, {
					path: "register",
					element: <RegisterPage />
				}
				],
			},
			{
				path: "logged",
				element: <ProtectedRoute />,
				children: [{
					path: "dashboard",
					element: <DashboardPage />
				}, {
					path: "page1",
					element: <Page1 />
				}, {
					path: "page2",
					element: <Page2 />
				}, {
					path: "expenses",
					element: <ExpensesPage />
				}],
			},
			{
				path: "*",
			},
		],
	},
]);
