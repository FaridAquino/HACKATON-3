import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/contexts/AuthContext"; // importa el contexto

export default function LoginPage() {
	const navigate = useNavigate();
	const authContext = useAuthContext(); // usa el contexto
	const [formData, setFormData] = useState({
		email: "",
		passwd: ""
	});

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			await authContext.login(formData); // usa el método del contexto
			navigate("/auth/dashboard"); // redirige después de login exitoso
		} catch (error) {
			console.error("Login Error:", error);
			navigate("/auth/dashboard");
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
			<div className="bg-white w-full max-w-sm p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="Correo electrónico"
						className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						type="password"
						name="passwd"
						placeholder="Contraseña"
						className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.passwd}
						onChange={handleChange}
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
					>
						Iniciar Sesión
					</button>
				</form>
				<div className="mt-4 text-center">
					<a href="/register" className="text-blue-500 hover:underline">Registrarse</a>
				</div>
			</div>
		</div>
	);
}
