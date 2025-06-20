import CategoryResponse from "@interfaces/expenses/CategoryResponse";
import Api from "@services/api";

export async function getCategories() {
	const api = await Api.getInstance();
	const response = await api.get<NonElementParentNode, CategoryResponse[]>({
		url: "/expenses_category",
	});
	return response;
}
