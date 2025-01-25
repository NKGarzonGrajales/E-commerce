import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
    return (
        <div className="text-stone-800 text-center mt-8 mb-1">
            <h1 className="text-stone-600 font-bold text-4xl">Welcome to NidZone3 Store Online</h1>
            <div className="flex justify-center items-center h-screen w-2/5 mx-auto">
                <Link href="/home">
                    <Image
                        src="/images/etechm1.png"
                        alt="NidZone3 Landing"
                        width={400}
                        height={150}
                        className="w-auto h-auto object-cover rounded-xl"
                    />
                    <button className="mt-1 px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-250 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-purple-900 active:bg-violet-600 hover:bg-fuchsia-800">
                        Explore
                    </button>
                </Link>
            </div>
        </div>
    );
}
