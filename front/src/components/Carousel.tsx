"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
    image: string;
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    button: string;
    buttonColor: string;
}

const slides: Slide[] = [
    {
        image: "/images/carousel-main3.webp",
        eyebrow: "PREMIUM TECHNOLOGY",
        title: (
            <>
                Technology
                <br />
                that <span className="text-[#0F766E]">inspires.</span>
            </>
        ),
        description:
            "Discover premium tech products designed\nto elevate your everyday.",
        button: "Explore products",
        buttonColor: "bg-[#0F766E] hover:bg-[#115E59]",
    },
    {
        image: "/images/carousel-laptop3.webp",
        eyebrow: "BUILT FOR PERFORMANCE",
        title: (
            <>
                Power.
                <br />
                Performance.
                <br />
                <span className="text-[#0F766E]">Progress.</span>
            </>
        ),
        description:
            "High-performance technology designed to keep you moving forward.",
        button: "Explore laptops",
        buttonColor: "bg-[#0F766E] hover:bg-[#115E59]",
    },
    {
        image: "/images/carousel-smartphone3.webp",
        eyebrow: "MADE TO CONNECT",
        title: (
            <>
                Innovation
                <br />
                in every
                <br />
                <span className="text-[#6B8F85]">detail.</span>
            </>
        ),
        description:
            "Smart technology that fits perfectly into your life.",
        button: "Explore smartphones",
        buttonColor: "bg-[#0F766E] hover:bg-[#115E59]",
    },
    {
        image: "/images/carousel-headphones3.webp",
        eyebrow: "SOUND THAT INSPIRES",
        title: (
            <>
                Sound that
                <br />
                <span className="text-[#A87845]">moves you.</span>
            </>
        ),
        description:
            "Experience every beat with exceptional clarity.",
        button: "Explore headphones",
        buttonColor: "bg-[#A87845] hover:bg-[#8F6539]",
    },
    {
        image: "/images/carousel-smartwatch3.webp",
        eyebrow: "ALWAYS BY YOUR SIDE",
        title: (
            <>
                Smarter.
                <br />
                Faster.
                <br />
                Always <span className="text-[#D97757]">connected.</span>
            </>
        ),
        description:
            "Stay in control of your day, every day.",
        button: "Explore smartwatches",
        buttonColor: "bg-[#D97757] hover:bg-[#C45F42]",
    },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalSlides = slides.length;

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
        );
    };

    const handleNext = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % totalSlides
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % totalSlides
            );
        }, 4500);

        return () => clearInterval(interval);
    }, [totalSlides]);

    const slide = slides[currentIndex];

    return (
        <div className="relative w-full overflow-hidden rounded-3xl">

            {/* Slide */}
            <div className="relative w-full aspect-[16/6] overflow-hidden">

                {/* Product Image */}
                <Image
                    src={slide.image}
                    alt={slide.button}
                    fill
                    priority={currentIndex === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover object-center transition-opacity duration-700"
                />

                {/* Readability Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-10 md:px-14 lg:px-20">
                        <div className="max-w-xl">

                            {/* Eyebrow */}
                            <p className="mb-4 text-xs md:text-sm font-semibold tracking-[0.2em] text-white/75">
                                {slide.eyebrow}
                            </p>

                            {/* Main heading */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white">
                                {slide.title}
                            </h2>

                            {/* Description */}
                            <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-white/80 whitespace-pre-line">
                                {slide.description}
                            </p>

                            {/* CTA */}
                            <button
                                type="button"
                                className={`
                                    mt-8
                                    inline-flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    active:scale-95
                                    ${slide.buttonColor}
                                `}
                            >
                                {slide.button}

                                <span
                                    aria-hidden="true"
                                    className="text-lg leading-none"
                                >
                                    →
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Previous button */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="
                        absolute
                        left-4
                        top-1/2
                        z-20
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/25
                        text-white
                        backdrop-blur-sm
                        transition-all
                        hover:bg-black/45
                    "
                >
                    <span className="text-3xl leading-none">
                        ‹
                    </span>
                </button>

                {/* Next button */}
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="
                        absolute
                        right-4
                        top-1/2
                        z-20
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/25
                        text-white
                        backdrop-blur-sm
                        transition-all
                        hover:bg-black/45
                    "
                >
                    <span className="text-3xl leading-none">
                        ›
                    </span>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`
                                h-2.5
                                rounded-full
                                transition-all
                                duration-300
                                ${
                                    index === currentIndex
                                        ? "w-8 bg-[#0F766E]"
                                        : "w-2.5 bg-white/70 hover:bg-white"
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
