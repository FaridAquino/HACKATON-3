import LoginForm from "@components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate=useNavigate()
	return (
		<main className="px-10 felx flex-col items-center justify-center">

			<article className="flex justify-between">
				<LoginForm />
			</article>
		</main>
	);
}
