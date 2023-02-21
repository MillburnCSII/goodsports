import React from "react";
import styles from '../styles/styles.module.css'
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { auth, storage } from '../firebaseConfig.js'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const MarkdownEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

export default function Post() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        
        uploadTask();
        // upload text and file

    }

    function uploadTask() {
        const storageRef = ref(storage, `/files/${x}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          (err) => {
            console.log(err);
          },
          () => {
            // download url
            var url = getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
            });

            // upload text and file
            
            
          }
        );
      }

    function uploadImage(e) {
        e.preventDefault();
        // get the name of the file
        var x = file.name;
        const storageRef = ref(storage, `/files/${x}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          (err) => {
            console.log(err);
          },
          () => {
            // download url
            var url = getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                navigator.clipboard.writeText(url).then((res) => alert("copied + " + url + " to clipboard"));
            });
          }
        );
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


            <form onSubmit={handleSubmit}>
                <label for = "title">Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />
                <br></br>
                <br></br>
                <MarkdownEditor value={text} onChange={setText} data-color-mode="light" />
                <br></br>
            </form>
        </>
    );
}