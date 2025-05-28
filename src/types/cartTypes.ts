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