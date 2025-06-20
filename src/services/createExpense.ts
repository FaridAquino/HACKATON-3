import CreateExpenseRequest from "@interfaces/expenses/CreateExpenseRequest";
import Api from "@services/api";

export async function createExpense(expenseData: CreateExpenseRequest) {
	const api = await Api.getInstance();
	// Aquí el primer argumento es el body y el segundo es el objeto con la URL
	const response = await api.post<CreateExpenseRequest, any>(expenseData, {
		url: "/expenses",
	});
	return response;
}
