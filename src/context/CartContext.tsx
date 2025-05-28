import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type CartItem, type CartState } from '../types/cartTypes'

interface CartContextType {
    cart: CartState;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartState>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : { items: [] };
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: prev.items.map((i) => 
                      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...prev.items, { ...item, quantity: 1 }] };
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => ({
            items: prev.items.filter((i) => i.id !== id),
        }));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart((prev) => ({
            items: prev.items.map((i) => (i.id === id ? { ...i, quantity } : i )),
        }));
    };

    const clearCart = () => {
        setCart({ items: [ ] });
    };

    return (
        <CartContext.Provider
          value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
          >
            {children}
          </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};