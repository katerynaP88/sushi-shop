import { useEffect, useState } from "react";
import sushiData from "../data/sushiData.json";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";



type SushiItem = {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: string;
    price: number;
    ingredients: string[];
};

const Menu = () => {
    const [meals, setMeals] = useState<SushiItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [showCart, setShowCart] = useState(false);

    const { addToCart } = useCart()

    const categories = ["All", "Sushi", "Roll", "Soup", "Dessert"];
    
    useEffect (() => {
        async function loadData() {
            try {
                const products = await fetchProducts();
                
                const sushiMock = sushiData.map((dish, index) => ({
                    ...dish,
                    price: products[index]?.price ?? 0,
                }));

                setMeals(sushiMock);
            } catch (err) {
                setError("Failed to load sushi menu 😔");
            } finally {
                setLoading(false);
            }
        
        }

        loadData();
    }, []);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading sushi menu...</p>;

        const filteredMeals = meals
        .filter((meal) =>
          selectedCategory === "All" || meal.category === selectedCategory
        )
        .filter((meal) =>
            meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal.description.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return (
        <div style={{ padding: "1rem" }}>
            <h1>🍣 Welcome to our Sushi World! 🍣</h1>
            <p>Discover the freshest and most delicious sushi dishes made just for you.</p>

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="Search for sushi..."
                  value={searchQuery}
                  onChange={ (e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    width: "100%",
                    maxWidth: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "1rem",
                  }}
                />                
            </div>
            
            {/* Category Buttons */}
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                {categories.map((category) => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                          marginRight: "0.5rem",
                          padding: "0.5rem 1rem",
                          backgroundColor: selectedCategory === category ? "#ffd700" : "#000",
                          color: selectedCategory === category ? "#000" : "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Sushi Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "1rem"
                }}
            >
                {filteredMeals.map((meal) => (
                    <Link 
                      to={`/product/${meal.id}`} 
                      key={meal.id}
                      style={{ textDecoration: "none", color: "inherit"}}>
                        <div
                          style={{
                            border: hoveredId === meal.id ? "2px solid #f28c38" :  "1px solid transparent",
                            borderRadius: "10px",
                            padding: "0.5rem",
                            backgroundColor: "#fff",
                            transition: "border 0.3s ease",
                          }}
                          onMouseEnter={() => setHoveredId(meal.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <img
                            src={meal.thumbnail}
                            alt={meal.title}
                            style={{ 
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",                                
                             }}
                          />
                          <h3 
                            style={{
                                color: "#000",
                                fontSize: "1.1rem",
                                margin: "0.5rem 0 0.25rem",
                                textAlign: "center",
                            }}
                          >
                            {meal.title}
                          </h3>                                                                              
                          <p
                            style={{
                                color: "#f28c38",
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                                margin: "0",
                                textAlign: "center",
                            }}
                          > 
                            ${meal.price.toFixed(2)}
                          </p>
                          {hoveredId === meal.id && (
                            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                                <button
                                  style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginBottom: "0.5rem",
                                  }}
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
                                <p
                                  style={{
                                    color: "#555",
                                    fontSize: "0.9rem",
                                    margin: "0",
                                  }}
                                ><strong>Ingredients:</strong> {meal.ingredients.join(", ")}
                                </p>
                            </div>
                          )}                         
                        </div>
                    </Link>
                ))}
            </div>
            {showCart && <CartPopup onClose={() => setShowCart(false)} />}
        </div>
    );
};

export default Menu;