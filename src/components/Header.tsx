import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { cart, setShowCart } = useCart();
    const { setShowAuthModal } = useAuth();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header>
            <div>
                <Link to="/">Home</Link>
            </div>
          
        </header>
    );
}

export default Header;