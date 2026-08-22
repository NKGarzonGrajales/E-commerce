"use client";
import React, {useEffect, useState} from "react";
import {Toast} from "@/helpers";
import {register, isFormSignUpFull} from "@/app/api/authAPI";
import {validateSignupForm} from "@/helpers/validate";
import {useRouter} from "next/navigation";
import {ISignUpData, TSignUpErrors} from "@/interfaces/types";

const Signup = () => {
    const router = useRouter();
    const initialState: ISignUpData = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
    };

    const [userData, setUserData] = useState<ISignUpData>(initialState);
    const [errors, setErrors] = useState<TSignUpErrors>(initialState);
    const [touched, setTouched] = useState(false);

    const isFormValid = isFormSignUpFull(userData) && Object.keys(errors).length === 0;

    const resetForm = () => {
        setUserData(initialState);
        setErrors({});
        setTouched(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formErrors = validateSignupForm(userData);
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            try {
                const registrationResult = await register(userData);

                if (registrationResult) {
                    Toast.fire({
                        icon: "success",
                        iconColor: "green",
                        title: "User successfully registered",
                    });
                    router.push("/login");
                } else {
                    Toast.fire({
                        icon: "error",
                        iconColor: "red",
                        title: "Could not complete registration",
                    });
                    resetForm();
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error en el registro:", error);
                Toast.fire({
                    icon: "error",
                    iconColor: "red",
                    title: "Could not complete registration",
                });
            }
        } else {
            setTouched(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setTouched(true);
    };

    useEffect(() => {
        if (touched) {
            const validationErrors = validateSignupForm(userData);
            setErrors(validationErrors);
        }
    }, [userData, touched]);

    return (
        <div className="flex flex-col items-center text-center mt-16 text-[#172023]">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-[#172023]">
                Create your NidZone account
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-[#DDE5E1] mt-10 mb-20"
            >
                <div className="mb-5">
                    <label className="block text-[#42545A] text-base font-semibold mb-2" htmlFor="email_address">
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
                    {touched && errors.email && <span className="mt-1 block text-sm text-red-600">{errors.email}</span>}
                </div>

                <div className="mb-5">
                    <label className="block text-[#42545A] text-base font-semibold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={userData.password}
                        placeholder="A123b45"
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#DDE5E1] bg-[#F8FAF9] px-3 py-2.5 text-[#172023] placeholder:text-[#899491] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                    {touched && errors.password && <span className="mt-1 block text-sm text-red-600">{errors.password}</span>}
                </div>

                <div className="mb-5">
                    <label className="block text-[#42545A] text-base font-semibold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={userData.name}
                        placeholder="Adele Thor"
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#DDE5E1] bg-[#F8FAF9] px-3 py-2.5 text-[#172023] placeholder:text-[#899491] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                    {touched && errors.name && <span className="mt-1 block text-sm text-red-600">{errors.name}</span>}
                </div>

                <div className="mb-5">
                    <label className="block text-[#42545A] text-base font-semibold mb-2" htmlFor="address">
                        Address:
                    </label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={userData.address}
                        placeholder="Town, Country"
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#DDE5E1] bg-[#F8FAF9] px-3 py-2.5 text-[#172023] placeholder:text-[#899491] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                    {touched && errors.address && <span className="mt-1 block text-sm text-red-600">{errors.address}</span>}
                </div>

                <div className="mb-5">
                    <label className="block text-[#42545A] text-base font-semibold mb-2" htmlFor="phone">
                        Phone:
                    </label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={userData.phone}
                        placeholder="571234567"
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#DDE5E1] bg-[#F8FAF9] px-3 py-2.5 text-[#172023] placeholder:text-[#899491] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
                    />
                    {touched && errors.phone && <span className="mt-1 block text-sm text-red-600">{errors.phone}</span>}
                </div>

                <button
                    disabled={!isFormValid}
                    type="submit"
                    className="w-full rounded-xl bg-[#D97757] px-4 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#C46348] hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#D97757]/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
