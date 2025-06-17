import type { LoginRequest } from "../../interfaces/auth/LoginRequest";
import type { AuthResponse } from "../../interfaces/auth/AuthResponse";
import Api from "../api";

export async function login(loginRequest: LoginRequest) {
	const api = await Api.getInstance();
	const response = await api.post<LoginRequest, AuthResponse>(loginRequest, {
		url: "/authentication/login",
	});
	api.authorization = response.data.token;
	return response;
}
