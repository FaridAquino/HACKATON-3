import SummaryResponse from "@interfaces/expenses/SummaryRespone";
import Api from "@services/api";

export async function getSummary() {
    const api = await Api.getInstance();
    const response = await api.get<NonElementParentNode,SummaryResponse[]>({
        url: "/expenses_summary"
    })
    return response;
}
