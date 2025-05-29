import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const Checkout = () => {
    const { cart, clearCart } = useCart();

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        alert("Thank you for your order! Your sushi is on the way! 🍣");
        clearCart();
    };

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
                    border: "1px solid #ccc",
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
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Subtotal:</strong> ${(item.price * item.quantity). toFixed(2)}</p>
                </div>
            ))}
        </div>
        <div style={{ marginTop: "2rem "}}>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <button
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={handleCheckout}              
            >
                Confirm Order
            </button>
            <Link to="/cart" style={{ marginLeft: "1rem "}}>
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
                <span>←</span> Back to Cart
              </button>
            </Link> 
        </div>        
      </div>        
    );
};

export default Checkout;