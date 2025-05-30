import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { useCart } from "../context/CartContext";
import { fetchProductById } from "../api/products";
import { type SushiItem } from "../types/cartTypes";
import { Link } from "react-router-dom";


const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<SushiItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, setShowCart } = useCart();


    useEffect(() => {
        async function fetchProduct() {   
             try {
                const localData = sushiData.find((dish) => dish.id === Number(id));
                if (!localData) {
                    setItem(null);
                    return;
                }

                const apiData = await fetchProductById(id!);
                setItem({
                    ...localData,
                    price: apiData.price ?? 10,
                } as SushiItem);
            } catch (err) {
                setError("Failed to fetch product");
            } finally { 
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-grae-600 p-4">Loading...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>
    if (!item) return <p className="text-red-500 p-4">Product not found</p>;

    return (
        <div className="p4 max-w-4x1 mx-auto">
            <h1 className="text-3 font-bold">{item.title}</h1>
            <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full max-w-md rounded-lg mt-4"
            />
            <p className="text-gray-600 mt-2">
                <strong>Category:</strong> {item.category}
            </p>
            <p className="text-orange-500 font-bold text-x1 mt-2">
                <strong>Price:</strong> ${item.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mt-2">
                <strong>Description:</strong> {item.description}
            </p>
            <p className="text-gray-600 mt-2">
                <strong>Ingredients:</strong> {item.ingredients.join(", ")}
            </p>
            <div className="flex gap-4 mt-4">
                <Link to="/menu">
                    <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                        <span>←</span> Back to Menu
                    </button>
                </Link>
                <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
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
            </button>                      
            </div>            
        </div>
    );
};


export default ProductPage;