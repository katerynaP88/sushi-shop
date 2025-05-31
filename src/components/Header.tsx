import React, { useState } from "react";
import { Drawer, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./CartPopup"; 

const Header = () => {
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <>
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <IconButton color="inherit" onClick={toggleCart}>
          <Badge color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </header>

      <Drawer anchor="right" open={openCart} onClose={toggleCart}>
        <div style={{ width: 400, padding: "1rem" }}>
          <Cart onClose={toggleCart} />
        </div>
      </Drawer>
    </>
  );
};

export default Header;