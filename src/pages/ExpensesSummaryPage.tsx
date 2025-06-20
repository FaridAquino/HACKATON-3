import BarraButtons from "@components/BarraButtons";
import AddExpenseModal from "@components/AddExpenseModal";
import SummaryResponse from "@interfaces/expenses/SummaryRespone";
import { getSummary } from "@services/getSummary";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, DollarSign, Calendar, Plus } from "lucide-react";

export default function ExpensesSummaryPage() {
	const [formData, setFormData] = useState<SummaryResponse[]>([]);
	const [loading, setLoading] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const navigate = useNavigate();
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;

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

	const handleCategoryClick = (categoryId: number) => {
		navigate(
			`/logged/expenses?categoryId=${categoryId}&year=${currentYear}&month=${currentMonth}`,
		);
	};

	const totalAmount = formData.reduce(
		(sum, expense) => sum + expense.amount,
		0,
	);

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
					<div className="flex items-center gap-3 mb-4">
						<DollarSign className="w-8 h-8 text-mocha-green" />
						<h1 className="text-3xl font-bold text-mocha-text">
							Resumen de Gastos
						</h1>
					</div>
					<div className="flex items-center gap-2 text-mocha-subtext1">
						<Calendar className="w-5 h-5" />
						<p>
							{new Date().toLocaleDateString("es-PE", {
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
				</div>

				{/* Total Summary Card */}
				<div className="bg-mocha-surface0 border border-mocha-surface1 rounded-xl p-6 mb-6">
					<h2 className="text-lg font-semibold text-mocha-subtext1 mb-2">
						Total del Mes
					</h2>
					<p className="text-4xl font-bold text-mocha-red">
						S/. {totalAmount.toFixed(2)}
					</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mocha-blue"></div>
					</div>
				)}

				{/* Categories List */}
				{!loading && (
					<div className="space-y-4">
						{formData.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-mocha-subtext0 text-lg">
									No hay gastos registrados este mes
								</p>
								<p className="text-mocha-subtext1 text-sm mt-2">
									¡Comienza registrando tu primer gasto!
								</p>
							</div>
						) : (
							<>
								<h2 className="text-xl font-semibold text-mocha-text mb-4">
									Gastos por Categoría
								</h2>
								{formData.map((expense) => (
									<div
										key={expense.id}
										onClick={() =>
											handleCategoryClick(expense.expenseCategory.id)
										}
										className="bg-mocha-surface0 border border-mocha-surface1 hover:border-mocha-blue transition-all duration-200 rounded-xl p-6 cursor-pointer group"
									>
										<div className="flex justify-between items-center">
											<div>
												<h3 className="text-lg font-semibold text-mocha-text group-hover:text-mocha-blue transition-colors">
													{expense.expenseCategory.name}
												</h3>
												<p className="text-mocha-subtext1 text-sm">
													{expense.year} -{" "}
													{expense.month.toString().padStart(2, "0")}
												</p>
												<div className="mt-2">
													<div className="w-full bg-mocha-surface1 rounded-full h-2">
														<div
															className="bg-mocha-red h-2 rounded-full transition-all duration-300"
															style={{
																width: `${Math.min((expense.amount / totalAmount) * 100, 100)}%`,
															}}
														></div>
													</div>
													<p className="text-xs text-mocha-subtext0 mt-1">
														{((expense.amount / totalAmount) * 100).toFixed(1)}%
														del total
													</p>
												</div>
											</div>
											<div className="flex items-center gap-3">
												<p className="text-2xl font-bold text-mocha-red">
													S/. {expense.amount.toFixed(2)}
												</p>
												<ChevronRight className="w-5 h-5 text-mocha-subtext0 group-hover:text-mocha-blue transition-colors" />
											</div>
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
						// Refresh summary after adding expense
						handleSubmit();
					}}
				/>
			</div>
		</div>
	);
}
