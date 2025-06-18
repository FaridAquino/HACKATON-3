import { AuthResponse } from "@interfaces/auth/AuthResponse";
import { LoginRequest } from "@interfaces/auth/LoginRequest";
import Api from "@services/api";

export async function login(loginRequest: LoginRequest) {
	const api = await Api.getInstance();
	const response = await api.post<LoginRequest, AuthResponse>(loginRequest, {
		url: "/authentication/login",
	});
	if (response.data && response.data.result && response.data.result.token) {
		api.authorization = response.data.result.token;
		console.log("Response", response.data);
	} else {
		console.log("Response", response.data);
		throw new Error("Login fallido: respuesta inválida del servidor");
	}
	return response;
}

