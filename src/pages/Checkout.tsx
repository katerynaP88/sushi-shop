import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";


const Checkout = () => {
    const { cart, clearCart } = useCart();

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
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
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Checkout</Typography>
            <Typography variant="h5" gutterBottom>Your Order</Typography>
            <Grid container spacing={2}>
                {cart.items.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Box
                            bgcolor="#fff5ee"
                            borderRadius={2}
                            p={2}
                            border="1px solid #ccc"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
                            />
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography><strong>Price:</strong> ${item.price.toFixed(2)}</Typography>
                            <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                            <Typography><strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box mt={4} display="flex" alignItems="center" gap={2}>
                <Typography variant="h6"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Typography>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                    Confirm Order
                </Button>
                <Link to="/cart" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="primary">
                        ← Back to Cart
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Checkout;