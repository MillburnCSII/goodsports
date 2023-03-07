import React from "react";
import Image from "next/image";

export default function About() {
    return (
        <>
            <div className="lg:grid grid-cols-[55%,_45%] xl:min-h-screen lg:min-h-[80vh] w-screen">
                <div className="hidden lg:block p-16">
                    <div className="relative h-full w-full">
                        <div className="lg:absolute w-[80%] aspect-square 2xl:top-0 top-16">
                            <Image
                                className="border-primary border-8 object-cover"
                                alt=""
                                src="https://source.unsplash.com/random/?about=1"
                                fill={true}
                            />
                        </div>
                        <div className="flex absolute w-[40%] aspect-square bottom-16 right-0 2xl:mb-0">
                            <Image
                                className="border-primary border-8 object-cover "
                                alt=""
                                src="https://source.unsplash.com/random/?z=1"
                                fill={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex items-center p-10 sm:p-16 lg:pl-0 lg:py-0">
                    <div className="w-full">
                        <h1 className="text-2xl sm:text-3xl font-medium">About Us</h1>
                        <h2 className="font-serif text-4xl sm:text-5xl mt-12">
                            Supplying Underprivileged Kids The Sports They
                            Should Grow Up With.
                        </h2>
                        <p className="text-gray-500 mt-12 sm:mt-24">
                            The secret to happiness lies in helping others.
                            Never underestimate the differnce you can make in
                            the lives of the poor, the abused, and the helpless
                        </p>
                        {/* <button className="bg-primary px-4 py-3 text-white">
                            Read More
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
