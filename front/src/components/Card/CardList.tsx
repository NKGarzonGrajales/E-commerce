"use client";

import React, {useState, useEffect} from "react";
import Card from "../Card/Card";
import {getProducts} from "@/app/api/productAPI";
import {IProduct} from "@/interfaces/types";

const CardList: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Error fetching products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="w-full px-6 py-3 mr-10 bg-[#dbdcec] justify-items-center">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Products</h1>
            <div className="bg-[#dbdcec] rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {products.map((product, index) => (
                    <Card key={product.id} {...product} index={index} />
                ))}
            </div>
        </div>
    );
};

export default CardList;
