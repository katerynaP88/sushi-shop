import { Link } from "react-router-dom";

function Header() {
    return (
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc"}}>
            <nav style={{ display: "flex", gap: "1rem"}}>
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/auth">Login</Link>
            </nav>
        </header>
    );
}

export default Header;