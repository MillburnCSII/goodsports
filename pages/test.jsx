import { useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

export default function Test({ data, mdHTML }) {
  
  return (
    <>
      <h1>Hello World</h1>
      <div style={{"color": "black", "white-space": "pre-line"}} dangerouslySetInnerHTML={{__html: mdHTML}}></div>
    </>
  )
}

export async function getServerSideProps() {
  const docRef = doc(db, "Posts", "Test Post");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  const processedMD = await remark().use(remarkGfm).use(html).process(data.content);
  const mdHTML = processedMD.toString();
  
  return { props: { data, mdHTML } };
}