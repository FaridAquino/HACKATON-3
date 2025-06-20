import Api from "@services/api";

export async function deleteExpense(expenseId: number) {
    const api = await Api.getInstance();
    const response = await api.delete({
        url: `/expenses/${expenseId}`
    });
    return response;
}

