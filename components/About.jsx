import React from "react";
import Image from "next/image";

export default function About() {
    return (
        <>
            <div className="grid grid-cols-[55%,_45%] min-h-screen w-screen">
                <div className="p-16">
                    <div className="relative h-full w-full">
                        <div className="absolute w-[80%] aspect-square">
                            <Image
                                className="border-primary border-8 object-cover"
                                alt=""
                                src="https://source.unsplash.com/random/?about=1"
                                fill={true}
                            />
                        </div>
                        <div className="absolute w-[40%] aspect-square bottom-0 right-0">
                            <Image
                                className="border-primary border-8 object-cover"
                                alt=""
                                src="https://source.unsplash.com/random/?z=1"
                                fill={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex items-center pr-16">
                    <div>
                        <h1 className="text-3xl font-medium">About Us</h1>
                        <h2 className="font-serif text-5xl mt-12">
                            Supplying Underprivileged Kids The Sports They
                            Should Grow Up With.
                        </h2>
                        <p className="text-gray-500 my-24">
                            The secret to happiness lies in helping others.
                            Never underestimate the differnce you can make in
                            the lives of the poor, the abused, and the helpless
                        </p>
                        <button className="bg-primary px-4 py-3 text-white">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
