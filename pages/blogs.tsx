import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import removeMarkdownAndHtml from "remove-markdown-and-html";
import Link from "next/link";
import BlogCard from "../components/BlogCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Nav from "../components/Nav";

export default function Blogs({ blogs }) {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setFilteredBlogs(
            searchTerm.length > 0
                ? blogs.filter((blog) => {
                      blog = blog;
                      console.log(blog);
                      console.log(searchTerm);

                      const one = blog.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());
                      console.log(`one: ${one}`);
                      if (one) return true;

                      const cleanContent = removeMarkdownAndHtml(blog.content);
                      const two = cleanContent
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());
                      console.log(`two: ${two}`);
                      if (two) return true;

                      if (blog.description) {
                          const three = blog.description
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase());
                          console.log(`three: ${three}`);
                          if (three) return true;
                      }
                      return false;
                  })
                : blogs
        );
        console.log(filteredBlogs);
    }, [blogs, filteredBlogs, searchTerm]);

    return (
        <>
            <Nav position="sticky" />
            <main className="px-12 sm:px-24 py-12">
                <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            id="search"
                            name="search"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Search"
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <h2 className="my-8 text-gray-700 text-sm">
                    {filteredBlogs.length} Results
                </h2>
                <ul className="flex flex-col sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredBlogs.map((blog) => (
                        <BlogCard post={blog} key={blog.id} />
                    ))}
                </ul>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const descriptionGenerator = (filtered) => {
        console.log(Intl.Segmenter);
        if (Intl.Segmenter === undefined) {
            // BECAUSE FUCKING FIREFOX DOESN'T SUPPORT IT
            const regex = /(.+?([A-Z].)[\.|\?|\!](?:['")\\\s]?)+?\s?)/gim;
            const sentences = filtered.match(regex);
            return sentences[1] + sentences[2]
                ? sentences[2].slice(0, -2)
                : "" + "...";
        } else {
            const segmenter = new Intl.Segmenter("en", {
                granularity: "sentence",
            });
            const iterator1 = segmenter.segment(filtered)[Symbol.iterator]();
            iterator1.next();
            const sentence2 = iterator1.next();
            const sentence3 = iterator1.next();

            return (
                sentence2.value.segment +
                sentence3.value.segment.slice(0, -2) +
                "..."
            );
        }
    };

    // const docRef = doc(db, "Posts", "Test Post");
    const blogs_fb = await getDocs(collection(db, "blog"));
    const blogs = [];
    blogs_fb.forEach(async (blog) => {
        const id = blog.id;
        const data = blog.data();
        data.date = data.date.toDate().getTime();
        data.content = (
            await remark().use(remarkGfm).use(html).processSync(data.content)
        ).toString();
        if (!data.description) {
            const filtered = removeMarkdownAndHtml(data.content);
            data.description = descriptionGenerator(filtered);
        }

        data.id = id;
        blogs.push(data);
    });

    console.log("blogs here");
    console.log(blogs);

    return { props: { blogs } };
}
