import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const Checkout = () => {
    const { cart } = useCart();

    return (
        <div style={{ padding: "2rem" }}>
        <h1>Checkout</h1>
        <p>Item to checkout: {cart.items.length}</p>
        <Link to="/cart">Back to Cart</Link>  
        </div>        
    );
};

export default Checkout;