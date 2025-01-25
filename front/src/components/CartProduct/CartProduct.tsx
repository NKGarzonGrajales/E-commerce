import React from "react";
import {IProduct} from "@/interfaces/types";
import Image from "next/image";

const CartProduct: React.FC<IProduct & {onRemove: (id: number) => void}> = ({
    id,
    image,
    description,
    name,
    price,
    onRemove,
}) => {
    return (
        <>
            <div className="flex border border-dashed w-full h-full p-4 mb-4 shadow-lg m-0 flex-grow justify-between rounded-2xl">
                <div className="md:w-4/12 2xl:w-1/4 w-full h-full ">
                    <Image
                        src={image}
                        alt="Image purposes"
                        width={100}
                        height={100}
                        style={{objectFit: "cover"}}
                        className="h-full object-center md:block hidden"
                    />
                </div>

                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center w-full h-full flex-grow">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-base font-black leading-none text-gray-800">{name}</p>
                    </div>
                    <p className="text-justify text-base leading-5 text-gray-600 py-4">{description}</p>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex itemms-center">
                            <p
                                className="text-lg leading-3 underline border-spacing-1 mb-2 text-red-700 pl-5 cursor-pointer"
                                onClick={() => onRemove(id)}
                            >
                                Remove
                            </p>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">{price}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartProduct;
