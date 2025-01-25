
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 max-w-2xl">
                <div className="max-w-lg flex flex-col items-center">
                    <Image
                        src="/images/svgbus.png"
                        alt="Not Found 404, please take a bus back home"
                        width={900}
                        height={400}
                        className="w-full h-auto max-w-full"
                    />
                    <div className="absolute top-[57%] text-6xl text-black font-bold bg-[#decdc0] bg-blend-screen animate-bounce rounded-lg tracking-wider">
                        404
                    </div>

                    <Link
                        href="/"
                        className="mt-4 px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-pink-900 active:bg-green-900 hover:bg-bluelight-700"
                    >
                        Back to the beginning!
                    </Link>
                </div>
            </div>
        </div>
    );
}
