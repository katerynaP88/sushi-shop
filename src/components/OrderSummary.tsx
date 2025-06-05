import { useCart } from '../context/CartContext';
import { Box, Typography, List, ListItem, Avatar, ListItemAvatar, Divider, ListItemText } from '@mui/material';


const OrderSummary = () => {
    const { cart } = useCart();

    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
   
    return (
        <Box 
            sx={{ padding: 2, backgroundColor: '#1e1e1e', borderRadius: 2, color: 'white', maxHeight: 400, minWidth: '300px', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                    <List>
                        {cart.items.map((item) => (
                            <ListItem key={item.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        src={item.thumbnail}
                                        alt={item.title}
                                        sx={{ width: 50, height: 50, mr: 2 }}
                                        variant="rounded"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${item.title} x${item.quantity}`}
                                    secondary={`€${(item.price * item.quantity).toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2, borderColor: 'gray' }} />
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Total: €{totalPrice.toFixed(2)}
                    </Typography>
        </Box>
    );
 };

export default OrderSummary;