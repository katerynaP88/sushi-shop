import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"
import CartPopup from "./components/CartPopup";
import AuthModal from "./components/AuthModal";


function App() {  
  return (
    <AuthProvider>
        <CartProvider>
            <BrowserRouter>
                <Header />
                <AuthModal />
                <CartPopup />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Home />} /> 
                    <Route path="/product/:id" element={<ProductPage />} />                       
                    <Route path="/cart" element={<Cart />} />      
                    <Route path="/checkout" element={<Checkout />} />          
                </Routes>
            </BrowserRouter>      
        </CartProvider>
    </AuthProvider>
  );
}

export default App;