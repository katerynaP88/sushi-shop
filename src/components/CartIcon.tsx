import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../context/CartContext";


const CartIcon = () => {
    const { cart, setShowCart } = useCart();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Box
            position="fixed"
            bottom={16}
            right={16}
            zIndex={1300}
            onClick={() => setShowCart(true)}
        >
          <Badge
              badgeContent={itemCount}
              color="error"
              invisible={itemCount === 0}
          >            
            <Fab color="warning" size="large" sx={{ boxShadow: 4 }}>
                 <ShoppingCartIcon sx={{ color: 'white' }} />
            </Fab>
          </Badge>
        </Box>
    );
};

export default CartIcon;