import { useEffect, useState } from "react";
import { fetchSushiData } from "../api/meals";
import { Link } from "react-router-dom";

const Menu = () => {
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    
    const categories = ["All", "Sushi", "Roll", "Dessert", "Soup"];
    
    useEffect (() => {
        async function loadData() {
            try {
                const sushi = await fetchSushiData();
                setMeals(sushi);
            } catch (err) {
                setError("Failed to load sushi 😔");
            } finally {
                setLoading(false);
            }
        
        }

        loadData();
    }, []);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading sushi menu...</p>;

        const filteredMeals = selectedCategory === "All"
                  ? meals
                  : meals.filter((meal) =>
                      meal.strCategory.toLowerCase().includes(selectedCategory.toLowerCase())
                    );

        return (
        <div style={{ padding: "1rem" }}>
            <h1>🍣Welcom to our Sushi Menu!🍣</h1>
            <p>Discover the freshest and most delicious sushi dishes made just for you.</p>
            
            {/* Category Buttons */}
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                {categories.map((category) => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                          marginRight: "0.5rem",
                          padding: "0.5rem 1rem",
                          backgroundColor: selectedCategory === category ? "lightcoral" : "#000",
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

            {/* Meals Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "1rem"
                }}
            >
                {filteredMeals.map((meal) => (
                    <Link to={`/product/${meal.idMeal}`} key={meal.idMeal} style={{ textDecoration: "none", color: "inherit"}}>
                        <div
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "1rem",
                            width: "200px",

                          }}
                        >
                          <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            style={{ width: "100%", borderRadius: "8px" }}
                          />
                          <h3>{meal.strMeal}</h3>
                          <p><strong>Category:</strong> {meal.strCategory}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu;