/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CartProduct from "@/components/CartProduct/CartProduct";
import {Toast} from "@/helpers";
import {createOrder} from "@/app/api/ordersAPI";
import {IProduct, IUserSession} from "@/interfaces/types";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

const CartView: React.FC<{token: any; userData: IUserSession}> = ({token}) => {
    const router = useRouter();
    const [cart, setCart] = useState<IProduct[]>([]);
    const [totalC, setTotalCart] = useState(0);
    const [totalBeforeTax, setTotalBeforeTax] = useState(0);
    const tax = 1.99;
    const shipping = 0;

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (storedCart.length) {
            setCart(storedCart);
            calculateTotal(storedCart);
        }
    }, [tax, shipping]);

    const calculateTotal = (cartItems: IProduct[]) => {
        const totalCart = cartItems
        .map((item: IProduct) => item.price * (item.quantity || 1))
        .reduce((acc: number, price: number) => acc + price, 0);

        setTotalBeforeTax(totalCart);
        const totalWithExtras = totalCart + tax + shipping;
        setTotalCart(totalWithExtras);
    };

    const formattedTotal = totalC.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const formattedTotalBeforeTax = totalBeforeTax.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const handleRemoveItem = (id: number) => {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart);

        Toast.fire({
            icon: "info",
            iconColor: "purple",
            title: "Item removed from cart",
        });
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            Toast.fire({
                icon: "warning",
                iconColor: "violet",
                title: "Your cart is empty! Add items to proceed with checkout.",
            });
            return;
        }

        const idProducts = cart?.map((product) => product.id);
        await createOrder(idProducts, token);
        Toast.fire({
            icon: "success",
            iconColor: "green",
            title: "Order placed successfully",
        });

        setCart([]);
        setTotalCart(0);
        localStorage.setItem("cart", "[]");
        router.push("/dashboard/orders");
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="sm:flex shadow-md my-10">
                <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-around border-b pb-6">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl mr-28 ">Items</h2>
                    </div>
                    <div className="md:flex items-stretch py-8 md:py-10 lg:py-8  max-h-[360px] flex-col mb-4 overflow-y-scroll p-4 ">
                        {cart.length ? (
                            cart?.map((product: IProduct) => (
                                <CartProduct key={product.id} {...product} onRemove={handleRemoveItem} />
                            ))
                        ) : (
                            <p>Your cart awaits its first item!</p>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 md:w-1/4 ">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <ul>
                        {" "}
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center border-b py-2">
                                <div>
                                    <h3 className="text-md font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        Price: ${item.price} x {item.quantity || 1}
                                    </p>
                                </div>
                                <p className="text-md font-semibold">${item.price * (item.quantity || 1)}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>{formattedTotalBeforeTax}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Taxes</span>
                            <span>$1.99</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>Freebie!</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">{formattedTotal}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="bg-gray-950 text-white text-xl font-bold py-2 px-4 rounded-lg mt-4 w-full hover:bg-green-950 hover-opacity-95"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <span className="flex flex-col ">
                <Link href="/home" className="flex font-bold text-gray-900 text-2xl text-center p-10">
                    <svg className="fill-current mr-2 text-gray-900 w-6" viewBox="0 0 448 512">
                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                </Link>
            </span>
        </div>
    );
};

export default CartView;
