import CardList from "@/components/Card/CardList";
import Carousel from "@/components/Carousel";
import React from "react";

const Home: React.FC = () => {
    return (
        <main className=" bg-[#F7F8F6] text-[#172023] pb-16">

            {/* Hero / Carousel */}
            <section className="max-w-7xl mx-auto px-6 mt-8">
                <div className="rounded-3xl overflow-hidden shadow-md border border-[#DDE5E1] bg-white">
                    <Carousel />
                </div>
            </section>

            {/* Product Catalog */}
            <section className="max-w-7xl mx-auto px-6 mt-16">

                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#DDE5E1] pb-4">
                    <div>
                        <span className="text-[#D97757] text-xs font-bold tracking-widest uppercase">
                            Featured
                        </span>

                        <h2 className="text-3xl font-bold tracking-tight text-[#172023] mt-1">
                            Featured Tech
                        </h2>

                        <p className="text-sm text-[#6B7775] mt-1">
                            Explore our selection of premium hardware and technology.
                        </p>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="bg-[#EEF3F0] p-8 rounded-3xl shadow-sm border border-[#DDE5E1]">
                    <CardList />
                </div>

            </section>

        </main>
    );
};

export default Home;