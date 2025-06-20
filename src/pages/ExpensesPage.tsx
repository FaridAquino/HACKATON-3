// src/pages/ExpensesPage.tsx
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaTrash } from "react-icons/fa"; // Ícono para gastos
import { getExpenses } from "@services/getExpenses"; // Asegúrate de que esta ruta sea correcta
import ExpensesResponse from "@interfaces/expenses/ExpensesResponse";
import BarraButtons from "@components/BarraButtons";
import { BorrarGasto } from "@services/DeleteGasto";
import { toast } from "react-hot-toast";

const categories = [
    { name: "Alimentación", id: 1 },
    { name: "Transporte", id: 2 },
    { name: "Vivienda", id: 3 },
    { name: "Servicios", id: 4 },
    { name: "Educaion", id: 5 },
    { name: "Salud", id: 6 },
    { name: "Entretenimiento", id: 7 },
    { name: "Ropa y calzado", id: 8 },
    { name: "Ahorros", id: 9 },
    { name: "Impuestos", id: 10 },
    { name: "Mascotas", id: 11 },
    { name: "Viajes", id: 12 },
    { name: "Donaciones", id: 13 },
    { name: "Seguros", id: 14 },
    { name: "Hijos y familia", id: 15 },
    { name: "Gimnasio y deporte", id: 16 },
    { name: "Tecnología y gadgets", id: 17 },
    { name: "Mantenimiento del hogar", id: 18 },
    { name: "Bebidas y snacks", id: 19 },
    { name: "Otros gastos personales", id: 20 },
];

const months = [
    { name: "Enero", value: 1 },
    { name: "Febrero", value: 2 },
    { name: "Marzo", value: 3 },
    { name: "Abril", value: 4 },
    { name: "Mayo", value: 5 },
    { name: "Junio", value: 6 },
    { name: "Julio", value: 7 },
    { name: "Agosto", value: 8 },
    { name: "Septiembre", value: 9 },
    { name: "Octubre", value: 10 },
    { name: "Noviembre", value: 11 },
    { name: "Diciembre", value: 12 },
];
const years = [2023, 2024, 2025];

export default function ExpensesPage() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [expenses, setExpenses] = useState<ExpensesResponse>([]);
    const [loading, setLoading] = useState(false);
    const [errWhenDelete, seterrWhenDelete] = useState(false);
    const [deleteSucces, setdeleteSucces] = useState(false);

    const fetchGastos = async () => {
        setLoading(true);

        try {
            const response = await getExpenses(selectedYear, selectedMonth, selectedCategory);
            setExpenses(response.data);

        } catch (error) {
            console.log("No se pudo conseguir los Expenses para su busqueda", error)
        }
        finally {
            setLoading(false);
        }

    }


    const deleteGasto = async (id: number) => {
        const borrando = toast.loading("Borando gasto...")
        try {
            const result = await BorrarGasto(id);
            setExpenses((prev) => prev.filter((g) => g.id !== id));
            toast.dismiss(borrando);

            setdeleteSucces(result);
            // await fetchGastos(); // evitaremso recarga rdesde el backedns. ello demora.


            toast.success("Borrado Exitoso!!");

        } catch (error) {
            setdeleteSucces(false);
            toast.error("Experimentamos un error al borrar");
        }


    }

    useEffect(() => {
        if (selectedCategory && selectedMonth && selectedYear) {
            fetchGastos();
        }
    }, [selectedCategory, selectedMonth, selectedYear]) // cada vez que cambia alguno de estos


    // const onDelete()

    // useEffect(() => {
    //     fetchExpenses();
    // }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
            <div className="fixed inset-y-0 left-0 bg-gray-800 w-[150px] p-6 rounded-r-lg shadow flex flex-col items-center justify-between">
                <BarraButtons />
            </div>
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-400 text-4xl" />
                Gastos Mensuales
            </h1>

            {/* Barra de filtros */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8 w-full max-w-3xl shadow-md flex flex-wrap justify-center gap-x-4 gap-y-4">
                <p>Pruebe al menos con Alimentación, enero, año 2025    </p>

                <select required={true} name="selectedCategory" value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:max-w-sm"
                >
                    <option value={0} disabled>Categoría</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <select required={true} value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:max-w-sm"
                >

                    <option value={0} disabled>Mes</option>
                    {
                        months.map((month) => (
                            <option key={month.value} value={month.value}>{month.name}
                            </option>
                        ))
                    }
                </select>
                <select required={true} value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full sm:max-w-sm"
                >
                    <option value={0} disabled >Año</option>
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
            <div>
                <p>Se sabe que tiene gastos registrados al menos en Alimentación, enero, año 2025    </p>
            </div>
            {/* Resultados */}
            <div className="w-full max-w-3xl space-y-4">
                {expenses.length === 0 ? (
                    <p className="text-gray-400 text-center">Parece que no hay datos para los campos ingresados</p>
                ) : (
                    expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-gray-800 px-8 py-2 rounded-lg shadow-md flex justify-between items-center "
                        >
                            <div>
                                <p className="text-lg font-semibold">{expense.category.name}</p>
                                <p className="text-sm text-gray-400">{expense.date}</p>
                            </div>
                            <p className="text-xl font-bold text-green-400">S/. {expense.amount.toFixed(2)}</p>
                            <div className="flex justify-end">
                                <button
                                    disabled={loading}
                                    onClick={() => deleteGasto(expense.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                    title="Eliminar gasto"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}
