import BarraButtons from "@components/BarraButtons";
import SummaryResponse from "@interfaces/expenses/SummaryRespone";
import { getSummary } from "@services/getSummary";
import { useEffect, useState } from "react";

export default function ExpensesSummaryPage() {
    const [formData, setFormData] = useState<SummaryResponse[]>([]);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
        if (event) event.preventDefault();
        console.log("Obteniendo resumen de gastos...");
        setLoading(true);
        try {
            const response = await getSummary();
            setFormData(response.data);
        } catch (error) {
            console.error("Error al obtener el resumen de gastos:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
            <div className="fixed inset-y-0 left-0 bg-gray-800 w-[150px] p-6 rounded-r-lg shadow flex flex-col items-center justify-between">
                <BarraButtons />
            </div>
            <div className="w-full max-w-3xl space-y-4">
                {loading ? (
                    <p className="text-gray-400 text-center">Cargando...</p>
                ) : formData.length === 0 ? (
                    <p className="text-gray-400 text-center">No hay resultados para mostrar.</p>
                ) : (
                    formData.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-semibold">{expense.expenseCategory.name}</p>
                                <p className="text-sm text-gray-400">{expense.year}</p>
                            </div>
                            <p className="text-xl font-bold text-green-400">S/. {expense.amount.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}