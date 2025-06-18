import { useNavigate } from "react-router-dom";

interface ButtonProps {
    to: string;
    icon: React.ReactNode;
}


export default function Button(props: ButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            className="bg-slate-300 p-3 rounded-lg hover:bg-slate-400 transition-all"
            onClick={() => navigate(props.to)}
        >
            {props.icon}
        </button>
    );
}