import React from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { app, db, storage, auth } from "../firebaseConfig.js";
import Router from "next/router.js";
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

export default function Blogs({ blogs }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <input type="text" placeholder="Search" onChange = {(e) => setSearchTerm(e.target.value)}/>
            { blogs ? blogs.map((blog) => { 
                // if (blog.includes(searchTerm)) {
                //     return <div style = {{"display" : "block"}}>{blog[1]}</div>;
                // }
                // else {
                //     return <div style = {    {"display" : "none"}}>{blog[1]}</div>;
                // }
                return <div>{blog['title']}{blog['content']}</div>;
                
            }) : <h1>Loading...</h1> }
        </>
    );
}

export async function getServerSideProps() {
    // const docRef = doc(db, "Posts", "Test Post");
    const blogs_fb = await getDocs(collection(db, "Posts"));
    const blogs = [];
    blogs_fb.forEach((blog) => {
        blogs.push(
            blog.data()
        );
    })
    console.log("blogs here");
    console.log(blogs);

    return { props: { blogs } };
}