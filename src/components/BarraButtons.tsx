import { Home, DollarSign, Target, Search } from "lucide-react";
import Button from "./Button";

export default function BarraButtons() {
    return (
        <div className="flex flex-col gap-4">
            <Button to="/logged/dashboard" icon={<Home />} />
            <Button to="/logged/summary" icon={<DollarSign />} />
            <Button to="/logged/expenses" icon={<Search />} />
        </div>
    );
}
