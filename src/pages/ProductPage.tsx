import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { useCart } from "../context/CartContext";

type SushiItem = {
    id: number
    title: string;
    thumbnail: string;
    description: string;
    category: string;
    price: number;
};

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<SushiItem | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();

                const localData = sushiData.find((dish) => dish.id === Number(id));
                console.log("API data:", data);
                console.log("Local data:", localData);

                if (!localData) {
                    setItem(null);
                    return;
                }


                const sushiItem: SushiItem = {
                    id: data.id,
                    title: localData.title,
                    thumbnail: localData.thumbnail,
                    category: localData.category,
                    description: localData.description,
                    price: data.price,                  
                };

                setItem(sushiItem);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally { 
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!item) return <p>Product not found</p>;

    const handleAddToCart = () => {
        console.log("Adding to cart:", {
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            quantity: 1,
        });
        addToCart({
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            quantity: 1,
        });
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>{item.title}</h1>
            <img src={item.thumbnail} alt={item.title} width="300" />
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong>{item.price}</p>
            <p><strong>Description:</strong>{item.description}</p>

            <button 
              style={{
                padding: "1rem 2rem",
                marginTop: "1rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
            }}
            onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};


export default ProductPage;