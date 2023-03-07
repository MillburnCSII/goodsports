import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoCircle from "./logo-circle";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Nav({ position = "fixed" }) {
    const socials: string[] = [
        "twitter",
        "facebook",
        "linkedin",
        "instagram",
        "youtube",
    ];

    return (
        <nav
            className={`top-0 left-0 w-screen bg-primary lg:px-40 py-4 flex items-center justify-between z-50 px-20 ${position}`}
        >
            <div className="flex items-center">
                <Link
                    href="/#"
                    className="rounded-full bg-white h-16 w-16 hover:bg-[#ff5480] transition-all"
                >
                    <LogoCircle />
                </Link>
                <div className="hidden sm:flex gap-2 mx-8">
                    {socials.map((social) => (
                        <Link
                            href="/#"
                            className="rounded-full bg-white h-8 w-8 hover:bg-[#ff5480] transition-all p-2"
                            key={social}
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    alt={social}
                                    src={`/social/${social}.svg`}
                                    fill={true}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex gap-4">
                <button className="p-1">
                    <Bars3Icon className="h-6 w-6 text-white" />
                </button>
                {/* <button className="p-1">
                    <MagnifyingGlassIcon className="h-6 w-6 text-white" />
                </button> */}
            </div>
        </nav>
    );
}
