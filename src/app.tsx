
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function App() {
	const navigate = useNavigate();
	const location = useLocation();

	const isRegister= location.pathname=== "/auth/register";
	const isLogin = location.pathname === "/auth/login";

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-row items-center justify-center gap-50 h-[80px] bg-gray-100">
				<button className={`${isLogin ? "bg-blue-800 border" : "bg-blue-500"
				} text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition-all`} onClick={() => { navigate("/auth/login") }}>Logearse</button>
				<button className={`${isRegister ? "bg-blue-800 border" : "bg-blue-500"} text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition-all`} onClick={() => { navigate("/auth/register") }}>Registrarse</button>
			</div>
			<Outlet />
		</div>
	);
}