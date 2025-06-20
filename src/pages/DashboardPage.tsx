import BarraButtons from "@components/BarraButtons";
import {
	TrendingUp,
	DollarSign,
	Target,
	Calendar,
	PiggyBank,
	CreditCard,
	Search,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-mocha-base text-mocha-text px-4 py-8">
			{/* Sidebar */}
			<div className="fixed inset-y-0 left-0 bg-mocha-surface0 w-[150px] p-6 rounded-r-lg shadow-lg flex flex-col items-center justify-between z-10">
				<BarraButtons />
			</div>

			{/* Main Content */}
			<div className="ml-[170px] max-w-6xl">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-mocha-text mb-2">
						¡Bienvenido a Ahorrista!
					</h1>
					<p className="text-lg text-mocha-subtext1">
						Controla tus gastos y alcanza tus metas financieras
					</p>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{/* Monthly Expenses */}
					<div className="bg-mocha-surface0 border border-mocha-surface1 rounded-xl p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="p-3 bg-mocha-red/20 rounded-lg">
									<CreditCard className="w-6 h-6 text-mocha-red" />
								</div>
								<h3 className="font-semibold text-mocha-text">
									Gastos del Mes
								</h3>
							</div>
						</div>
						<p className="text-2xl font-bold text-mocha-red mb-2">S/. ---.--</p>
						<p className="text-sm text-mocha-subtext0">Ver resumen detallado</p>
					</div>

					{/* Trending Category */}
					<div className="bg-mocha-surface0 border border-mocha-surface1 rounded-xl p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="p-3 bg-mocha-blue/20 rounded-lg">
									<TrendingUp className="w-6 h-6 text-mocha-blue" />
								</div>
								<h3 className="font-semibold text-mocha-text">
									Categoría Mayor
								</h3>
							</div>
						</div>
						<p className="text-2xl font-bold text-mocha-blue mb-2">---</p>
						<p className="text-sm text-mocha-subtext0">Mayor gasto del mes</p>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-mocha-text mb-6">
						Acciones Rápidas
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* View Summary */}
						<Link to="/logged/summary" className="group">
							<div className="bg-mocha-surface0 border border-mocha-surface1 hover:border-mocha-blue transition-all duration-200 rounded-xl p-6 cursor-pointer">
								<div className="flex items-center gap-4">
									<div className="p-4 bg-mocha-blue/20 rounded-lg group-hover:bg-mocha-blue/30 transition-colors">
										<DollarSign className="w-8 h-8 text-mocha-blue" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-mocha-text group-hover:text-mocha-blue transition-colors">
											Ver Resumen de Gastos
										</h3>
										<p className="text-mocha-subtext1">
											Analiza tus gastos por categoría
										</p>
									</div>
								</div>
							</div>
						</Link>

						{/* Detail Expenses*/}
						<Link to="/logged/expenses" className="group">
							<div className="bg-mocha-surface0 border border-mocha-surface1 hover:border-mocha-green transition-all duration-200 rounded-xl p-6 cursor-pointer group">
								<div className="flex items-center gap-4">
									<div className="p-4 bg-mocha-green/20 rounded-lg group-hover:bg-mocha-green/30 transition-colors">
										<Search className="w-8 h-8 text-mocha-green" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-mocha-text group-hover:text-mocha-green transition-colors">
											Gastos Detallados
										</h3>
										<p className="text-mocha-subtext1">
											Registra y gestiona tus gastos
										</p>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
