import { useAuthContext } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const authContext = useAuthContext();

	function logout() {
		authContext.logout();
		navigate("/auth/login");
	}

	return (
		<div className="bg-blue-600 text-white p-4">
			<div className="flex justify-between items-center">
				<div className="text-3xl font-bold">Ahorrista</div>
				<section className="flex justify-center items-center gap-6">
					{localStorage.getItem("token") ? (
						<>
							<button
								onClick={logout}
								className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => navigate("/auth/login")}
								className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
							>
								Iniciar sesión
							</button>
							<button
								onClick={() => navigate("/auth/register")}
								className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
							>
								Registrarse
							</button>
						</>
					)}
				</section>
			</div>
		</div>
	);
}
