import React from "react";
import {FaFacebookF, FaTwitter, FaInstagram} from "react-icons/fa";
import {HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone} from "react-icons/hi";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#172023] py-12 text-[#F7F8F6] w-full px-6">
            <div className="w-[85%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col justify-between items-baseline space-y-4">
                    <div className="flex space-x-2 mb-2">
                        <HiOutlineLocationMarker size={24} className="text-[#DDE5E1]" />
                        <span className="text-[#DDE5E1] mb-1 text-xs">123 Main Street, Bogotá, Colombia</span>
                    </div>
                    <div className="flex space-x-2 mb-2">
                        <HiOutlinePhone size={24} className="text-[#DDE5E1]" />
                        <span className="text-[#DDE5E1] text-xs">+57 1 2345678</span>
                    </div>
                    <div className="flex space-x-2 mb-3">
                        <HiOutlineMail size={24} className="text-[#DDE5E1]" />
                        <span className="text-[#DDE5E1] text-xs">contact@mywebsite.com</span>
                    </div>
                </div>

                <div className="flex flex-col items-start space-y-4">
                    <h2 className="text-sm font-bold text-white">SIGN UP FOR UPDATES</h2>
                    <p className="text-[#DDE5E1] text-xs mt-2 hover:text-[#0F766E]">
                        Promotions, new products, and discounts. Directly to your inbox.
                    </p>
                    <div className="flex mt-4 w-full">
                        <Link href="/signup">
                            <button className="px-4 py-2 bg-[#D97757] text-white hover:bg-[#C46348] transition-colors duration-300 text-xs">
                                SUBSCRIBE
                            </button>
                        </Link>
                    </div>
                </div>

                <Link
                    href="/login"
                    className="text-[#DDE5E1] hover:text-[#0F766E] transition-colors duration-300 text-center text-xs"
                >
                    About NidZone
                    <p className="text-justify text-xs mt-4 mr-4">
                        NidZone is a technology e-commerce platform created by NKGG, offering quality technology products at
                        affordable prices. Built with modern tools like Next.js and React, it provides a user-friendly
                        experience, dynamic product displays, and secure shopping, all aimed at giving customers the
                        best value for their money.
                    </p>
                </Link>
                <Link
                    href="/login"
                    className="text-[#DDE5E1] hover:text-[#0F766E] transition-colors duration-300 text-center text-xs"
                >
                    Policies & Information
                    <p className="text-justify text-xs mt-4">
                        For more details on our policies, including terms of service, privacy guidelines, and shipping
                        info, please feel free to contact us directly. We are here to help!
                    </p>
                </Link>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="mt-8 flex justify-center space-x-6">
                    <a
                        href="https://www.facebook.com"
                        className="text-[#DDE5E1] hover:text-[#D97757] transition-colors duration-300"
                    >
                        <FaFacebookF size={20} />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        className="text-[#DDE5E1] hover:text-[#D97757] transition-colors duration-300"
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        className="text-[#DDE5E1] hover:text-[#D97757] transition-colors duration-300"
                    >
                        <FaInstagram size={20} />
                    </a>
                </div>
                <div className="w-full mt-8 flex justify-center">
                    <p className="text-center text-[#7A8784] text-sm">
                        &copy; © 2026 NidZone. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
