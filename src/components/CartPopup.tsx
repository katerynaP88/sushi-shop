import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

type CartPopupProps = {
    onClose: () => void;    
};

const CartPopup = ({ onClose }: CartPopupProps) => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return(
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
            <div 
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "10px",
                maxWidth: "500px",
                width: "90%",
                maxHeight: "80vh",
                overflowY: "auto",
                }}
            >
                <h2>Your Cart</h2>
                {cart.items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (                    
                  <>
                    {cart.items.map((item) => (
                        <div
                        key={item.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                        >
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              style={{ width: "80px", borderRadius: "8px", marginRight: "1rem"}}
                            />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: "0 "}}>{item.title}</h4>
                                <p style={{ margin: "0.25rem 0"}}>${item.price.toFixed(2)} x {item.quantity}</p>
                                <div style={{ display: "Flex", gap: "0.5rem" }}>
                                    <button
                                      style={{
                                        padding: "0.25rem 05rem",
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",                                
                                      }}
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <button
                                      style={{
                                        padding: "0.25rem 05rem",
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",                                
                                      }}
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                      style={{
                                        padding: "0.25rem 05rem",
                                        backgroundColor: "#ff4d4d",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",                                
                                      }}
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                    <div style={{ display: "flex", gap: "1rem", margiTop: "1rem" }}>
                      <Link to="/cart">
                        <button
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                          }}
                        >
                          Go to Cart
                        </button>
                      </Link>
                      <button
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#ccc",
                          color: "#000",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        onClick={onClose}
                      >
                        Close                          
                      </button>     
                    </div>
                  </>
                )}
            </div>
        </div>
    );
};


export default CartPopup;