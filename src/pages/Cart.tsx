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
                    borderRadius: "10px",
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
                  <p><strong>Quantity:</strong> ${item.quantity}</p>
                </div>
            ))}
            </div>
            <Link to="/menu">Go to Menu</Link>
        </div>
    );
};

export default Cart;