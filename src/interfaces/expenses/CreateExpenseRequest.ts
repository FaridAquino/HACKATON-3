export default interface CreateExpenseRequest {
	amount: number;
	date: string;
	category: {
		id: number;
	};
}
