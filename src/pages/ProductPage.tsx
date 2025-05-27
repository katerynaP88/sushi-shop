import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
};

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                const data = await res.json();
                setMeal(data.meals[0]);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch meal:", err);
                setLoading(false);
            }
        };

        fetchMeal();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!meal) return <p>Meal not found</p>;


    return (
        <div style={{ padding: "2rem" }}>
            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Origin:</strong>{meal.strArea}</p>
            <p><strong>Instruction:</strong>{meal.strInstructions}</p>

            <button style={{
                padding: "1rem 2rem",
                marginTop: "1rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
            }}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductPage;