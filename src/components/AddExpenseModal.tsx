import { useState, useEffect } from "react";
import { X, Plus, DollarSign } from "lucide-react";
import { getCategories } from "@services/getCategories";
import { createExpense } from "@services/createExpense";
import CategoryResponse from "@interfaces/expenses/CategoryResponse";
import CreateExpenseRequest from "@interfaces/expenses/CreateExpenseRequest";

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExpenseAdded: () => void;
}

export default function AddExpenseModal({ isOpen, onClose, onExpenseAdded }: AddExpenseModalProps) {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        categoryId: 0
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = "El monto debe ser mayor a 0";
        }
        
        if (!formData.date) {
            newErrors.date = "La fecha es requerida";
        }
        
        if (!formData.categoryId || formData.categoryId === 0) {
            newErrors.categoryId = "Selecciona una categoría";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        try {
            const expenseData: CreateExpenseRequest = {
                amount: parseFloat(formData.amount),
                date: formData.date,
                categoryId: formData.categoryId
            };
            
            await createExpense(expenseData);
            
            // Reset form
            setFormData({
                amount: "",
                date: new Date().toISOString().split('T')[0],
                categoryId: 0
            });
            setErrors({});
            
            onExpenseAdded();
            onClose();
        } catch (error) {
            console.error("Error creating expense:", error);
            setErrors({ submit: "Error al crear el gasto. Intenta nuevamente." });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-mocha-base/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-mocha-surface0 border border-mocha-surface1 rounded-xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-mocha-surface1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-mocha-green/20 rounded-lg">
                            <Plus className="w-5 h-5 text-mocha-green" />
                        </div>
                        <h2 className="text-xl font-semibold text-mocha-text">Agregar Nuevo Gasto</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-mocha-subtext0 hover:text-mocha-text hover:bg-mocha-surface1 rounded-lg transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Amount */}
                    <div>
                        <label className="block text-mocha-subtext1 text-sm font-medium mb-2">
                            Monto (S/.)
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <DollarSign className="w-5 h-5 text-mocha-subtext0" />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 bg-mocha-surface1 border rounded-lg text-mocha-text placeholder-mocha-subtext0 focus:outline-none focus:ring-2 transition-all ${
                                    errors.amount 
                                        ? 'border-mocha-red focus:ring-mocha-red/50' 
                                        : 'border-mocha-surface2 focus:ring-mocha-green focus:border-transparent'
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-mocha-red text-sm mt-1">{errors.amount}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-mocha-subtext1 text-sm font-medium mb-2">
                            Fecha del Gasto
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className={`w-full p-3 bg-mocha-surface1 border rounded-lg text-mocha-text focus:outline-none focus:ring-2 transition-all ${
                                errors.date 
                                    ? 'border-mocha-red focus:ring-mocha-red/50' 
                                    : 'border-mocha-surface2 focus:ring-mocha-green focus:border-transparent'
                            }`}
                        />
                        {errors.date && (
                            <p className="text-mocha-red text-sm mt-1">{errors.date}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-mocha-subtext1 text-sm font-medium mb-2">
                            Categoría
                        </label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => handleInputChange('categoryId', parseInt(e.target.value))}
                            className={`w-full p-3 bg-mocha-surface1 border rounded-lg text-mocha-text focus:outline-none focus:ring-2 transition-all ${
                                errors.categoryId 
                                    ? 'border-mocha-red focus:ring-mocha-red/50' 
                                    : 'border-mocha-surface2 focus:ring-mocha-green focus:border-transparent'
                            }`}
                        >
                            <option value={0}>Seleccionar categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="text-mocha-red text-sm mt-1">{errors.categoryId}</p>
                        )}
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="bg-mocha-red/20 border border-mocha-red rounded-lg p-3">
                            <p className="text-mocha-red text-sm">{errors.submit}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-mocha-surface2 hover:bg-mocha-overlay0 text-mocha-text font-medium py-3 px-4 rounded-lg transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-mocha-green hover:bg-mocha-teal disabled:bg-mocha-surface2 disabled:text-mocha-subtext0 text-mocha-base font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-mocha-base"></div>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Agregar Gasto
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

