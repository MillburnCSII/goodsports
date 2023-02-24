import React from "react";
import { useEffect, useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { auth, storage, db } from "../firebaseConfig.js";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc, Timestamp } from "firebase/firestore";

interface blogPost {
    id: string;
    title: string;
    description?: string;
    image: string;
    author: string;
    date: Timestamp;
    content: string;
}

const MarkdownEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

export default function Post() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [tldr, setTldr] = useState("");
    const [image, setImage] = useState("");
    const [author, setAuthor] = useState("");

    async function uploadTask(e) {
        e.preventDefault();
        const parsedTitle = title // Make the title url safe
            .replace(/\s+/g, "-") // Replace spaces with -
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9-]/g, "") // Remove all remaining unsafe chars
            .replace(/--+/g, "-"); // Replace multiple - with single -

        const newDoc: blogPost = {
            id: parsedTitle,
            title,
            description: tldr,
            image,
            author,
            date: new Timestamp(new Date().getTime() / 1000, 0),
            content: text,
        };

        await setDoc(doc(db, "Posts", parsedTitle), {
            title: title,
            content: text,
        })
            .then((res) => {
                console.log("Document written with ID: ", res);
                alert("Post created! :D");
                router.push("/");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    function uploadImage(e) {
        e.preventDefault();
        // get the name of the file
        var x = file.name;
        const storageRef = ref(storage, `/files/${x}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    navigator.clipboard
                        .writeText(url)
                        .then((res) =>
                            alert("copied + " + url + " to clipboard")
                        );
                });
            }
        );
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/admin");
            }
        });
    }, []);

    return (
        <main className="p-8">
            <button
                onClick={() => {
                    auth.signOut();
                    router.push("/admin");
                }}
                className="absolute top-0 right-0 px-4 py-2 m-2 bg-primary text-white rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all"
            >
                Log Out
            </button>

            <h1 className="text-2xl">Make A Post</h1>

            <form onSubmit={uploadTask}>
                <div className="grid grid-cols-[min-content,min-content] lg:flex gap-4 mb-8">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mt-2"
                        >
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                                name="title"
                                placeholder="Enter post title"
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                required={true}
                                className="shadow-sm focus-visible:outline-none px-3 py-2 border sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="author"
                            className="block text-sm font-medium text-gray-700 mt-2"
                        >
                            Author
                        </label>
                        <div className="mt-1">
                            <input
                                name="author"
                                placeholder="Enter the author name"
                                type="text"
                                onChange={(e) => setAuthor(e.target.value)}
                                required={true}
                                className="shadow-sm focus-visible:outline-none px-3 py-2 border sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="summary"
                            className="block text-sm font-medium text-gray-700 mt-2"
                        >
                            Summary (optional)
                        </label>
                        <div className="mt-1">
                            <input
                                name="summary"
                                placeholder="Enter short summary"
                                type="text"
                                onChange={(e) => setTldr(e.target.value)}
                                className="shadow-sm focus-visible:outline-none px-3 py-2 border sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 mt-2"
                        >
                            Cover Image
                        </label>
                        <div className="mt-1">
                            <input
                                name="image"
                                placeholder="Enter cover image url"
                                type="text"
                                onChange={(e) => setImage(e.target.value)}
                                required={true}
                                className="shadow-sm focus-visible:outline-none px-3 py-2 border sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <MarkdownEditor
                    value={text}
                    onChange={setText}
                    data-color-mode="light"
                    textareaProps={{
                        placeholder: "Write the body of your post here!",
                    }}
                />

                <button
                    type="submit"
                    className="px-4 py-2 mt-4 bg-primary text-white rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all"
                >
                    Submit
                </button>
            </form>

            <hr className="my-8" />

            <h1 className="text-2xl">Upload a Image</h1>
            <form onSubmit={uploadImage} className="flex flex-col items-start">
                <label
                    htmlFor="file"
                    className="text-sm font-medium text-gray-700 mt-2 underline cursor-pointer underline-offset-2"
                >
                    Upload File
                </label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="sr-only"
                    name="file"
                    id="file"
                />
                <button
                    type="submit"
                    className="px-4 py-2 mt-4 bg-primary text-white rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all"
                >
                    Upload
                </button>
            </form>
        </main>
    );
}
