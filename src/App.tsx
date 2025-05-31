import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartDrawer from './components/CartDrawer';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



function App() {  
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <Router>
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <IconButton color="primary" onClick={() => setCartOpen(true)}>
          <ShoppingCartIcon />
        </IconButton>
      </header>

      <CartDrawer open={isCartOpen} onClose={() => setCartOpen(false)} />

      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<Checkout />} />
              </Routes>
    </Router>
  );
}

export default App;