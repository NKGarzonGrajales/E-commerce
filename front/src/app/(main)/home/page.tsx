import CardList from "@/components/Card/CardList";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <div>
                <div className="flex justify-center mt-2">
                    <h1 className="text-center text-5xl text-slate-500 align-text-top text-stroke-black p-4">
                        Welcome to NidZone3 store online
                    </h1>
                </div>
                <div className="flex justify-center mt-2">
                    <Link
                        href="/dashboard"
                        className="text-center text-2xl text-slate-500 align-text-top text-stroke-black p-4"
                    ></Link>

                    <Link
                        href="/cart"
                        className="text-center text-2xl text-slate-500 align-text-top text-stroke-black p-4"
                    ></Link>
                </div>
                <Carousel />
                <div className="p-4 rounded-lg shadow-md mx-auto mt-10 max-w-full bg-[#dbdcec]">
                    <CardList />
                </div>
            </div>
        </>
    );
};

export default Home;
