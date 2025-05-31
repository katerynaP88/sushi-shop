import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../hooks/useSearch";
import { type SushiItem } from "../types/cartTypes";
import { useFetch } from "../hooks/useFetch";
import { Box, Typography, Container, TextField, IconButton, Grid, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Stack } from "@mui/material";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import TextDecreaseTwoTone from "@mui/icons-material/TextDecreaseTwoTone";



const Home = () => {
    const [meals, setMeals] = useState<SushiItem[]>([]);   
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const { addToCart, setShowCart } = useCart();    
    const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filteredItems } = useSearch(meals);
    
    const categories = ["Most Ordered", "Sushi", "Roll", "Soup", "Dessert"];
    
    const { data: productPrices, loading,error } = useFetch<any[]>("https://dummyjson.com/products");
    
    useEffect(() => {
        if (!productPrices) return;

        console.log("Product price from API:", productPrices);
        console.log("Sushi data length:", sushiData.length);

        const sushiMock = sushiData.map((dish, index) => ({
            ...dish,
            price: productPrices[index]?.price ?? 10,            
        }));

        setMeals(sushiMock as SushiItem[]);
    }, [productPrices]);

    if (error) return <p className="text-red-500">Failed to load sushi menu 😔</p>;
    if (loading) return <p className="text-gray-600">Loading sushi menu...</p>;
    
    return (
        <div className="p-4">
            <Box
  sx={{
    height: 250,
    backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2e_IFUOvw9nzdD45qUyATaSpRA8170E91Tg&s")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    px: 2,
  }}
>
  <Typography variant="h4" fontWeight="bold">
    Discover Our Sushi
  </Typography>
  <Typography variant="body1" mt={1}>
    Discover the freshest and most delicious sushi dishes made just for you.
  </Typography>
</Box>
            <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
  <IconButton onClick={() => document.querySelector('input')?.focus()}>
    <SearchIcon />
  </IconButton>
  <TextField
    fullWidth
    placeholder="Search for sushi..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    variant="outlined"
    size="small"
    sx={{ mx: 1 }}
  />
  <IconButton onClick={() => setShowCart(true)}>
    <ShoppingCartIcon />
  </IconButton>
</Container>         
            <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                flexWrap="wrap"
                mt={2}
            >
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "contained" : "outlined"}
                        color={selectedCategory === category ? "warning" : "inherit"}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </Stack>
            <Grid container spacing={2} mt={2}>
                {filteredItems.map((meal: SushiItem) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={meal.id}>
                        <Link to={`/product/${meal.id}`} style={{ textDecoration: "none" }}>
                            <Card 
                              onMouseEnter={() => setHoveredId(meal.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              sx={{
                                height: 360,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                border:
                                    hoveredId === meal.id ? "2px solid #ff9800" : "1px solid #e0e0e0",
                                    transition: "0.3s",
                                    "&:hover": {
                                        borderColor: "#ff9800",
                                    },
                              }}
                            >
                                <CardMedia
                                component="img"
                                image={meal.thumbnail}
                                alt={meal.title}
                                sx={{ height: 180, objectFit: "cover" }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" align="center" color="textPrimary">
                                        {meal.title}
                                    </Typography>
                                    <Typography variant="subtitle1" align="center" color="warning.main" fontWeight="bold">
                                        ${meal.price?.toFixed(2)}
                                    </Typography>
                                </CardContent>
                                {hoveredId === meal.id && (
                                    <CardActions sx={{ flexDirection: "column", alignItems: "center" }}>
                                        <Button variant="contained" color="inherit" size="small"
                                            onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart({
                                                id: meal.id,
                                                title: meal.title,
                                                thumbnail: meal.thumbnail,
                                                price: meal.price,
                                                quantity: 1,
                                            });
                                            setShowCart(true);
                                        }}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Typography variant="caption" color="textSecondary" mt={1}>
                                            <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
                                        </Typography>
                                    </CardActions>
                                )}
                            </Card>
                        </Link>
                    </Grid>                   
                ))}
            </Grid>            
        </div>
    );
};

export default Home;