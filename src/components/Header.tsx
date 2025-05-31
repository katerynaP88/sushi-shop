import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

function Header() {
    const { cart, setShowCart } = useCart();
    const { setShowAuthModal } = useAuth();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left section: Logo or site name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Home
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/menu"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Menu
          </Typography>
        </Box>

        {/* Right section: Cart & Auth */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={() => setShowCart(true)}>
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<LoginIcon />}
            onClick={() => setShowAuthModal(true)}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    );
}

export default Header;