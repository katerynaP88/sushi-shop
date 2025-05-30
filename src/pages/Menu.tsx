import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SushiItem } from "../types";


const Menu = () => {
    const [meals, setMeals] = useState<SushiItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("Most Ordered");
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const { addToCart, setShowCart } = useCart();


    const categories = ["Most Ordered", "Sushi", "Roll", "Soup", "Dessert"];
    
    useEffect (() => {
        async function loadData() {
            try {
                const products = await fetchProducts();                
                const sushiMock = sushiData.map((dish, index) => ({
                    ...dish,
                    price: products[index]?.price ?? 10,
                }));

                setMeals(sushiMock as SushiItem[]);
            } catch (err) {
                setError("Failed to load sushi menu 😔");
            } finally {
                setLoading(false);
            }
        
        }

        loadData();
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (loading) return <p className="text-gray-600">Loading sushi menu...</p>;

        const filteredMeals = meals
        .filter((meal) =>
          selectedCategory === "Most Ordered"
              ? meal.isPopular
              : meal.category === selectedCategory
        )
        .filter((meal) =>
            meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal.description.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return (
        <div className="h-64 bg-cover bg-center flex flex-col justify-center items-center text-white"
            style={{ backgroundImage: 'url(/sushi-bg.jpg)'}}
        >
            <h1 className="text-4x1 font-bold">Discover Our Sushi</h1>
            <p className="text-x1 mt-2">Discover the freshest and most delicious sushi dishes made just for you.</p>

            <div className="mt-6 flex items-center max-w-md mx-auto">
              <span className="text-2x1 mr-2">🔍</span>
                <input
                  type="text"
                  placeholder="Search for sushi..."
                  value={searchQuery}
                  onChange={ (e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />                
            </div>         
            
            <div className="mt-4 flex gap-2 justify-center">
                {categories.map((category) => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={'px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-orange-500 text-white" : "bg-black text-white hover:bg-gray-800"}'}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="mt-6 grid grid-colos-1 sm:grid-colos-2 md:grid-colos-3 lg:grid-colos-4 gap-4 justify-items-center">
                {filteredMeals.map((meal) => (
                    <Link to={`/product/${meal.id}`} 
                      key={meal.id}
                      className="no-underline">
                        <div 
                        className={'p-2 bg-white rounded-lg shadow-lg hover:border-orange-500 transition w-64 ${hoveredId === meal.id ? "border-orange-500" : ""}'}                         
                        onMouseEnter={() => setHoveredId(meal.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        >
                          <img
                            src={meal.thumbnail}
                            alt={meal.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <h3 className="text-lg font-semibold text-center text-black">
                            {meal.title}
                          </h3>                                                                              
                          <p  className="text-orange-500 font-bold text-center text-x1"> 
                            ${meal.price.toFixed(2)}
                          </p>
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
                                  <strong>Ingredients:</strong> {" "} {meal.ingredients.join(", ")}
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

export default Menu;