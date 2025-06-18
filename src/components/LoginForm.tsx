import { LoginRequest } from "@interfaces/auth/LoginRequest";
import { login } from "@services/auth/login";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginForm() {
	const [formData, setFormData] = useState<LoginRequest>({
		email:"",
		passwd:"",
	});

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const loginRequest = formData;
		console.log("Login Request:", loginRequest); //verificar

		try {
			const response = await login(loginRequest);
			console.log("Login Response:", response);
			console.log("Token obtenido", response.data.result.token);
			localStorage.setItem("token", response.data.result.token);
		} catch (error) {
			console.error("Error during login:", error);
		}
	}

	return (
		<section className="login-section bg-green-500 flex flex-col items-center justify-center p-3 rounded-lg">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="email">Email</label>
					<input className="border border-gray-300 p-1 rounded" type="email" name="email" value={formData.email} onChange={handleChange} />
				</div>
				<div className="flex flex-col items-center justify-center">
					<label htmlFor="password">Contraseña</label>
					<input
						className="border border-gray-300 p-1 rounded"
						type="password"
						name="passwd"
						value={formData.passwd}
						onChange={handleChange}
					/>
				</div>
				<button className="bg-blue-500" type="submit">
					Iniciar Sesión
				</button>
			</form>
		</section>
	);
}
