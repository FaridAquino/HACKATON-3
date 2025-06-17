

export default function RegisterPage() {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}


	return (
		<div className="bg-white w-[400px] flex flex-col text-black ml-20">
			<h1 className="text-2xl font-bold text-center mb-4">Registrarse</h1>
			<form className="flex flex-col gap-4 p-4">
				<input type="text" name="username" placeholder="Nombre de usuario" className="border border-gray-300 p-2 rounded" />
				<input type="email" name="email" placeholder="Correo electrónico" className="border border-gray-300 p-2 rounded" />
				<input type="password" name="password" placeholder="Contraseña" className="border border-gray-300 p-2 rounded" />
				<button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all cursor-pointer">Registrarse</button>
			</form>
			<p className="text-center mt-4 text-gray-600">¿Ya tienes una cuenta? <a href="/auth/login" className="text-blue-500 hover:underline">Iniciar sesión</a></p>

		</div>
	);
}
