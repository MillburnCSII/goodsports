import React from "react";
import { useEffect, useState } from "react";
import { app, db, storage } from "../firebaseConfig.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import Image from "next/image";

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
    ];

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
                <h2>Latest Blogs</h2>
                <h1 className="text-3xl font-serif mt-2">
                    Our Most Recent Blogs
                </h1>
                <div className="grid grid-cols-3 gap-8 mt-8">
                    {posts.map((post) => (
                        <div
                            className="bg-white drop-shadow-lg rounded-2xl overflow-hidden grid grid-rows-[min-content,_auto]"
                            key={post.id}
                        >
                            <div className="relative w-full aspect-[4/3]">
                                <Image alt="" src={post.image} fill={true} />
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
                                        Enroll Now
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
