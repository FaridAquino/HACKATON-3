

import Api from "./api";

interface ExpensesInterface {
     
	category?: string;
	month?: string;
	year?: string;
}

export const getExpenses = async (filters: ExpensesInterface) => {
	const response = await api.get("/expenses_category", {
		params: filters,
	}); // para una url descriptiva
	return response.data;
};


