import BarraButtons from "@components/BarraButtons";
export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg">Bienvenido al panel de control.</p>
            <p className="text-sm text-gray-500 mt-2">
                Aquí puedes ver tus estadísticas y administrar tu cuenta.
            </p>
            {/* Barra de tareas en columna, esquina izquierda */}
            <div className="fixed inset-y-0 left-0 bg-gray-100 w-[150px] p-6 rounded-r-lg shadow flex flex-col items-center justify-between">
                <BarraButtons />
            </div>
        </div>
    );
}