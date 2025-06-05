import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Select, MenuItem, InputLabel, FormControl, Box, Typography, Button, TextField, Grid, Paper} from "@mui/material";
import OrderSummary from "../components/OrderSummary";
import { Link } from "react-router-dom";


const Checkout = () => {
    const { cart, clearCart } = useCart(); 
    const { register, handleSubmit, formState: { errors }, } = useForm(); 
   
    const onSubmit = (data: any) => {
     console.log("Order Data:", data);
     alert("Thank you for your order! Your sushi is on the way! 🍣");
     clearCart();
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
            <Grid container spacing={4} alignItems="flex-start"> 
                <Grid item xs={12} md={6} lg={7}>
                    <Paper sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                label="Name"
                                {...register("name", { required: "Name is required" })}
                                error={!!errors.name}
                                helperText={errors.name?.message as string}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                {...register("address", { required: "Address is required" })}
                                error={!!errors.address}
                                helperText={errors.address?.message as string}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                {...register("phone", { required: "Phone is required" })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message as string}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message as string}
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal" error={!!errors.payment}>
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    defaultValue=""
                                    label="Payment Method"
                                    {...register("payment", { required: "Payment method is required" })}
                                >
                                    <MenuItem value="cash">Cash</MenuItem>
                                    <MenuItem value="card">Card</MenuItem>
                                    <MenuItem value="paypal">PayPal</MenuItem>
                                </Select>
                            </FormControl>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBackIcon />}
                                    component={Link}
                                    to="/cart"
                                >
                                    Back to Cart
                                </Button>
                                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Submit Order
                                </Button>
                            </Box>                     
                            
                        </form>
                    </Paper> 
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <OrderSummary />                    
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;