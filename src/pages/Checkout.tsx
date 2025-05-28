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
        <h2>Your Order</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
            {cart.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px",
                    padding: "1rem",
                    backgroundColor: "#fff5ee",
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <h3>{item.title}</h3>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Subtotal:</strong> ${(item.price * item.quantity). toFixed(2)}</p>
                </div>
            ))}
        </div>
        <Link to="/cart">Back to Cart</Link>  
      </div>        
    );
};

export default Checkout;