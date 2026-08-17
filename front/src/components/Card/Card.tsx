import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IProduct } from "@/interfaces/types";

const Card: React.FC<IProduct> = ({ id, name, image, price }) => {
    return (
        <div className="group bg-white rounded-2xl border border-[#DDE5E1] p-5 shadow-sm hover:shadow-xl hover:border-[#0F766E]/40 transition-all duration-300 flex flex-col justify-between">
            
            {/* Product Image */}
            <div className="relative w-full h-52 mb-4 overflow-hidden rounded-xl bg-[#F7F8F6] flex items-center justify-center">
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
                    <span className="text-lg font-bold text-[#172023]">
                        ${price}
                    </span>

                    <Link
                        href={`/product/${id}`}
                        className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#0F766E] rounded-xl hover:bg-[#115E59] active:scale-95 transition-all shadow-sm"
                    >
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;