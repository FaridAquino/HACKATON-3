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
    <div className="min-h-screen flex items-center justify-center bg-mocha-base">
      <div className="bg-mocha-surface0 border border-mocha-surface1 w-full max-w-md p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mocha-text mb-2">Únete a Ahorrista</h1>
          <p className="text-mocha-subtext1">Crea tu cuenta y comienza a controlar tus gastos</p>
        </div>

        {/* Mostrar el error si ocurre */}
        {error && (
          <div className="bg-mocha-red/20 border border-mocha-red rounded-lg p-3 mb-4">
            <p className="text-mocha-red text-sm">{error}</p>
          </div>
        )}

        {/* Mostrar el mensaje de éxito si ocurre */}
        {success && (
          <div className="bg-mocha-green/20 border border-mocha-green rounded-lg p-3 mb-4">
            <p className="text-mocha-green text-sm">{success}</p>
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-mocha-subtext1 text-sm font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-green focus:border-transparent transition-all"
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
              className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-green focus:border-transparent transition-all"
              value={formData.passwd}
              onChange={handleChange}
              required
              minLength={12}
            />
            <p className="text-xs text-mocha-subtext0 mt-1">Mínimo 12 caracteres</p>
          </div>
          
          <div>
            <label className="block text-mocha-subtext1 text-sm font-medium mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPasswd"
              placeholder="••••••••••••"
              className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-green focus:border-transparent transition-all"
              value={formData.confirmPasswd}
              onChange={handleChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-mocha-green hover:bg-mocha-teal text-mocha-base font-semibold p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Crear Cuenta
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-mocha-subtext1">¿Ya tienes cuenta? {" "}
            <a href="/auth/login" className="text-mocha-green hover:text-mocha-teal hover:underline transition-colors">
              Inicia sesión aquí
            </a>
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-mocha-surface1 rounded-lg">
          <p className="text-xs text-mocha-subtext0 text-center">
            Al registrarte, se crearán automáticamente 10,000 gastos aleatorios para que pruebes la aplicación.
          </p>
        </div>
      </div>
    </div>
  );
}
