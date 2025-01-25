import {IUserSession} from "@/interfaces/types";
import {cookies} from "next/headers";
import React from "react";

const UserDashboard = async () => {
    const cookieStore = await cookies();
    const userData: IUserSession = JSON.parse(cookieStore.get("userData")?.value ?? "{}");

    return (
        <div className="bg-background max-w-2xl mb-10 mx-auto p-6 bg-[#dcdcdc] shadow-lg rounded-2xl border-b-2 border-orange-300 mt-10">
            <h1 className="text-3xl font-serif font-light text-gray-800 mb-6 text-center opacity-90 text-stroke-white">
                Your User Profile
            </h1>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm ">
                    <h2 className="text-xl font-serif font-light text-gray-800 text-stroke-white">Your name:</h2>
                    <p className="text-lg text-gray-700">{userData?.user?.name ?? "Unknown"}</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-serif font-light text-gray-800 text-stroke-white">Your e-mail:</h2>
                    <p className="text-lg text-gray-700">{userData.user.email}</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl ffont-serif font-light text-gray-800 text-stroke-white">
                        Your shipping address:
                    </h2>
                    <p className="text-lg text-gray-700">{userData.user.address}</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-serif font-light text-gray-800 text-stroke-white">Your phone:</h2>
                    <p className="text-lg text-gray-700">{userData.user.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
