"use client";

import Link from "next/link";
import React, {useState} from "react";
import NavbarButtons from "./NavbarButtons";
import MobileMenu from "./MobileMenu";
import categoriesPtoPreload from "@/helpers/categoriesP";

const CategoryIcon = ({name}: {name: string}) => {
    if (name.toLowerCase().includes("smart")) {
        return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="6" y="2.5" width="12" height="19" rx="2" />
                <path d="M10 18.5h4" />
            </svg>
        );
    }

    if (name.toLowerCase().includes("head")) {
        return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                <path d="M4 13h3v6H5a1 1 0 0 1-1-1v-5Z" />
                <path d="M20 13h-3v6h2a1 1 0 0 0 1-1v-5Z" />
            </svg>
        );
    }

    if (name.toLowerCase().includes("laptop")) {
        return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="5" y="3" width="14" height="13" rx="1.5" />
                <path d="M2.5 19h19" />
                <path d="M8 19l1-2h6l1 2" />
            </svg>
        );
    }

    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="6" width="18" height="15" rx="2" />
            <path d="M8 6a4 4 0 0 1 8 0" />
        </svg>
    );
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
            {/* Top information bar */}
            <div className="hidden md:flex h-9 items-center justify-center bg-[#0F766E] text-white text-xs tracking-wide">
                <div className="flex items-center gap-6">
                    <span>Premium technology</span>
                    <span className="opacity-50">|</span>
                    <span>Curated for everyday life</span>
                    <span className="opacity-50">|</span>
                    <span>Secure shopping experience</span>
                </div>
            </div>

            <nav className="sticky top-0 z-50 w-full border-b border-[#DDE5E1] bg-white/95 backdrop-blur-md shadow-sm">
                <div className="mx-auto flex min-h-[76px] max-w-7xl items-center gap-6 px-6">
                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-3 group" aria-label="NidZone home">
                        {/* Temporary geometric NidZone mark */}
                        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#0F766E] transition-transform duration-300 group-hover:scale-105">
                            <span className="absolute text-2xl font-black text-white">N</span>

                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-tl-lg bg-[#D97757]" />
                        </div>

                        <div className="hidden sm:block leading-none">
                            <span className="block text-[25px] font-bold tracking-tight text-[#172023]">
                                Nid<span className="text-[#0F766E]">Zone</span>
                            </span>

                            <span className="mt-1 block text-[8px] font-semibold tracking-[0.28em] text-[#7A8784]">
                                TECHNOLOGY · SIMPLY BETTER
                            </span>
                        </div>
                    </Link>

                    {/* Divider */}
                    <div className="hidden xl:block h-9 w-px bg-[#DDE5E1]" />

                    {/* Categories */}
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
                        {categoriesPtoPreload?.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products/${category.id}`}
                                className="group flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#42545A] transition-all duration-200 hover:bg-[#EEF3F0] hover:text-[#0F766E]"
                            >
                                <CategoryIcon name={category.name} />

                                <span>{category.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Search */}
                        <div className="hidden xl:flex items-center w-52 h-11 rounded-full border border-[#DDE5E1] bg-[#F8FAF9] px-4 transition-all focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/10">
                            <svg
                                className="w-5 h-5 text-[#6B7775] mr-2"
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
                                placeholder="Search products..."
                                className="w-full bg-transparent text-sm text-[#172023] placeholder:text-[#899491] outline-none"
                                aria-label="Search products"
                            />
                        </div>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            aria-label="Shopping cart"
                            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF3F0] text-[#0F766E] transition-all hover:bg-[#DDEBE6] hover:scale-105"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M3 4h2l2.5 11h10l3-8H7" />
                                <circle cx="9" cy="19" r="1.5" />
                                <circle cx="17" cy="19" r="1.5" />
                            </svg>
                        </Link>

                        <NavbarButtons />

                        {/* Mobile menu placeholder */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-[#DDE5E1] text-[#42545A] transition-colors hover:border-[#0F766E] hover:text-[#0F766E]"
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            </nav>
        </>
    );
};

export default Navbar;
