import BarraButtons from "@components/BarraButtons";

export default function Page3() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Page 3</h1>
            <p>This is the content of Page 3.</p>
            <div className="fixed inset-y-0 left-0 bg-gray-100 w-[150px] p-6 rounded-r-lg shadow flex flex-col items-center justify-between">
                <BarraButtons />
            </div>
        </div>
    );
}