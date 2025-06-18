

export const getExpenses = async () => {
    const response = await api.get('/expenses_category')
    return response.data;
}