import React from "react";
import { useEffect, useState } from "react";
import { app, db, storage } from "../firebaseConfig.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

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

    return (
        <>
            <h1>BLOG</h1>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <img src={blog.image} />
                    <br></br>
                </div>
            ))}
        </>
    );
}