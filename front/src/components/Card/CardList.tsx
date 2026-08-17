"use client";

import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { getProducts } from "@/app/api/productAPI";
import { IProduct } from "@/interfaces/types";

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

    if (loading) {
        return (
            <p className="text-center py-10 text-[#6B7775]">
                Loading products...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center py-10 text-red-600">
                {error}
            </p>
        );
    }

    return (
        <div className="w-full">
            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default CardList;