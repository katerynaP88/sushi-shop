export async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        return data.products;
    } catch (error) {
        throw new Error('Error fetching products');
    }
}

export async function fetchProductById(id: string) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetchung product");
    }
}
