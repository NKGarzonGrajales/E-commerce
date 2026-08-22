"use client";
import {login} from "../../api/authAPI";
import {validateLoginForm} from "@/helpers/validate";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Toast} from "@/helpers/index";
import {IUserData, ILoginErrors} from "@/interfaces/types";
import {useRouter} from "next/navigation";

const Login = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
    };

    const [userData, setUserData] = useState<IUserData>(initialState);
    const [errors, setErrors] = useState<ILoginErrors>(initialState);
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await login(userData);
            if (!response || !response.token || !response.user) {
                throw new Error("Invalid response from server");
            }

            const {token, user} = response;
            Cookies.set("userData", JSON.stringify({token, user}), {expires: 1});
            Toast.fire({
                icon: "success",
                iconColor: "green",
                title: "login successful",
            });
            router.push("/");
        } catch (error) {
            Toast.fire({
                icon: "error",
                iconColor: "red",
                title: "Failed to log in",
            });
            console.log(error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    useEffect(() => {
        const errors = validateLoginForm(userData);
        setErrors(errors);
    }, [userData]);

    return (
        <div className="flex flex-col items-center text-center mt-16 text-[#172023]">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-[#172023]">Sign in to NidZone</h1>

            <form
                onSubmit={handleSubmit}
                className="mb-20 w-full max-w-md rounded-2xl border border-[#DDE5E1] bg-white p-8 shadow-sm"
            >
                <div className="mb-5">
                    <label className="mb-2 block text-base font-semibold text-[#42545A]" htmlFor="email_address">
                        Email:
                    </label>
                    <input
                        id="email_address"
                        type="email"
                        name="email"
                        value={userData.email}
                        placeholder="emailname@example.com"
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#DDE5E1] bg-[#F8FAF9] px-3 py-2.5 text-[#172023] placeholder:text-[#899491] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                    {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-2 mb-5">
                    <label className="mb-2 block text-base font-semibold text-[#42545A]" htmlFor="password">
                        Password:
                    </label>
                    <div className="relative flex items-center">
                        <input
                            id="password"
                            type={`${visible ? "password" : "text"}`}
                            name="password"
                            value={userData.password}
                            placeholder="********"
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#DDE5E1] bg-[#F8FAF9] px-3 py-2.5 text-[#172023] placeholder:text-[#899491] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                        />
                        <button
                            type="button"
                            onClick={() => setVisible(!visible)}
                            className="absolute right-3 text-[#6B7775] transition-colors hover:text-[#0F766E]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5c4.137 0 7.65 2.54 9 6-1.35 3.46-4.863 6-9 6s-7.65-2.54-9-6c1.35-3.46 4.863-6 9-6z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                            </svg>
                        </button>
                    </div>
                    {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0F766E] px-4 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#115E59] hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
