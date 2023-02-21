import React from "react";
import styles from "../styles/styles.module.css";
import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
// import MDEditor from '@uiw/react-md-editor';
import { auth } from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import mdsource from "next-remove-imports/README.md"

// import MDEditor from "@uiw/react-md-editor";

// const fetch = (...args) => import('@uiw/react-md-editor').then(({default: fetch}) => fetch(...args));


// const MarkdownEditor = dynamic(
//   () => import("@uiw/react-md-editor").then((mod) => mod.default),
//   { ssr: false }
// );

// const MarkdownPreview = dynamic(
//   () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//   { ssr: false }
// );

export default function create_post() {
  const [html, setHTML] = useState(<></>);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [value, setValue] = useState("**Hello World**");
  const router = useRouter();
  // const [othertext, setOtherText] = useState("Hello World");

  

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // return (
      //   <>
      //     <button
      //       onClick={() => {
      //         auth.signOut();
      //         router.push("/admin");
      //       }}
      //     >
      //       Log Out
      //     </button>
      //     <h1 className={styles.h1}>MAKE A POST</h1>
      //     {/* <form onSubmit={handleSubmit}>
      //                   <label htmlFor="title">Title</label>
      //                   <input type="text" id="title" name="title" onChange={e=>setTitle(e.target.value)}/>
      //                   <br></br>
      //                   <label htmlFor="content">Content</label>
      //                   <textarea id="content" name="content" onChange={e=>setContent(e.target.value)}/>
      //                   <br></br>
      //                   <label htmlFor="image">Image</label>
      //                   <input type="file" id="image" name="image" onChange={e=>setFile(e.target.files[0])} />
      //                   <br></br>
      //                   <button type="submit">Submit</button>
      //               </form> */}

      //       <textarea value={value} onChange={e => setValue(e.target.value)} />
      //   </>
      // );

      setHTML(
        <textarea value={value} onChange={e => setValue(e.target.value)} />
      )
    } else {
      typeof window !== "undefined" && router.push("/admin");
      return (
        <>
          You are not logged in, please log in to continue. <br></br>
          If the automatic redirect does not work, please click{" "}
          <a href="./admin">here</a>
        </>
      );
    }
  });

  return html;
}
