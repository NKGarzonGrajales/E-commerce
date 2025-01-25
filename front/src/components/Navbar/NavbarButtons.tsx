"use client";
import {IUserSession} from "@/interfaces/types";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NavbarButtons: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(Cookies.get("userData") ?? "{}");
        setUserSession(storedUser);
    }, [pathname]);

    const handleLogout = () => {
        const storedUser = JSON.parse(Cookies.get("userData") ?? "{}");
        const {token, user} = storedUser;

        Cookies.set("expiredUser", JSON.stringify({token, user}), {expires: 1});
        Cookies.remove("userData");
        localStorage.removeItem("userData"); //Elimina el ítem userData de localStorage

        Swal.fire({
            toast: true,
            position: "top-right",
            icon: "success",
            title: "Successfully logged out",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            iconColor: "#f6ad55",
        });
        setTimeout(() => {
            window.location.reload();
            router.push("/");
        }, 3000);
    };

    return (
        <div className="flex space-x-6 text-white font-sans text-xl font-semibold ml-5 mr-5 ">
            {!userSession?.token ? (
                <>
                    <Link href="/signup">
                        <button className="bg-gradient-to-r from-indigo-950 via-gray-800 to-purple-950 opacity-90 hover:text-orange-400 text-white font-bold py-2 px-4 rounded-2xl border-r-5 transition duration-300 ease-in-out">
                            Sign Up
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-gradient-to-r from-indigo-950 via-gray-800 to-purple-950 opacity-90 hover:text-orange-400 text-white font-extrabold py-2 px-4 rounded-2xl border-r-5 transition duration-300 ease-in-out">
                            Log In
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <Link href="/cart">
                        <button className="bg-gradient-to-r from-indigo-950 via-gray-800 to-purple-950 opacity-90 hover:text-orange-400 text-white font-bold py-2 px-4 rounded-2xl border-r-5 transition duration-300 ease-in-out">
                            Cart
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className="bg-gradient-to-r from-indigo-950 via-gray-800 to-purple-950 opacity-90 hover:text-orange-400 text-white font-extrabold py-2 px-4 rounded-2xl border-r-5 transition duration-300 ease-in-out">
                            My Account
                        </button>
                    </Link>
                    <Link href="/dashboard/orders">
                        <button className="bg-gradient-to-r from-indigo-950 via-gray-800 to-purple-950 opacity-90 hover:text-orange-400 text-white font-extrabold py-2 px-4 rounded-2xl border-r-5 transition duration-300 ease-in-out">
                            Orders
                        </button>
                    </Link>

                    <Link href="/">
                        <button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-indigo-950 via-gray-800 to-purple-950 opacity-90 hover:text-orange-400 text-white font-extrabold py-2 px-4 rounded-2xl border-r-5 transition duration-300 ease-in-out"
                        >
                            LogOut
                        </button>
                    </Link>
                    
                </>
            )}
        </div>
    );
};

export default NavbarButtons;
