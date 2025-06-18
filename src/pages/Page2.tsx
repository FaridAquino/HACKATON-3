import BarraButtons from "@components/BarraButtons";

export default function Page2() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Page 2</h1>
            <p>This is the content of Page 2.</p>
            <div className="fixed inset-y-0 left-0 bg-gray-100 w-[150px] p-6 rounded-r-lg shadow flex flex-col items-center justify-between">
                <BarraButtons />
            </div>
        </div>
    );
}