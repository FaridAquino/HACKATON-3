import CategoryResponse from "./CategoryResponse";

export default interface SummaryResponse {
    id: number;
    expenseCategory: CategoryResponse
    year: number;
    month: number;
    amount: number;
}
