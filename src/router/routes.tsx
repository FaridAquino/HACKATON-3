import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import DashboardPage from "@pages/DashboardPage";
import Page1 from "@pages/Page1";
import Page2 from "@pages/ExpensesSummaryPage";
import ExpensesPage from "@pages/ExpensesPage";
import ExpensesSummaryPage from "@pages/ExpensesSummaryPage";

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
					path: "summary",
					element: <ExpensesSummaryPage />
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
