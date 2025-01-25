import {getOrders} from "@/app/api/ordersAPI";
import {IOrder, IProduct, IUserSession} from "@/interfaces/types";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

const Orders = async () => {
    const cookieStore = await cookies();
    const userData: IUserSession = JSON.parse(cookieStore.get("userData")?.value ?? "{}");

    if (!userData) {
        return <div>Please log In to view your orders.</div>;
    }

    if (typeof userData.token !== "string") {
        return <div>No valid token found. Please log in.</div>;
    }

    const orders: IOrder[] = await getOrders(userData.token);

    return (
        <div className="max-w-4xl  mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <span className="flex flex-col ">
                <Link href="/home " className="flex font-light text-gray-900 text-lg text-center p-10">
                    <svg className="fill-current mr-2 text-gray-900 w-6" viewBox="0 0 448 512">
                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                </Link>
            </span>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="mb-10 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 ">
                        <p className="text-lg font-semibold text-gray-800">
                            Status: <span className={"text-green-600"}>{order.status?.toUpperCase()}</span>
                        </p>
                        <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleString()}</p>

                        <h3 className="text-xl font-bold text-gray-800 mt-4">Products in this order:</h3>
                        <ul className="mt-3 space-y-4">
                            {order.products.map((product: IProduct) => (
                                <li
                                    key={product.id}
                                    className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name ? product.name : "Product Image"}
                                        width={100}
                                        height={100}
                                        className="rounded-lg"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">Product Name: {product.name}</p>
                                        <p className="text-gray-700">Price: ${product.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600 text-lg">No orders found.</p>
            )}
        </div>
    );
};

export default Orders;
