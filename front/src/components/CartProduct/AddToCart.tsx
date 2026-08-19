"use client";

import { Toast } from "@/helpers";
import { IProduct } from "../../interfaces/types";
import Cookies from "js-cookie";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

const AddToCart: React.FC<IProduct> = (props) => {
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);

    const handleClick = () => {
        const userData = JSON.parse(Cookies.get("userData") || "{}");

        if (!userData.token) {
            Toast.fire({
                icon: "info",
                iconColor: "blue",
                title: "You must be logged to add products",
            });
        } else {
            const response = addToCart(props);

            Toast.fire({
                icon: response.type,
                iconColor: response.type === "success" ? "green" : "orange",
                title: response.message,
            }).then(() => {
                if (response.success) {
                    router.push("/cart");
                }
            });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
            </svg>
            Add to Cart
        </button>
    );
};

export default AddToCart;