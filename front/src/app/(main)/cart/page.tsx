import {IUserSession} from "@/interfaces/types";
import CartView from "@/components/CartView";
import {cookies} from "next/headers";
import React from "react";

const Cart = async () => {
    const cookieStore = await cookies();
    const userData: IUserSession = JSON.parse(cookieStore.get("userData")?.value ?? "{}");
    const token = userData.token;
    return <CartView token={token} userData={userData} />;
};

export default Cart;
