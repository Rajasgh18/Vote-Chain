import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 h-14 backdrop-blur-xl z-[999] w-full px-20 flex items-center justify-between">
            <div className="flex items-center space-x-1">
                <img src="/blockchain.png" className="h-10 w-10" />
                <h3 className="bg-gradient-to-l from-blue-400 to-blue-500 bg-clip-text text-transparent">Vote Chain</h3>
            </div>
            <button onClick={() => navigate('/login')} className="text-white ">Login</button>
        </nav>
    );
};