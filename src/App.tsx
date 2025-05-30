import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";
import CartIcon from "./components/CartIcon";
import CartPopup from "./components/CartPopup";


function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/menu" element={<Menu />} />    
          <Route path="/cart" element={<Cart />} />      
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <CartPopup />
      </BrowserRouter>
      <CartIcon onOpenCart={() => setShowCart(true)} />
        {showCart && <CartPopup onClose={() => setShowCart(false)} />}
    </CartProvider>
  );
}

export default App;