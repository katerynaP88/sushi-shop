import React from 'react';
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.items.length === 0) {
        return (
            <Box p={4} sx={{ backgroundColor: 'black', color: 'white', minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom>Your Cart</Typography>
        <Typography>Your cart is empty. <Link to="/menu" style={{ color: '#90caf9' }}>Go to Menu</Link> to add items!</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ backgroundColor: 'black', color: 'white', minHeight: '80vh' }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.items.map((item) => (
        <Box key={item.id} display="flex" alignItems="center" mb={2} sx={{ borderBottom: '1px solid #444', pb: 2 }}>
          <Box
            component="img"
            src={item.thumbnail}
            alt={item.title}
            sx={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              borderRadius: 2,
              marginRight: 2,
            }}
          />
          <Box flex="1">
            <Typography variant="h6">{item.title}</Typography>
            <Typography>Price: ${item.price.toFixed(2)}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Button variant="contained" size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
              <Typography mx={2}>{item.quantity}</Typography>
              <Button variant="contained" size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
            </Box>
          </Box>
          <IconButton onClick={() => removeFromCart(item.id)} color="error" aria-label="remove item">
            <CloseIcon />
          </IconButton>
        </Box>
      ))}

      <Divider sx={{ my: 2, borderColor: '#555' }} />

      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={clearCart}
            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
    );
  };
          

export default Cart;


