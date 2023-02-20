import React from "react";
import styles from '../styles/styles.module.css'
import { useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useRouter} from 'next/router'

export default function Post() {
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
    }

    
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            router.push('/admin')
        }
    });

    return (
        <>
            <h1 className={styles.h1}>MAKE A POST</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
                <br></br>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" />
                <br></br>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" />
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}