import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Box, Typography, Button, TextField, Tabs, Tab, Grid, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";



const Checkout = () => {
    const [tab, setTab] = useState(0);
    const { register, handleSubmit } = useForm();
    const { cart, clearCart } = useCart();  
    
    const handleCheckout = () => {
        alert("Thank you for your order! Your sushi is on the way! 🍣");
        clearCart();    
    };

    const onSubmit = (data: any) => {
     console.log(data);
     handleCheckout();
    };

    if (cart.items.length === 0) {
        return (
          <Box p={4}>
                <Typography variant="h4" gutterBottom>Checkout</Typography>
                <Typography>Your cart is empty. <Link to="/menu">Go to Menu</Link> to add items!</Typography>
            </Box>
        );
    }

    return (
        <Box p={4} sx={{ backgroundColor: 'black', color: 'white', minHeight: '80vh' }}>
            <Typography variant="h4" gutterBottom>Checkout</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} textColor="inherit" indicatorColor="primary">
                        <Tab label="New Customer" />
                        <Tab label="Registered Customer" />
                    </Tabs>
                    {tab === 0 && (
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                            <TextField fullWidth label="Name" {...register('name')} margin="normal" />
                            <TextField fullWidth label="Address" {...register('address')} margin="normal" />
                            <TextField fullWidth label="Phone" {...register('phone')} margin="normal" />
                            <TextField fullWidth label="Email" {...register('email')} margin="normal" />
                            <TextField fullWidth label="Payment Method" {...register('payment')} margin="normal" />
                                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Submit Order
                                </Button>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: 'white', color: 'black' }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Divider />
                        <List>
                            {cart.items.map((item, index) => (
                              <ListItem key={index}>
                                <ListItemText
                                    primary={item.name}
                                    secondary={`Quantity: ${item.quantity} | Price: €${item.price}`}
                                />
                              </ListItem>
                            ))}   
                        </List>
                        <Divider />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Total: €{cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;