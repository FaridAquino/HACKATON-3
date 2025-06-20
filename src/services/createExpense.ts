import CreateExpenseRequest from "@interfaces/expenses/CreateExpenseRequest";
import Api from "@services/api";

export async function createExpense(expenseData: CreateExpenseRequest) {
    const api = await Api.getInstance();
    const response = await api.post({
        url: "/expenses",
        data: expenseData
    });
    return response;
}

