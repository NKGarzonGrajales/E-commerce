import {Toast} from "@/helpers/index";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(products: number[], token: string) {
    try {
        const res = await fetch(`${APIURL}/orders`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({products}),
        });

        if (!res.ok) {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "Couldn't complete the order",
            });
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "Couldn't complete the order",
        });

        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}

export async function getOrders(token: string) {
    try {
        const res = await fetch(`${APIURL}/users/orders`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-type": "application/json",
                Authorization: token,
            },
        });

        if (!res.ok) {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "We're having trouble fetching your orders",
            });
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        Toast.fire({
            icon: "error",
            iconColor: "rose",
            title: "We're having trouble fetching your orders",
        });

        if (error instanceof Error) {
            console.error("Error fetching orders:", error.message);
            throw new Error(error.message);
        } else {
            console.error("Unknown error fetching orders");
            throw new Error("Unknown error occurred");
        }
    }
}
