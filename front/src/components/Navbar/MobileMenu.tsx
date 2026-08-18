"use client";

import Link from "next/link";
import { useState } from "react";
import categoriesPtoPreload from "@/helpers/categoriesP";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const [search, setSearch] = useState("");

    if (!isOpen) return null;

    return (
        <div className="lg:hidden border-t border-[#DDE5E1] bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-6 py-5">

                {/* Search */}
                <div className="mb-5 flex h-11 items-center rounded-full border border-[#DDE5E1] bg-[#F8FAF9] px-4 focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/10">
                    <svg
                        className="mr-2 h-5 w-5 shrink-0 text-[#6B7775]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-4-4" />
                    </svg>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-transparent text-sm text-[#172023] placeholder:text-[#899491] outline-none"
                        aria-label="Search products"
                    />
                </div>

                {/* Categories */}
                <div className="space-y-1 border-b border-[#DDE5E1] pb-4">
                    {categoriesPtoPreload?.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products/${category.id}`}
                            onClick={onClose}
                            className="flex items-center rounded-xl px-3 py-3 text-sm font-medium text-[#42545A] transition-colors hover:bg-[#EEF3F0] hover:text-[#0F766E]"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>

                {/* Authentication */}
                <div className="flex flex-col gap-2 pt-4">

                    <Link
                        href="/login"
                        onClick={onClose}
                        className="flex h-11 items-center justify-center rounded-full border border-[#0F766E] text-sm font-semibold text-[#0F766E] transition-colors hover:bg-[#EEF3F0]"
                    >
                        Log In
                    </Link>

                    <Link
                        href="/signup"
                        onClick={onClose}
                        className="flex h-11 items-center justify-center rounded-full bg-[#D97757] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#C46348] hover:shadow-md active:scale-95"
                    >
                        Sign Up
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default MobileMenu;