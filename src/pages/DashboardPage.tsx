import BarraButtons from "@components/BarraButtons";
export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Barra lateral fija */}
            <aside className="w-48 bg-white shadow-md p-4 fixed inset-y-0 left-0 z-10">
                <h2 className="text-xl font-semibold mb-6 text-center">Menú</h2>
                <BarraButtons />
            </aside>

            {/* Contenido principal */}
            <main className="ml-48 flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-6">
                    Bienvenido al panel de control. Aquí puedes consultar tus estadísticas, revisar tus gastos y más.
                </p>

                {/* Secciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bloque 1: Resumen rápido */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Resumen general</h2>
                        <p className="text-gray-600">Gastos del mes, ingresos y balance.</p>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Total gastos: S/. 450.00</p>
                            <p className="text-sm text-gray-500">Ingresos: S/. 1200.00</p>
                            <p className="text-sm text-gray-500 font-bold">Balance: S/. 750.00</p>
                        </div>
                    </div>

                    {/* Bloque 2: Últimos movimientos */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Últimos gastos</h2>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                            <li>Transporte - S/. 12.00</li>
                            <li>Alimentación - S/. 25.50</li>
                            <li>Vivienda - S/. 300.00</li>
                        </ul>
                    </div>

                    {/* Bloque 3: Atajos */}
                    <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Accesos rápidos</h2>
                        <div className="flex gap-4">
                            <a
                                href="/logged/expenses"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Ver mis gastos
                            </a>
                            <a
                                href="/logged/summary"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Ver resumen
                            </a>
                            <a
                                href="/logged/page1"
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                            >
                                Otras funciones
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

}