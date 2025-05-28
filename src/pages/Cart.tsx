import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity,
        0
    );

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
                  <div style={{ display: "flex", gap: "0.rem", marginTop: "0.5rem" }}>
                    <button
                      style={{
                        padding: "0.5rem",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                        -
                    </button>
                    <button
                       style={{
                        padding: "0.5rem",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                       }}
                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                    <button
                        style={{
                        padding: "0.5rem",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        }}
                        onClick={() => removeFromCart(item.id)}
                    >
                        Remove
                    </button>
                  </div>
                </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <button 
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "1rem",
              }}
              onClick={clearCart}
            >
                Clear Cart
            </button>
            <Link to="/checkout">
              <button
                style={{
                padding: "1rem 2rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",                
              }}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>          
        </div>
    );
};

export default Cart;