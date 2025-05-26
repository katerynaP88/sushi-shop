export async function fetchSushiData() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=sushi');
    const data = await response.json();
    return data.meals;
}