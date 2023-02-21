import React from "react";
import { useEffect, useState } from "react";
import { app, db, storage } from "../firebaseConfig.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import Image from "next/image";
import styles from '../styles/styles.module.css';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    // useEffect(
    //     async () => {
    //         // retrieve existing blogs
    //         async function retrieveData() {
    //             const blogs = await getDocs(collection(db, "blogs"));
    //             console.log(blogs);
    //             setBlogs(blogs);
    //         }
    
    //     await retrieveData();
    // }, []);

    return (
        <>
            {/* {blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <img src={blog.image} />
                    <br></br>
                </div>
            ))} */}

            <div className={styles.blogclass}>
                <div className={styles.standardtext}>
                    <h1>Our Blog</h1> <hr className={styles.hr} />
                    <h2>blogblogblogblog</h2>
                    <div className={styles.cardgrid}>
                        <div className={styles.card}>
                            <Image alt="" src="/logo.jpg" width={100} height={100} className={styles.cardimages}/>
                            <h2 className={styles.cardtitle}>Event 1</h2>
                            <p className={styles.cardtext}>
                                In my basement
                            </p>
                        </div>

                        <div className={styles.card}>
                            <Image alt="" src="/logo.jpg" width={100} height={100} className={styles.cardimages}/>
                            <h2 className={styles.cardtitle}>Event 2</h2>
                            <p className={styles.cardtext}>
                            In my basement
                            </p>
                        </div>

                        <div className={styles.card}>
                            <Image alt="" src="/logo.jpg" width={100} height={100} className={styles.cardimages}/>
                            <h2 className={styles.cardtitle}>Event 3</h2>
                            <p className={styles.cardtext}>
                            In my basement
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}