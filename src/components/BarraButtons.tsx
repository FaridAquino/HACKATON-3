import { Album, Award } from "lucide-react";
import Button from "./Button";

export default function BarraButtons() {
    return (
        <div className="flex flex-col gap-8">
            <Button to="/auth/page1" icon={<Album />} />
            <Button to="/auth/page2" icon={<Award />} />
            <Button to="/auth/page3" icon={<Album />} />

        </div>
    );
}
