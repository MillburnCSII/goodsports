import React from "react";
import styles from '../styles/styles.module.css'
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { auth, storage, db } from '../firebaseConfig.js'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const MarkdownEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

export default function Post() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");

    async function uploadTask(e) {
        e.preventDefault();
        await setDoc(doc(db, "Posts", title), {
            title: title,
            content: text
        }).then((res) => {
            console.log("Document written with ID: ", res);
            alert("Post created! :D")
            router.push("/");
        }
        ).catch((error) => {
            console.error("Error adding document: ", error);
        }
        );
      }

    function uploadImage(e) {
        e.preventDefault();
        // get the name of the file
        var x = file.name;
        const storageRef = ref(storage, `/files/${x}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
            }
        }, (error) => {
            console.error(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                navigator.clipboard.writeText(url).then((res) => alert("copied + " + url + " to clipboard"));
            });
        });
    }

    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/admin')
            }
        });
    }, [])
    

    return (
        <>
            <button
                onClick={() => {
                auth.signOut();
                router.push("/admin");
                }}
            >Log Out</button>
            
            <h1 style = {{"color": "black"}}>MAKE A POST</h1>
            
            <h2 style = {{"color": "black"}}>Upload images</h2>
            <form onSubmit = {uploadImage}>
                <br></br>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <br></br>
                <br></br>
                <button type="submit">Upload</button>
            </form>
            <br></br>


            <form onSubmit={uploadTask}>
                <label for = "title">Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />
                <br></br>
                <br></br>
                <MarkdownEditor value={text} onChange={setText} data-color-mode="light" />
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}