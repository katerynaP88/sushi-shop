import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../hooks/useSearch";
import { type SushiItem } from "../types/cartTypes";
import { useFetch } from "../hooks/useFetch";



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
            <div 
                className="h-64 bg-cover bg-center flex flex-col justify-center items-center text-white"
                style={{ backgroundImage: `url(/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2e_IFUOvw9nzdD45qUyATaSpRA8170E91Tg&s")`}}
            >
                <h1 className="text-4x1 font-bold">Discover Our Sushi</h1>
                <p className="text-x1 mt-2">Discover the freshest and most delicious sushi dishes made just for you.</p>
            </div>
            <div className="mt-6 flex items-center max-w-md mx-auto">
               <span 
                    className="text-2x1 mr-2 cursor-pointer hover:text-orange-500"
                    onClick={() => document.querySelector("input")?.focus()}
                    >
                      🔍
                </span>
                <input
                  type="text"
                  placeholder="Search for sushi..."
                  value={searchQuery}
                  onChange={ (e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span
                    className="text-2xl ml-2 cursor-pointer hover:text-orange-500"
                    onClick={() => setShowCart(true)}
                >
                    🛒
                </span>                
            </div>            
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
                {categories.map((category) => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-orange-500 text-white" : "bg-black text-white hover:bg-gray-800"}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="mt-6 grid grid-colos-1 sm:grid-colos-2 md:grid-colos-3 lg:grid-colos-4 gap-4 justify-items-center">
                {filteredItems.map((meal: SushiItem) => (
                    <Link to={`/product/${meal.id}`} 
                      key={meal.id}
                      className="no-underline w-64">
                        <div 
                            className={`p-4 bg-white rounded-lg shadow-lg hover:border-2 hover:border-orange-500 transition-all duration-300 h-[360px] flex flex-col justify-between ${hoveredId === meal.id ? "border-2 border-orange-500" : ""}`}                         
                            onMouseEnter={() => setHoveredId(meal.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <img
                                src={meal.thumbnail}
                                alt={meal.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-center text-black mt-2">
                                    {meal.title}
                                </h3>                                                                              
                                <p className="text-orange-500 font-bold text-center text-x1"> 
                                    ${meal.price !== undefined ? `$${meal.price.toFixed(2)}` : "Price not available"}
                                </p>
                            </div>
                            {hoveredId === meal.id && (
                                <div className="text-center mt-2">
                                    <button
                                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
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
                                    </button>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <strong>Ingredients:</strong> {" "}
                                        {meal.ingredients.join(", ")}
                                    </p>
                              </div>
                          )}                         
                        </div>
                    </Link>
                ))}
            </div>            
        </div>
    );
};

export default Home;