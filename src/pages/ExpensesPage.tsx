import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getExpenses } from "@services/getExpenses";
import { getCategories } from "@services/getCategories";
import { deleteExpense } from "@services/deleteExpense";
import ExpensesResponse from "@interfaces/expenses/ExpensesResponse";
import CategoryResponse from "@interfaces/expenses/CategoryResponse";
import BarraButtons from "@components/BarraButtons";
import AddExpenseModal from "@components/AddExpenseModal";
import { ArrowLeft, Calendar, DollarSign, Plus, Trash2, Filter, Search } from "lucide-react";

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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [expenses, setExpenses] = useState<ExpensesResponse>([]);
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Get URL parameters
    useEffect(() => {
        const categoryIdParam = searchParams.get('categoryId');
        const yearParam = searchParams.get('year');
        const monthParam = searchParams.get('month');
        
        if (categoryIdParam) setSelectedCategory(parseInt(categoryIdParam));
        if (yearParam) setSelectedYear(parseInt(yearParam));
        if (monthParam) setSelectedMonth(parseInt(monthParam));
        
        // Auto-fetch if all parameters are present
        if (categoryIdParam && yearParam && monthParam) {
            setSelectedCategory(parseInt(categoryIdParam));
            setSelectedYear(parseInt(yearParam));
            setSelectedMonth(parseInt(monthParam));
            fetchGastos(parseInt(yearParam), parseInt(monthParam), parseInt(categoryIdParam));
        }
    }, [searchParams]);

    const fetchGastos = async (year?: number, month?: number, categoryId?: number) => {
        const yearToUse = year || selectedYear;
        const monthToUse = month || selectedMonth;
        const categoryToUse = categoryId || selectedCategory;
        
        if (!yearToUse || !monthToUse || !categoryToUse) {
            console.log("Missing required parameters");
            return;
        }
        
        setLoading(true);
        try {
            const response = await getExpenses(yearToUse, monthToUse, categoryToUse);
            setExpenses(response.data);
            
            // Set category name for display
            const category = categories.find(c => c.id === categoryToUse);
            if (category) {
                setCategoryName(category.name);
            }
        } catch (error) {
            console.log("No se pudo conseguir los Expenses para su busqueda", error)
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     fetchExpenses();
    // }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleDeleteExpense = async (expenseId: number) => {
        const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este gasto?');
        if (!isConfirmed) return;
        
        try {
            await deleteExpense(expenseId);
            // Refresh the expenses list after successful deletion
            if (selectedYear && selectedMonth && selectedCategory) {
                fetchGastos();
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('Error al eliminar el gasto. Intenta nuevamente.');
        }
    };

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="min-h-screen bg-mocha-base text-mocha-text px-4 py-8">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 bg-mocha-surface0 w-[150px] p-6 rounded-r-lg shadow-lg flex flex-col items-center justify-between z-10">
                <BarraButtons />
            </div>
            
            {/* Main Content */}
            <div className="ml-[170px] max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/logged/summary')}
                        className="flex items-center gap-2 text-mocha-blue hover:text-mocha-sapphire transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Volver al resumen
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-8 h-8 text-mocha-blue" />
                        <h1 className="text-3xl font-bold text-mocha-text">
                            {categoryName ? `Gastos: ${categoryName}` : 'Gastos Detallados'}
                        </h1>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-mocha-surface0 border border-mocha-surface1 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className="w-5 h-5 text-mocha-blue" />
                        <h2 className="text-lg font-semibold text-mocha-text">Filtros</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-mocha-subtext1 text-sm font-medium mb-2">Categoría</label>
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-blue"
                            >
                                <option value={0}>Seleccionar categoría</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-mocha-subtext1 text-sm font-medium mb-2">Mes</label>
                            <select 
                                value={selectedMonth} 
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-blue"
                            >
                                <option value={0}>Seleccionar mes</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>{month.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-mocha-subtext1 text-sm font-medium mb-2">Año</label>
                            <select 
                                value={selectedYear} 
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="w-full bg-mocha-surface1 border border-mocha-surface2 text-mocha-text p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-mocha-blue"
                            >
                                <option value={0}>Seleccionar año</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => fetchGastos()}
                        disabled={loading}
                        className="flex items-center gap-2 bg-mocha-blue hover:bg-mocha-sapphire disabled:bg-mocha-surface2 text-mocha-base font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                    >
                        <Search className="w-5 h-5" />
                        {loading ? "Buscando..." : "Buscar Gastos"}
                    </button>
                </div>

                {/* Total Amount */}
                {expenses.length > 0 && (
                    <div className="bg-mocha-surface0 border border-mocha-surface1 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-semibold text-mocha-subtext1 mb-2">Total de Gastos</h2>
                        <p className="text-3xl font-bold text-mocha-red">S/. {totalAmount.toFixed(2)}</p>
                        <p className="text-sm text-mocha-subtext0 mt-1">{expenses.length} gastos encontrados</p>
                    </div>
                )}

                {/* Add Expense Button */}
                <div className="mb-6">
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-mocha-green hover:bg-mocha-teal text-mocha-base font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        Agregar Nuevo Gasto
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mocha-blue"></div>
                    </div>
                )}

                {/* Expenses List */}
                {!loading && (
                    <div className="space-y-4">
                        {expenses.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-mocha-subtext0 text-lg">No hay gastos para mostrar</p>
                                <p className="text-mocha-subtext1 text-sm mt-2">Usa los filtros para buscar gastos específicos</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold text-mocha-text mb-4">Lista de Gastos</h2>
                                {expenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="bg-mocha-surface0 border border-mocha-surface1 hover:border-mocha-blue/50 transition-all duration-200 rounded-xl p-6 group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-mocha-red/20 rounded-lg">
                                                        <DollarSign className="w-5 h-5 text-mocha-red" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-mocha-text">
                                                            S/. {expense.amount.toFixed(2)}
                                                        </h3>
                                                        <p className="text-sm text-mocha-subtext1">
                                                            {formatDate(expense.date)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="ml-11">
                                                    <div className="flex items-center gap-2 text-xs text-mocha-subtext0">
                                                        <span>ID: #{expense.id}</span>
                                                        <span>•</span>
                                                        <span>{expense.category.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <button 
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="p-3 text-mocha-subtext0 hover:text-mocha-red hover:bg-mocha-red/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
                
                {/* Add Expense Modal */}
                <AddExpenseModal 
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onExpenseAdded={() => {
                        // Refresh expenses if we have current filters
                        if (selectedYear && selectedMonth && selectedCategory) {
                            fetchGastos();
                        }
                    }}
                />
            </div>
        </div>
    );

}
