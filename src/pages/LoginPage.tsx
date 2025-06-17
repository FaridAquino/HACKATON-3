import { useState, type ChangeEvent } from "react";
import { login } from "../services/auth/login";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		passwd: ""
	});

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const loginRequest = formData;
		console.log("Login Request:", loginRequest);

		try {
			const response = await login(loginRequest);
			console.log("Login Response:", response);
			localStorage.setItem("token", response.data.token);
			console.log("Login exitoso")
		} catch (error) {
			console.error("Login Error:", error);
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
		<div className="bg-white w-[400px] flex flex-col text-black ml-20">
			<h1 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
			<form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
				<input type="email" name="email" placeholder="Correo electrónico" className="border border-gray-300 p-2 rounded" value={formData.email} onChange={handleChange} />
				<input
					type="password"
					name="passwd"  // <-- debe ser igual que en el estado
					placeholder="Contraseña"
					className="border border-gray-300 p-2 rounded"
					value={formData.passwd}
					onChange={handleChange}
				/>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all cursor-pointer">Iniciar Sesión</button>
			</form>
		</div>
	);
}
