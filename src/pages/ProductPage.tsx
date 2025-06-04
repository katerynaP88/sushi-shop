import { useParams, Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { useCart } from "../context/CartContext";
import { fetchProductById } from "../api/products";
import { type SushiItem } from "../types/cartTypes";
import { Container, Typography, Box, Grid, Button, Card, CardMedia, CardContent, Stack } from "@mui/material";



const ProductPage = () => {
    const { id } = useParams<{ id?: string }>();
    const [item, setItem] = useState<SushiItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, setShowCart } = useCart();


    useEffect(() => {
        async function fetchData() {   
             try {
                if (!id) throw new Error("Product ID is missing");
                const localData = sushiData.find((dish) => dish.id === Number(id));
                if (!localData) {
                    setItem(null);
                    throw new Error("Product not found in local data");
                }
                const apiData = await fetchProductById(id);
                setItem({
                    ...localData,
                    price: apiData.price ?? 10,
                } as SushiItem);
                } catch (err) {
                    setError("Failed to fetch product");
                    console.error(err);
                } finally { 
                    setLoading(false);
                }
            }
            fetchData();
        }, [id]);

        if (loading) return <p className="text-grae-600 p-4">Loading...</p>;
        if (error) return <p className="text-red-500 p-4">{error}</p>
        if (!item) return <p className="text-red-500 p-4">Product not found</p>;

        return (
            // <Container maxWidth="md" sx={{ py: 4 }}>
            //     <Grid container spacing={4}>
            //         <Grid item xs={12} md={5}>
            //             <Box
            //                 component="img"
            //                 src={item.thumbnail}
            //                 alt={item.title}
            //                 sx={{
            //                 width: "100%",
            //                 maxHeight: 200,
            //                 objectFit: "cover",
            //                 borderRadius: 2,
            //                 }}
            //             />
            //         </Grid>
            //         <Grid item xs={12} md={7}>
            //             <Typography variant="h4" gutterBottom>
            //                 {item.title}
            //             </Typography>
            //             <Typography variant="h6" color="primary" gutterBottom>
            //                 ${item.price.toFixed(2)}
            //             </Typography>
            //             <Typography variant="body1" sx={{ mb: 2 }}>
            //                 <strong>Description:</strong> {item.description}
            //             </Typography>
            //             <Typography variant="body1" sx={{ mb: 2 }}>
            //                <strong>Ingredients:</strong> {item.ingredients.join(", ")} 
            //             </Typography>
            //             {item.nutrition && (
            //                 <Box sx={{ mb: 2 }}>
            //                     <Typography variant="body1">
            //                         <strong>Nutrition Facts:</strong>
            //                     </Typography>
            //                     <Typography variant="body2">Calories: {item.nutrition.calories}</Typography>
            //                     <Typography variant="body2">Protein: {item.nutrition.protein}</Typography>
            //                     <Typography variant="body2">Fat: {item.nutrition.fat}</Typography>
            //                     <Typography variant="body2">Carbs: {item.nutrition.carbs}</Typography>
            //                 </Box>
            //             )}
            //             <Stack direction="row" spacing={2} mt={2}>
            //                 <Button
            //                     variant="outlined"
            //                     component={Link}
            //                     to="/menu"
            //                     color="inherit"
            //                 >
            //                     ← Back to Menu
            //                 </Button>
            //                 <Button
            //                     variant="contained"
            //                     color="primary"
            //                     onClick={() => {
            //                         addToCart({
            //                         id: item.id,
            //                         title: item.title,
            //                         thumbnail: item.thumbnail,
            //                         price: item.price,
            //                         quantity: 1,
            //                         });
            //                         setShowCart(true);
            //                     }}
            //                 >
            //                     Add to Cart
            //                 </Button>
            //             </Stack>
            //         </Grid>
            //     </Grid>
            // </Container>
            <Container maxWidth="md" sx={{ py: 4 }}>
                 <Card >
                    <CardMedia
                        component="img"
                        height="300"
                        image={item.thumbnail}
                        alt={item.title}
                        sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {item.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Category:</strong> {item.category}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                            <strong>Price:</strong> ${item.price.toFixed(2)}
                         </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Description:</strong> {item.description}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Ingredients:</strong> {item.ingredients.join(", ")}
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/menu"
                                color="inherit"
                            >
                                ← Back to Menu
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                addToCart({
                                id: item.id,
                                title: item.title,
                                thumbnail: item.thumbnail,
                                price: item.price,
                                quantity: 1,
                                });
                                setShowCart(true);
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Stack>
                    </CardContent>
                </Card> 
            </Container>
        );
    };


export default ProductPage;