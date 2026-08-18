"use client";

import { IUserSession } from "@/interfaces/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NavbarButtons: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(
            Cookies.get("userData") ?? "{}"
        );

        setUserSession(storedUser);
    }, [pathname]);

    const handleLogout = () => {
        const storedUser = JSON.parse(
            Cookies.get("userData") ?? "{}"
        );

        const { token, user } = storedUser;

        Cookies.set(
            "expiredUser",
            JSON.stringify({ token, user }),
            { expires: 1 }
        );

        Cookies.remove("userData");
        localStorage.removeItem("userData");

        Swal.fire({
            toast: true,
            position: "top-right",
            icon: "success",
            title: "Successfully logged out",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            iconColor: "#D97757",
        });

        setTimeout(() => {
            window.location.reload();
            router.push("/");
        }, 3000);
    };

    return (
        <div className="flex items-center gap-2">

            {!userSession?.token ? (
                <>
                    {/* Log In */}
                    <Link
                        href="/login"
                        className="hidden sm:flex h-11 min-w-[88px] items-center justify-center whitespace-nowrap rounded-full border border-[#0F766E] px-5 text-sm font-semibold text-[#0F766E] transition-all duration-200 hover:bg-[#EEF3F0]"
                    >
                        Log In
                    </Link>

                    {/* Sign Up */}
                    <Link
                        href="/signup"
                        className="flex h-11 min-w-[92px] items-center justify-center whitespace-nowrap rounded-full bg-[#D97757] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#C46348] hover:shadow-md active:scale-95"
                    >
                        Sign Up
                    </Link>
                </>
            ) : (
                <>
                    {/* My Account */}
                    <Link
                        href="/dashboard"
                        className="hidden md:flex h-11 items-center justify-center rounded-full border border-[#DDE5E1] px-4 text-sm font-semibold text-[#42545A] transition-all hover:border-[#0F766E] hover:text-[#0F766E]"
                    >
                        My Account
                    </Link>

                    {/* Orders */}
                    <Link
                        href="/dashboard/orders"
                        className="hidden lg:flex h-11 items-center justify-center rounded-full border border-[#DDE5E1] px-4 text-sm font-semibold text-[#42545A] transition-all hover:border-[#0F766E] hover:text-[#0F766E]"
                    >
                        Orders
                    </Link>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex h-11 min-w-[88px] items-center justify-center whitespace-nowrap rounded-full bg-[#dc8467] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#C46348] hover:shadow-md active:scale-95"
                    >
                        Log Out
                    </button>
                </>
            )}
        </div>
    );
};

export default NavbarButtons;