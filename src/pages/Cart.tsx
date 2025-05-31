import React from 'react';
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.items.length === 0) {
        return (
            <Box p={4}>
              <Typography variant="h4" gutterBottom>Your Cart</Typography>
              <Typography>Your cart is empty. <Link to="/menu">Go to Menu</Link> to add items!</Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
              <Typography variant="h4" gutterBottom>Your Cart</Typography>
              <Grid container spacing={2}>
                  {cart.items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Box
                        bgcolor="#fff5ee"
                        borderRadius={2}
                        p={2}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          style={{ width: "100%", borderRadius: "8px", marginBottom: '1rem' }}
                        />
                        <Typography  variant="h6">{item.title}</Typography>
                        <Typography><strong>Price:</strong> ${item.price.toFixed(2)}</Typography>
                        <Typography><strong>Quantity:</strong> (item.quantity)</Typography>
                        <Box mt={1} display="flex" gap={1}>
                          <Button variant="contained" size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                          <Button variant="contained" size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                          <Button variant="contained" size="small" color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </Box>                        
                      </Box>
                    </Grid>
                ))}
              </Grid>
              <Box mt={4}>
                <Typography variant="h6"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Typography>
                <Box mt={2} display="flex" gap={2}>
                    <Button variant="contained" color="error" onClick={clearCart}>
                        Clear Cart
                    </Button>
                    <Link to="/checkout" style={{ textDecoration: "none"}}>
                        <Button variant="contained" color="primary">
                            Proceed to Checkout
                        </Button>
                    </Link>
                </Box>
              </Box>
            </Box>               
            );
          };
          

export default Cart;
