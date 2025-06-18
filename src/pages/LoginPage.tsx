import LoginForm from "@components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate=useNavigate()
	return (
		<main className="px-10 felx flex-col items-center justify-center">

			<section className="flex justify-center items-center py-4 gap-10">
				<button onClick={() => navigate("/auth/login")} className="bg-blue-500">Iniciar sesion</button>
				<button onClick={() => navigate("/auth/register")} className="bg-blue-500">Registrarse</button>
			</section>

			<article className="flex justify-between">
				<LoginForm />
			</article>
		</main>
	);
}
