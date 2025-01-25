"use client";

import AddToCart from "@/components/CartProduct/AddToCart";
import {getProductById} from "@/app/api/productAPI";
import {IProduct, IProductDetailProps} from "@/interfaces/types";
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect} from "react";

const ProductDetail: React.FC<IProductDetailProps> = ({params}) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const unwrappedParams = await params;
                const productId = unwrappedParams.id;
                const data = await getProductById(productId);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Error fetching product");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return product ? (
        <div className="bg-transparent">
            <div className="container mx-auto mt-16 px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="relative h-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{objectFit: "contain"}}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">${product.price}</span>
                        </div>
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-yellow-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
                        </div>
                        <p className="text-gray-700 mb-6">Description: {product.description}</p>
                        <div className="flex space-x-24 mb-3">
                            <div className="flex items-center gap-3">
                                <AddToCart {...product} />
                            </div>
                        </div>
                        <span className="flex flex-col mt-8">
                            <Link href="/home" className="flex font-bold text-zinc-700 text-2xl text-center p-10">
                                <svg className="fill-current mr-4 text-zinc-900 w-6" viewBox="0 0 448 512">
                                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                                Back To Home
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ProductDetail;
