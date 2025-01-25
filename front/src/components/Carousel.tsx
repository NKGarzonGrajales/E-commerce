"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div
                id="carouselDarkVariant"
                className="relative w-[70%] mt-10 mx-auto"
                data-twe-carousel-init
                data-twe-ride="carousel"
            >
                <div
                    className="absolute inset-x-0 bottom-0 z-[2] mx-[5%] mb-2 flex list-none justify-center p-1"
                    data-twe-carousel-indicators
                >
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            data-twe-target="#carouselDarkVariant"
                            data-twe-slide-to={index}
                            className={`mx-[8px] h-[8px] w-[70px] cursor-pointer ${
                                index === currentIndex ? "bg-white opacity-100" : "bg-gray-950 opacity-50"
                            }`}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                <div className="relative w-full h-[40vh] overflow-hidden">
                    <div
                        className={`relative flex w-full transition-opacity duration-[600ms] ease-in-out ${
                            currentIndex === 0 ? "block" : "hidden"
                        }`}
                    >
                        <Image
                            src="/images/Smartwatches1.png"
                            alt="All in One Place, looking ahead the future!"
                            width={1500}
                            height={600}
                            style={{objectFit: "cover", width: "100%", height: "100%"}}
                            className="rounded-lg max-h-[60vh] opacity-60"
                            priority
                        />
                        <div className="absolute inset-x-10 top-2 py-10 text-center md:block bg-transparent bg-opacity-50 p-8 z-10">
                            <h5 className="text-8xl font-bold text-red-700 text-stroke-black hover:font-serif">
                                Seen It Cheaper?
                            </h5>
                            <p className="text-7xl mt-14 text-white text-stroke-black font-sans hover:uppercase underline decoration-white ">
                                Best Prices and Deals!
                            </p>
                        </div>
                    </div>

                    <div
                        className={`relative float-left w-full transition-opacity duration-[600ms] ease-in-out ${
                            currentIndex === 1 ? "block" : "hidden"
                        }`}
                    >
                        <Image
                            src="/images/laptops.png"
                            alt="Laptops universe"
                            width={1500}
                            height={600}
                            style={{objectFit: "cover", width: "100%", height: "100%"}}
                            className="block w-full max-h-[45vh] opacity-75"
                        />
                        <div className="absolute inset-x-10 top-2 py-10 md:block bg-transparent bg-opacity-50 p-8 z-10">
                            <h5 className="text-8xl font-bold text-yellow-600 text-stroke-black decoration-wavy hover:font-serif text-center">
                                Love Tech?
                            </h5>
                            <p className="text-7xl mt-14 mr-[-40] text-zinc-50 bg-gray-600 opacity-70 font-sans hover:font-serif underline">
                                The latest laptops and gear for devs!😊
                            </p>
                        </div>
                    </div>

                    <div
                        className={`relative float-left w-full transition-opacity duration-[600ms] ease-in-out ${
                            currentIndex === 2 ? "block" : "hidden"
                        }`}
                    >
                        <Image
                            src="/images/Smartphones1.png"
                            alt="Latest tech welcome image "
                            width={1500}
                            height={600}
                            style={{objectFit: "cover", width: "100%", height: "100%"}}
                            className="rounded-lg max-h-[95vh] opacity-70"
                        />
                        <div className="absolute inset-x-10 top-2 py-10 text-center md:block bg-transparent bg-opacity-50 p-8 z-10">
                            <h5 className="text-8xl font-bold text-zinc-950 text-stroke-white hover:font-serif">
                                Need more info!
                            </h5>
                            <p className="text-7xl font-extrabold mt-14 text-gray-200 font-sans  hover:uppercase text-stroke-black">
                                Buy it now!
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    className="absolute left-0 top-0 z-[50] w-[25%] h-full text-black opacity-60 hover:opacity-90"
                    type="button"
                    onClick={handlePrev}
                >
                    <span className="inline-block h-  9 w-9 dark:grayscale">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-9 w-9"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </span>
                </button>

                <button
                    className="absolute right-0 top-0 z-[50] w-[15%] h-full text-black opacity-50 hover:opacity-90"
                    type="button"
                    onClick={handleNext}
                >
                    <span className="inline-block h-9 w-9 dark:grayscale">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-9 w-9"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
