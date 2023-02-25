import React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { auth, db } from "../firebaseConfig.js";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import GenericInput from "../components/Generic/GenericInput";
import GenericButton from "../components/Generic/GenericButton";
import {
    ArrowRightOnRectangleIcon,
    PhotoIcon,
} from "@heroicons/react/20/solid";
import ImageUploadModal from "../components/ImageUpload";
import Nav from "../components/Nav";

interface blogPost {
    id: string;
    title: string;
    description: string;
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
    const [files, setFiles] = useState([]);
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

        await setDoc(doc(db, "blog", parsedTitle), newDoc)
            .then((res) => {
                console.log("Document written with ID: ", res);
                alert("Post created! :D");
                router.push("/");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/admin");
            }
        });
    });

    const updateFiles = async (e) => {
        const files2 = Array.from(e.target.files);
        console.log(files2);
        await setFiles(files2);
    };

    return (
        <>
            <Nav position="sticky" />
            <main className="p-8">
                <button
                    onClick={() => {
                        auth.signOut();
                        router.push("/admin");
                    }}
                    className="fixed top-28 right-4 px-4 py-2 bg-primary text-white rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all flex gap-2"
                >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    Log Out
                </button>

                <h1 className="text-2xl">Make A Post</h1>

                <form onSubmit={uploadTask}>
                    <div className="flex gap-4 my-4 md:flex-row flex-col">
                        <GenericInput
                            label="Title"
                            value={title}
                            onChange={setTitle}
                            placeholder="Enter post title"
                            required={true}
                        />
                        <GenericInput
                            label="Author"
                            value={author}
                            onChange={setAuthor}
                            placeholder="Enter the author name"
                            required={true}
                        />
                        <GenericInput
                            label="Cover Image"
                            value={image}
                            onChange={setImage}
                            placeholder="Enter cover image url"
                            required={true}
                        />
                    </div>
                    <div className="mt-4 mb-8">
                        <div className="flex justify-between">
                            <label
                                htmlFor="Summary"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Summary
                            </label>
                            {/* <span className="text-sm text-gray-500">
                                Optional
                            </span> */}
                        </div>
                        <div className="mt-1">
                            <textarea
                                rows={4}
                                name="Summary"
                                id="Summary"
                                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                value={tldr}
                                onChange={(e) => setTldr(e.target.value)}
                                placeholder="Enter a short summary of the post"
                                required={true}
                            />
                        </div>
                    </div>
                    <MarkdownEditor
                        value={text}
                        onChange={(e) => {
                            setText(e);
                            console.log(e);
                        }}
                        data-color-mode="light"
                        textareaProps={{
                            placeholder: "Write the body of your post here!",
                        }}
                        height={400}
                    />
                    <GenericButton type="submit">Submit</GenericButton>
                </form>

                <label
                    className="rounded-full fixed bottom-4 right-4 z-20 p-2 mt-4 bg-primary text-white focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all cursor-pointer"
                    htmlFor="file"
                >
                    {/* <FolderPlusIcon className="w-6 h-6" /> */}
                    <PhotoIcon className="w-6 h-6" />
                    <span className="sr-only">Upload Image</span>
                </label>
                <input
                    type="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={updateFiles}
                    className="sr-only"
                    name="file"
                />

                <ImageUploadModal files={files} setFiles={setFiles} />

                {/* <span className="hidden" ref={ref}>
                {def}
            </span> */}
            </main>
        </>
    );
}
