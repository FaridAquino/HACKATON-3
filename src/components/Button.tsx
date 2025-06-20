import { useNavigate } from "react-router-dom";

interface ButtonProps {
    to: string;
    icon: React.ReactNode;
}


export default function Button(props: ButtonProps) {
    const navigate = useNavigate();
    const isActive = window.location.pathname === props.to;

    return (
        <button
            className={`p-4 rounded-xl transition-all duration-200 ${
                isActive 
                    ? 'bg-mocha-blue text-mocha-base shadow-lg' 
                    : 'bg-mocha-surface1 text-mocha-subtext0 hover:bg-mocha-surface2 hover:text-mocha-text'
            }`}
            onClick={() => navigate(props.to)}
        >
            <div className="w-6 h-6">
                {props.icon}
            </div>
        </button>
    );
}
