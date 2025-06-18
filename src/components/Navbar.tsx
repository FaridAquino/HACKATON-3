import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	function logout() {
		localStorage.removeItem("token");
		location.reload();
	}

	if (localStorage.getItem("token")) {
		return (

			<div className="">
				<section className="flex justify-center items-center py-4 gap-10">
					<button onClick={() => navigate("/auth/login")} className="bg-blue-500">Iniciar sesion</button>
					<button onClick={() => navigate("/auth/register")} className="bg-blue-500">Registrarse</button>
				</section>
				<div className="text-2xl">Uber</div>
				<button id="logout" onClick={logout}>
					Logout
				</button>
			</div>
		);
	} else {
		return (
			<div className="">Uber
				<section className="flex justify-center items-center py-4 gap-10">
					<button onClick={() => navigate("/auth/login")} className="bg-blue-500">Iniciar sesion</button>
					<button onClick={() => navigate("/auth/register")} className="bg-blue-500">Registrarse</button>
				</section>
			</div>);
	}
}
