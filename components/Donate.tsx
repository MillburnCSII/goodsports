import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface goalProject {
    id: number;
    title: string;
    catergory: string;
    description: string;
    image: string;
    goal: number;
    current: number;
}

export default function Donate() {
    const projects: goalProject[] = [
        {
            id: 1,
            title: "Soccer for All!",
            catergory: "Category 2",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, distinctio.",
            image: "https://source.unsplash.com/random/",
            goal: 1000,
            current: 500,
        },
        {
            id: 2,
            title: "Flag football in rural areas",
            catergory: "Category 1",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quaerat accusantium alias!",
            image: "https://source.unsplash.com/random/?asd=2",
            goal: 900,
            current: 750,
        },
        {
            id: 3,
            title: "Baseball",
            catergory: "Category 2",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi.",
            image: "https://source.unsplash.com/random/?er=2",
            goal: 350,
            current: 350,
        },
        {
            id: 4,
            title: "Basketball",
            catergory: "Category 3",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            image: "https://source.unsplash.com/random/?asd=3",
            goal: 800,
            current: 100,
        },
        {
            id: 5,
            title: "Volleyball",
            catergory: "Category 1",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            image: "https://source.unsplash.com/random/?gf=4",
            goal: 700,
            current: 500,
        },
        {
            id: 6,
            title: "Tennis",
            catergory: "Category 2",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            image: "https://source.unsplash.com/random/?gb=5",
            goal: 500,
            current: 300,
        },
    ];

    const [offset, setOffset] = useState(0);
    const [style, setStyle] = useState({
        transform: `translateX(${offset}%)`,
    });

    const step = (1 / 6) * 100;

    const handleIncrement = () => {
        if (offset >= 49) return alert("over!");
        setOffset(offset + step);
        setStyle({ transform: `translateX(${-(offset + step)}%)` });
    };

    const handleDecrement = () => {
        if (offset <= 0) return alert("under!");
        setOffset(offset - step);
        setStyle({ transform: `translateX(${-(offset - step)}%)` });
    };

    return (
        <>
            <div className="p-16">
                <div className="flex justify-between items-end">
                    <div>
                        <h2>Be a part of the Cause</h2>
                        <h1 className="text-3xl font-serif mt-2">Donate Now</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="bg-primary text-secondary h-12 w-12 rounded-full focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-2 transition-all p-2 flex justify-center items-center  disabled:bg-gray-500 disabled:text-gray-300"
                            onClick={handleDecrement}
                            disabled={offset <= 0}
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            className="bg-primary text-secondary h-12 w-12 rounded-full focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-2 transition-all p-2 flex justify-center items-center  disabled:bg-gray-500 disabled:text-gray-300"
                            onClick={handleIncrement}
                            disabled={offset >= 49}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
                <div className="">
                    <div
                        className="grid grid-cols-6 gap-8 mt-8 w-[200%] transition-all duration-500"
                        style={style}
                    >
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white drop-shadow-lg rounded-2xl p-8 grid grid-rows-[min-content,_auto]"
                            >
                                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                                    <Image
                                        className="object-cover"
                                        alt=""
                                        src={project.image}
                                        fill={true}
                                    />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="mt-4 text-gray-500 text-sm">
                                            {project.catergory}
                                        </h2>
                                        <h1 className="text-xl mt-2">
                                            {project.title}
                                        </h1>
                                        <p className="text-gray-500 mt-2">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex my-4 gap-4">
                                            <div className="w-full bg-secondary rounded-full">
                                                <div
                                                    className="rounded-full bg-primary h-full"
                                                    style={{
                                                        width: `${
                                                            (project.current /
                                                                project.goal) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <p>
                                                {Math.trunc(
                                                    (project.current /
                                                        project.goal) *
                                                        100
                                                )}
                                                %
                                            </p>
                                        </div>
                                        <button className="border-primary text-primary border-2 rounded-full mx-auto block px-6 py-2 hover:bg-primary hover:text-white focus-within:bg-primary focus-within:text-white focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all mt-6">
                                            Donate Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
