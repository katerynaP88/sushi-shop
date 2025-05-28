import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const Cart = () => {
    const { cart } = useCart();

    if (cart.items.length === 0) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Your Cart</h1>
                <p>Your cart is empty. <Link to="/menu">Go to Menu</Link> to add items!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Your Cart</h1>
            <p>Items in your cart: {cart.items.length}</p>
            <Link to="/menu">Go to Menu</Link>
        </div>
    );
};

export default Cart;