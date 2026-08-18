"use client";

import React, { useEffect, useState } from "react";
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
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <p className="py-10 text-center text-[#6B7775]">
                Loading products...
            </p>
        );
    }

    if (error) {
        return (
            <p className="py-10 text-center text-red-600">
                {error}
            </p>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;