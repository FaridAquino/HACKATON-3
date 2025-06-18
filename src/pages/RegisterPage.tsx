import { useState } from "react";
import { register } from "../services/auth/register"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario al login

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    passwd: "",
    confirmPasswd: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Maneja el cambio de datos en los campos del formulario
interface FormData {
	email: string;
	passwd: string;
	confirmPasswd: string;
}

interface ChangeEvent {
	target: {
		name: string;
		value: string;
	};
}

function handleChange(event: ChangeEvent) {
	const { name, value } = event.target;
	setFormData((prevData: FormData) => ({
		...prevData,
		[name]: value,
	}));
}

  // Función para manejar el submit del formulario
interface RegisterData {
	email: string;
	passwd: string;
}

interface RegisterResponse {
	// Define properties based on your register service response if known
	[key: string]: any;
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
	event.preventDefault();

	// Validar que la contraseña tenga al menos 12 caracteres
	if (formData.passwd.length < 12) {
		setError("La contraseña debe tener al menos 12 caracteres.");
		return;
	}

	// Verificar que las contraseñas coincidan
	if (formData.passwd !== formData.confirmPasswd) {
		setError("Las contraseñas no coinciden.");
		return;
	}

	const registerData: RegisterData = {
		email: formData.email,
		passwd: formData.passwd,
	};

	try {
		// Llamada al servicio de registro
		const response: RegisterResponse = await register(registerData);
		console.log("Registro exitoso:", response);

		// Mostrar un mensaje de éxito
		setSuccess("¡Registro exitoso! Se han creado tus gastos aleatorios.");

		// Redirigir al login después de un registro exitoso
		setTimeout(() => {
			navigate("/login");
		}, 2000); // Redirige después de 2 segundos para que el mensaje sea visible
	} catch (error: any) {
		// Mostrar mensaje de error si el correo ya existe
		if (error.response && error.response.status === 400) {
			setError("El correo electrónico ya está en uso.");
		} else {
			setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
		}
	}
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white w-full max-w-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Registrarse</h1>

        {/* Mostrar el error si ocurre */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Mostrar el mensaje de éxito si ocurre */}
        {success && <div className="text-green-500 mb-4">{success}</div>}

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
          <input
            type="password"
            name="confirmPasswd"
            placeholder="Confirmar Contraseña"
            className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPasswd}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">¿Ya tienes cuenta? Iniciar sesión</a>
        </div>
      </div>
    </div>
  );
}
