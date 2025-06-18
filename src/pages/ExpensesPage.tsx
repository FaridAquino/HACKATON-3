// src/pages/ExpensesPage.tsx
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa"; // Ícono para gastos
import { useEffect } from "react";
import { getExpenses } from "../services/getExpenses"

interface Expense {
    id: number;
    date: string;
    category: { id: number; name: string };
    amount: number;
}

const categories = [
    "Alimentación",
    "Transporte",
    "Vivienda",
    "Servicios (agua, luz, internet)",
    "Educación",
    "Salud",
    "Entretenimiento",
    "Ropa y calzado",
    "Ahorros",
    "Impuestos",
    "Mascotas",
    "Viajes",
    "Donaciones",
    "Seguros",
    "Hijos y familia",
    "Gimnasio y deporte",
    "Tecnología y gadgets",
    "Mantenimiento del hogar",
    "Bebidas y snacks",
    "Otros gastos personales"
];
const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const years = [2023, 2024, 2025];

export default function ExpensesPage() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);

    if (!selectedCategory && !selectedMonth && !selectedYear) {
        alert("Debe seleccionar en los 3 espeacios");
        setLoading(false);
        return;
    }

    const mockExpenses: Expense[] = [
        {
            id: 1,
            date: "2025-01-18",
            category: { id: 1, name: "Alimentación" },
            amount: 116.84
        },
        {
            id: 2,
            date: "2025-02-05",
            category: { id: 2, name: "Transporte" },
            amount: 49.20
        },
    ]

    useEffect(() => {
        setExpenses(mockExpenses);
    }, []);



    const fetchGastos = async () => {
        setLoading(true);

        try {
            const info = await getExpenses();
            setExpenses(info);
        } catch (error) {
            console.log("No se pudo conseguir los Expenses para su busqueda", error)
        }
        finally {
            setLoading(false);
        }

    }

    // useEffect(() => {
    //     fetchExpenses();
    // }, []);




    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-400 text-4xl" />
                Gastos Mensuales
            </h1>

            {/* Barra de filtros */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8 w-full max-w-3xl shadow-md flex flex-wrap justify-center gap-x-4 gap-y-4">

                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:max-w-sm"
                >
                    <option>Categoría</option>

                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:max-w-sm"
                >

                    <option>Mes</option>
                    {
                        months.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))
                    }
                </select>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:max-w-sm"
                >
                    <option>Año</option>
                    {years.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))
                    }
                </select>

                {/* Botón filtrado */}
                <button
                    onClick={fetchGastos}
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                >
                    {loading ? "Cargando..." : "Filtrar"}
                </button>
            </div>

            {/* Resultados */}
            <div className="w-full max-w-3xl space-y-4">
                {expenses.length === 0 ? (
                    <p className="text-gray-400 text-center">No hay resultados para mostrar.</p>
                ) : (
                    expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-semibold">{expense.category.name}</p>
                                <p className="text-sm text-gray-400">{expense.date}</p>
                            </div>
                            <p className="text-xl font-bold text-green-400">S/. {expense.amount.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}
