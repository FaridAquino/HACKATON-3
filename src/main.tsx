import { AuthProvider } from "../src/contexts/AuthContext";
import { router } from "../src/router/routes";
import "../src/App.css"
import "../src/index.css"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>,
);


