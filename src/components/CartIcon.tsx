import { useCart } from "../context/CartContext";


const CartIcon = () => {
    const { cart, setShowCart } = useCart();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div 
          className="fixed bottom-5 right-5 bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer shadow-lg hover:bg-orange-600 transition"
          onClick={() => setShowCart(true)}
        >
            <span className="ttext-2x1 ext-white">🛒</span>
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex item-center justify-center text-xs">
                  {itemCount}  
                </span>
            )}
        </div>
    );
};

export default CartIcon;