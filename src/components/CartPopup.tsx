import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const CartPopup = () => {
    const { cart, removeFromCart, updateQuantity, showCart, setShowCart } = useCart();

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (!showCart) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md max-h-[80vh] overflou-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2x1 font-bold">Your Cart</h2>
              <button
                  className="text-gray-500 hover:text-grey-700"
                  onClick={() => setShowCart(false)}
              >
                  ⨉
              </button>
            </div>                
            {cart.items.length === 0 ? (
                <div>
                  <p className="text-gray-600">Your cart is empty.</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    onClick={() => setShowCart(false)}
                  >
                    Close
                  </button>
                </div>
            ) : (                    
                <>
                  {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center mb-4">                                              
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-24 h-24 rounded-lg mr-4 object-cover"
                        />
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold">{item.title}</h4>
                                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                      className="px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <button
                                      className="px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
                    <div className="flex gap-4 mt-4">
                      <Link to="/cart">
                        <button
                          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                            Go to Cart
                        </button>
                      </Link>
                      <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={() => setShowCart(false)}
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