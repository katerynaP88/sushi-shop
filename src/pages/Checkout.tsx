import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const Checkout = () => {
    const { cart } = useCart();

    if (cart.items.length === 0) {
        return (
          <div style={{ padding: "2rem" }}>
            <h1>Checkout</h1>
            <p>Your cart is empty. <Link to="/menu">Go to Menu</Link> to add items!</p>         
          </div>        
        );
    }

    return (
        <div style={{ padding: "2rem" }}>
        <h1>Checkout</h1>
        <p>Item to checkout: {cart.items.length}</p>
        <Link to="/cart">Back to Cart</Link>  
        </div>        
    );
};

export default Checkout;