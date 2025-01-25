import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavbarButtons from "./NavbarButtons";
import categoriesPtoPreload from "@/helpers/categoriesP";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-violet-950 via-gray-500 to-fuchsia-950 opacity-90 p-4 flex items-center justify-between sticky top-0 z-10 bg-opacity-95 rounded-full shadow-lg flex-wrap">
            <div className="flex-shrink-0 text-white text-3xl font-sans font-bold">
                <Link href="/" className="hover:text-yellow-900 transition duration-300 ease-in-out">
                    <Image
                        src="/images/logo.png"
                        alt="NidZone3 Logo"
                        width={200}
                        height={200}
                        className="h-12 w-auto ml-10 border-6 border-x-stone-950 shadow-2xl rounded-lg"
                    />
                </Link>
            </div>
            <p className="sr-only">NidZone3 online store</p>

            <div className="flex-1 mx-4 md:mx-2 flex items-center justify-between">
                {
                    <div className="hidden lg:flex space-x-8 font-serif font-bold text-white text-xl">
                        {categoriesPtoPreload &&
                            categoriesPtoPreload.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products/${category.id}`}
                                    className="hover:text-yellow-300 transition duration-300 ease-in-out"
                                >
                                    {category.name}
                                </Link>
                            ))}
                    </div>
                }
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
                <NavbarButtons />
            </div>
        </nav>
    );
};

export default Navbar;
