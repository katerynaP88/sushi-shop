import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Modal, Box, Typography, Button, IconButton, Stack, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const CartPopup = () => {
    const { cart, removeFromCart, updateQuantity, showCart, setShowCart } = useCart();

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (!showCart) return null;

    return(
        <Modal open={showCart} onClose={() => setShowCart(false)}>
          <Box sx={modalStyle}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
                 Your Cart
            </Typography>
            <IconButton onClick={() => setShowCart(false)}>
              <CloseIcon />
            </IconButton>
              </Stack>
              {cart.items.length === 0 ? (
                <>
              <Typography color="text.secondary">Your cart is empty.</Typography>
              <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => setShowCart(false)}
              >
                Close
              </Button>
                 </>
            ) : (
                 <>
                {cart.items.map((item) => (
                <Box key={item.id} display="flex" gap={2} mb={2} alignItems="center">
                    <Box
                        component="img"
                        src={item.thumbnail}
                        alt={item.title}
                        sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover" }}
                    />
                    <Box flex={1}>
                      <Typography fontWeight="bold">{item.title}</Typography>
                      <Typography color="text.secondary">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          + 
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                       </Button>
                      </Stack>
                    </Box>
                  </Box>
                ))}
                
                <Divider sx={{ my: 2 }} />
                <Typography fontWeight="bold" variant="subtitle1">
                    Total: ${totalPrice.toFixed(2)}
                </Typography>

                <Stack direction="row" spacing={2} mt={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/cart"
                        onClick={() => setShowCart(false)}
                    > 
                      Go to Cart
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setShowCart(false)}
                    >
                      Close
                    </Button>
                  </Stack>
                </>
              )}
          </Box>
      </Modal>
    );
};


export default CartPopup;