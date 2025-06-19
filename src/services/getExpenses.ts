import ExpensesResponse from "@interfaces/expenses/ExpensesResponse";
import Api from "@services/api";

export async function getExpenses (year: number, month: number, categoryId: number) {
    const api = await Api.getInstance();
    const response = await api.get<NonElementParentNode,ExpensesResponse>({
        url:`/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`
    });

    return response;
}
