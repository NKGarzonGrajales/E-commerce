import React from "react";
import Image from "next/image";
import Link from "next/link";
import {IProduct} from "../../interfaces/types";

const colors = [
    {bg: "#dad8df", shadow: "rgba(111, 45, 111)"},
    {bg: "#958ea2", shadow: "rgba(111, 45, 168)"},
    {bg: "#bab6c3", shadow: "rgba(111, 45, 168)"},
];

const Card: React.FC<IProduct & {index: number}> = ({id, image, name, price, index}) => {
    const color = colors[index % colors.length];

    return (
        <div
            className="relative flex flex-col w-64 max-w-xs h-full overflow-hidden rounded-lg shadow-lg text-center"
            style={{
                backgroundColor: color.bg,
                boxShadow: `0 4px 8px ${color.shadow}`,
            }}
        >
            <div className="w-full h-40 p-2 flex justify-center items-center">
                <Image
                    src={image}
                    alt={`${name} product image`}
                    width={300}
                    height={300}
                    style={{objectFit: "contain", width: "100%", height: "100%"}}
                    className="rounded-lg"
                />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight p-1">{name}</h1>
            <div className="text-gray-700 mt-1 text-sm">
                Price: <span className="text-xl font-bold text-gray-900">${price}</span>
            </div>
            <div className="mt-auto p-1">
                <Link href={`/product/${id}`}>
                    <div className="block bg-gray-900 text-white font-semibold py-1 px-3 rounded-lg hover:bg-purple-800 
                    transition duration-300 text-center">
                        See more!
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Card;
