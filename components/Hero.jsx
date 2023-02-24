import React from "react";
import Image from "next/image";
import LogoCircle from "./logo-circle";

export default function Hero() {
    return (
        <>
            <div className="grid-cols-1 grid lg:grid-cols-2 h-screen bg-primary gap-8 p-12 md:p-32 w-screen">
                <div className="flex items-end md:items-center justify-center lg:justify-end h-full">
                    <h1 className="text-center lg:text-right font-serif text-5xl sm:text-8xl text-white h-min font-semibold py-2">
                        Millburn
                        <br />
                        Goodsports
                    </h1>
                </div>
                <div className="flex justify-center md:items-center items-start">
                    <div className="w-[min(50vw,50vh)] relative aspect-square">
                        <LogoCircle color="white"/>
                    </div>
                </div>
            </div>
        </>
    );
}
