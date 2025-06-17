
import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
	const navigate = useNavigate();

	return (
		<>
			<div>Hello World</div>
			<button className="bg-amber-400 border border-amber-400 text-white py-2 px-4 rounded" onClick={() => { navigate("/auth/login") }}>Logearse</button>
			<button className="bg-amber-400 border border-amber-400 text-white py-2 px-4 rounded" onClick={() => { navigate("/auth/register") }}>Registrarse</button>
			<Outlet />
		</>
	);
}