import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
    const { cart } = useCart();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc"}}>
            <nav style={{ display: "flex", gap: "1rem"}}>
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/cart">Cart ({itemCount})</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default Header;