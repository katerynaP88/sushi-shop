import { useState, useMemo } from "react";
import { SushiItem } from "../types/cartTypes";

export const useSearch = (meals: SushiItem[]) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory,setSelectedCategory] = useState("Most Ordered");

    const filteredItems = useMemo(() => {
        return meals
            .filter((meal) => 
                selectedCategory === "Most Ordered"
                    ? meal.isPopular
                    : meal.category === selectedCategory
            )
            .filter(
                (meal) => 
                    meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    meal.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [meals, searchQuery, selectedCategory]);

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        filteredItems,
    };
};