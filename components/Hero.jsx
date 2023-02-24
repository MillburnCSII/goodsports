import React from "react";
import Image from "next/image";
import LogoCircle from "./logo-circle";

export default function Hero() {
    return (
        <>
            <div className="grid grid-cols-2 h-screen bg-primary gap-8 p-32">
                <div className="flex items-center justify-end h-full">
                    <h1 className="text-right font-serif text-8xl text-white h-min font-semibold">
                        Millburn
                        <br />
                        Goodsports
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-[min(50vw,50vh)] relative aspect-square">
                        <LogoCircle color="white"/>
                    </div>
                </div>
            </div>
        </>
    );
}
