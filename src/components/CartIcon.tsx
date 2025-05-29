import { useCart } from "../context/CartContext";

type CartIconProps = {
    onOpenCart: () => void;      
};

const CartIcon = ({ onOpenCart }: CartIconProps) => {
    const { cart } = useCart();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#f28c38",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
           justifyContent: "center",
           alignItems: "center",
           cursor: "pointer",
           boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          }}
          onClick={onOpenCart}
        >
            <span style={{ fontSize: "1.5rem", color: "#fff" }}>🛒</span>
            {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "#ff4d4d",
                    color: "fff",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  {itemCount}  
                </span>
            )}
        </div>
    );
};

export default CartIcon;