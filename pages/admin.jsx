import React from "react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { app, db, storage, auth } from "../firebaseConfig.js";
import Router from "next/router.js";

export default function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
               Router.push('/create_post') 
            }
        });
    })
    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");

        signInWithEmailAndPassword(auth, email, password).then(() => {
            console.log("logged in!!");
            Router.push('/create_post')
        }).catch((error) => {
            console.error('Error signing in', error);
            alert("wrong password or email!!")
        });
    }

    return (
        <>
            <h1>ADMIN</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={e=>setEmail(e.target.value)} />
                <br></br>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={e=>setPassword(e.target.value)} />
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}