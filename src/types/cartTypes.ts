export interface CartItem {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export interface SushiItem {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: string;
    ingredients: string[];
    isPopular: boolean;
    price: number;
    nutrition?: {
    calories: number;
    protein: string;
    fat: string;
    carbohydrates: string;
  };
}
