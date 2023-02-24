import React from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { app, db, storage, auth } from "../firebaseConfig.js";
import Router from "next/router.js";
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import removeMarkdownAndHtml from "remove-markdown-and-html";
import Link from "next/link";

export default function Blogs({ blogs }) {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    return (


        <>
            <input type="text" placeholder="Search" onChange = {(e) => {
                // setSearchTerm(e.target.value)
                const searchTerm = e.target.value;
                setFilteredBlogs(
                    searchTerm.length > 0 ? blogs.filter((blog) => {
                        blog = blog;
                        console.log(blog);
                        console.log(searchTerm);
                        const one = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
                        console.log(`one: ${one}`);
                        const cleanContent = removeMarkdownAndHtml(blog.content);
                        const two = cleanContent.toLowerCase().includes(searchTerm.toLowerCase())
                        console.log(`two: ${two}`);
                        return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase())
                }) : blogs)
                console.log(filteredBlogs)
            }}/>
            { filteredBlogs.map((blog) => {
                return (
                    <div className="blog my-8">
                        <div className="prose mb-4">
                            <h1>{blog.title}</h1>
                            <p>{blog.date}</p>
                            <p>{blog.description}</p>
                        </div>

                        <Link href={`/blogs/${blog.id}`} className="border-primary text-primary border-2 rounded-md px-6 py-2 hover:bg-primary hover:text-white transition-all">
                            Read More
                        </Link>
                    </div>
                );
            })
            }
        </>
    );
}

export async function getServerSideProps() {
    const descriptionGenerator = (filtered) => {
        console.log(Intl.Segmenter)
        if (Intl.Segmenter === undefined) {
            // BECAUSE FUCKING FIREFOX DOESN'T SUPPORT IT
            const regex = /(.+?([A-Z].)[\.|\?|\!](?:['")\\\s]?)+?\s?)/gim;
            const sentences = filtered.match(regex);
            return sentences[1] + sentences[2] ? sentences[2].slice(0, -2) : "" + "..." ;
        } else {
            const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
            const iterator1 = segmenter.segment(filtered)[Symbol.iterator]();
            iterator1.next();
            const sentence2 = iterator1.next();
            const sentence3 = iterator1.next();

            return(
                sentence2.value.segment +
                sentence3.value.segment.slice(0, -2) +
                "..."
            );
        }
    }

    // const docRef = doc(db, "Posts", "Test Post");
    const blogs_fb = await getDocs(collection(db, "blog"));
    const blogs = [];
    blogs_fb.forEach(async (blog) => {
        const id = blog.id;
        var data = blog.data();
        data.date = data.date.toDate().getTime();
        data.content = (await remark().use(remarkGfm).use(html).processSync(data.content)).toString();
        if (!data.description) {
            const filtered = removeMarkdownAndHtml(data.content);
            data.description = descriptionGenerator(filtered);
        }

        data.id = id;
        blogs.push( data );
    })


    console.log("blogs here");
    console.log(blogs);

    

    return { props: { blogs } };
}