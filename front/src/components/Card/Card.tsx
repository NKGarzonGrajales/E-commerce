import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProduct } from "@/interfaces/types";

const Card: React.FC<IProduct> = ({ id, name, image, price }) => {
    return (
        <div className="group flex flex-col justify-between rounded-2xl border border-[#DDE5E1] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/40 hover:shadow-lg">
            
            {/* Product Image */}
            <div className="relative w-full h-56 mb-5 overflow-hidden rounded-xl bg-[#F7F8F6] flex items-center justify-center">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Information */}
            <div className="flex flex-col flex-grow">
                <h3 className="font-medium text-[#172023] text-sm md:text-base line-clamp-1 mb-2 group-hover:text-[#0F766E] transition-colors">
                    {name}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#DDE5E1]">
                    <span className="text-xl font-bold text-[#172023]">
                        ${price}
                    </span>

                    <Link
                        href={`/product/${id}`}
                        className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#0F766E] rounded-xl hover:bg-[#115E59] active:scale-95 transition-all shadow-sm whitespace-nowrap"
                    >
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;