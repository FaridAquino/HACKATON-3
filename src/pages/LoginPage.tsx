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
			navigate("/logged/dashboard"); // redirige después de login exitoso
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
		<div className="min-h-screen flex items-center justify-center bg-mocha-base">
			<div className="bg-mocha-surface0 border border-mocha-surface1 w-full max-w-md p-8 rounded-xl shadow-2xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-mocha-text mb-2">Ahorrista</h1>
					<p className="text-mocha-subtext1">Inicia sesión en tu cuenta</p>
				</div>
				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div>
						<label className="block text-mocha-subtext1 text-sm font-medium mb-2">
							Correo electrónico
						</label>
						<input
							type="email"
							name="email"
							placeholder="tu@email.com"
							className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-blue focus:border-transparent transition-all"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block text-mocha-subtext1 text-sm font-medium mb-2">
							Contraseña
						</label>
						<input
							type="password"
							name="passwd"
							placeholder="••••••••••••"
							className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-blue focus:border-transparent transition-all"
							value={formData.passwd}
							onChange={handleChange}
							required
							minLength={12}
						/>
						<p className="text-xs text-mocha-subtext0 mt-1">Mínimo 12 caracteres</p>
					</div>
					<button
						type="submit"
						className="w-full bg-mocha-blue hover:bg-mocha-sapphire text-mocha-base font-semibold p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
					>
						Iniciar Sesión
					</button>
				</form>
				<div className="mt-6 text-center">
					<p className="text-mocha-subtext1">¿No tienes cuenta? {" "}
						<a href="/auth/register" className="text-mocha-blue hover:text-mocha-sapphire hover:underline transition-colors">
							Regístrate aquí
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
