import React from 'react';
import { Drawer, Box, Typography, Button, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: Props) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={350} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {cart.items.length === 0 ? (
          <Typography>Your cart is empty. <Link to="/menu">Go to Menu</Link></Typography>
        ) : (
          <>
            {cart.items.map(item => (
              <Box key={item.id} mb={2} bgcolor="#fff5ee" p={1} borderRadius={1}>
                <img src={item.thumbnail} alt={item.title} style={{ width: '100%', borderRadius: 8 }} />
                <Typography>{item.title}</Typography>
                <Typography variant="body2"><strong>Price:</strong> ${item.price.toFixed(2)}</Typography>
                <Typography variant="body2"><strong>Quantity:</strong> {item.quantity}</Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Button size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <Button size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button size="small" color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography><strong>Total:</strong> ${totalPrice.toFixed(2)}</Typography>

            <Box mt={2} display="flex" flexDirection="column" gap={1}>
              <Button variant="contained" color="error" onClick={clearCart}>Clear Cart</Button>
              <Link to="/checkout" onClick={onClose} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" fullWidth>Proceed to Checkout</Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;