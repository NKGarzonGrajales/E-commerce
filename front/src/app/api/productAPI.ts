import {IProduct} from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<IProduct[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {next: {revalidate: 600}});

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const products: IProduct[] = await res.json();
        return products;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching products:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Unknown error fetching products");
            throw new Error("Unknown error occurred");
        }
    }
}

export async function getProductById(id: string): Promise<IProduct> {
    try {
        const products = await getProducts();
        const product = products.find((product) => product.id.toString() === id);

        if (!product) {
            throw new Error("This product is not available right now");
        }

        return product;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching product by ID:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Unknown error fetching product by ID");
            throw new Error("Unknown error occurred");
        }
    }
}
