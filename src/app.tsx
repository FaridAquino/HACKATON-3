import Navbar from "@components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 3000,
					style: {
						background: "#1f2937", // gris oscuro
						color: "#fff",
					},
				}}
			/>


		</>
	);
}
