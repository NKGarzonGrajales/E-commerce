import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/interfaces/types";

interface CartState {
    cart: IProduct[];
    addToCart: (product: IProduct) => { success: boolean; message: string; type: "success" | "warning" };
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) => {
                const cart = get().cart;
                const productIndex = cart.findIndex((item) => item.id === product.id);
                const MAX_QUANTITY = 1;

                if (productIndex !== -1) {
                    if (cart[productIndex].quantity! < MAX_QUANTITY) {
                        const updatedCart = [...cart];
                        updatedCart[productIndex].quantity! += 1;
                        set({ cart: updatedCart });
                        return { success: true, message: "You have added another unit to the cart", type: "success" };
                    } else {
                        return { success: false, message: `You can only add up to ${MAX_QUANTITY} units of this product`, type: "warning" };
                    }
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                    return { success: true, message: "You have added a product to the cart", type: "success" };
                }
            },
            removeFromCart: (id) => {
                set({ cart: get().cart.filter((item) => item.id !== id) });
            },
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart-storage", // clave en localStorage
        }
    )
);