import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { cart, setShowCart } = useCart();
    const { setShowAuthModal } = useAuth();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="p-4 bg-white shadow-md flex justify-between items-center">
            <div className="text-2x1 font-bold text-orange-500">
                <Link to="/">Sushi Shop</Link>
            </div>
            <nav className=" flex items-center gap-4">
                <Link to="/menu" className="text-black hover:text-orange-500">
                    Menu
                </Link>  
                <button className="text-2x1 text-black hover:text-orange-500"
                onClick={() => setShowCart(true)}
                >
                    🛒 {itemCount > 0 && <span className="text-sm text-red-500">
                    {itemCount}</span>}
                </button>
                <button className="text-2x1 text-black hover:text-orange-500" onClick={() => setShowAuthModal(true)}>🙎🏻‍♂️</button> 
                <button className="text-2x1 text-black hover:text-orange-500">🔍</button>       
            </nav>
        </header>
    );
}

export default Header;