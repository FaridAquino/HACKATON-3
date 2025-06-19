export default interface ExpensesResponseUnity {
    id: number;
    date: string;
    category: {
        id: number;
        name: string;
    };
    amount: number;
}