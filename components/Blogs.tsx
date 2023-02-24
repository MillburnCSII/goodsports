import React from "react";
import { useEffect, useState } from "react";
import { app, db, storage } from "../firebaseConfig.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface blogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
}

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    // useEffect(
    //     async () => {
    //         // retrieve existing blogs
    //         async function retrieveData() {
    //             const blogs = await getDocs(collection(db, "blogs"));
    //             console.log(blogs);
    //             setBlogs(blogs);
    //         }

    //     await retrieveData();
    // }, []);

    const posts: blogPost[] = [
        {
            id: 1,
            title: "Charity Event - Soccer, Football, Fun and Games!",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.",
            image: "https://source.unsplash.com/random/?card=4",
            author: "Ester Howard",
            date: "12 Sep 2021",
        },
        {
            id: 2,
            title: "Children We Work With",
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.",
            image: "https://source.unsplash.com/random/?card=5",
            author: "Jacob Jones",
            date: "22 Aug 2021",
        },
        {
            id: 3,
            title: "5k Run in the Wind",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.",
            image: "https://source.unsplash.com/random/?card=6",
            author: "Floyd Miles",
            date: "30 Jul 2021",
        },
        {
            id: 4,
            title: "Boston Marathon",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.",
            image: "https://source.unsplash.com/random/?card=7",
            author: "Henry Rollock",
            date: "12 Jan 2021",
        },
        {
            id: 5,
            title: "Boston Legends of the Ball",
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.",
            image: "https://source.unsplash.com/random/?card=8",
            author: "Katrina Younce",
            date: "20 Aug 2022",
        },
        {
            id: 6,
            title: "Meet our 2022 New York City Marathon Runners",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.",
            image: "https://source.unsplash.com/random/?card=9",
            author: "Margaret Norton",
            date: "12 Nov 2022",
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
            {/* {blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <img src={blog.image} />
                    <br></br>
                </div>
            ))} */}

            <div className="p-16">
                <div className="flex justify-between items-end">
                    <div>
                        <h2>Latest Blogs</h2>
                        <h1 className="text-3xl font-serif mt-2">
                            Our Most Recent Blogs
                        </h1>
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
                <div
                    className="grid grid-cols-6 gap-8 mt-8 w-[200%] transition-all duration-500"
                    style={style}
                >
                    {posts.map((post) => (
                        <div
                            className="bg-white drop-shadow-lg rounded-2xl overflow-hidden grid grid-rows-[min-content,_auto]"
                            key={post.id}
                        >
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    className="object-cover"
                                    alt=""
                                    src={post.image}
                                    fill={true}
                                />
                            </div>
                            <div className="p-8 flex flex-col justify-between gap-4">
                                <div className="flex gap-2 flex-col">
                                    <div className="grid grid-cols-2 gap-4 text-gray-500 text-sm">
                                        <h2>{post.author}</h2>
                                        <h2>{post.date}</h2>
                                    </div>
                                    <h1 className="text-primary font-serif text-2xl">
                                        {post.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {post.description}
                                    </p>
                                </div>
                                <div>
                                    <button className="border-primary text-primary border-2 rounded-md px-6 py-2 hover:bg-primary hover:text-white transition-all">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
