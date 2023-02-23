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

            <div className={styles.blog}>
                <h2>Latest Blogs</h2>
                <h1>Our Most Recent Blogs</h1>
                <div className={styles.cardgrid}>
                    <div className={styles.card}>
                        <img alt="" src="https://source.unsplash.com/random/?card=4" className={styles.cardimages}/>
                        <div className={styles.cardtext}>
                            <div>
                                <div className={styles.cardDetails}>
                                    <h2 className={styles.cardauthor}>Ester Howard</h2>
                                    <h2 className={styles.cardDate}>12 Sep 2021</h2>
                                </div>
                                <h1 className={styles.cardtitle}>Charity Event - Soccer, Football, Fun and Games!</h1>
                                <p className={styles.cardDescription}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.
                                </p>
                            </div>
                            <div>
                                <button>Enroll Now</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <img alt="" src="https://source.unsplash.com/random/?card=5" className={styles.cardimages}/>
                        <div className={styles.cardtext}>
                            <div>
                                <div className={styles.cardDetails}>
                                    <h2 className={styles.cardauthor}>Jacob Jones</h2>
                                    <h2 className={styles.cardDate}>22 Aug 2021</h2>
                                </div>
                                <h1 className={styles.cardtitle}>Children We Work With</h1>
                                <p className={styles.cardDescription}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.
                                </p>
                            </div>
                            <div>
                                <button>Enroll Now</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <img alt="" src="https://source.unsplash.com/random/?card=6" className={styles.cardimages}/>
                        <div className={styles.cardtext}>
                            <div>
                                <div className={styles.cardDetails}>
                                    <h2 className={styles.cardauthor}>Floyd Miles</h2>
                                    <h2 className={styles.cardDate}>30 Jul 2021</h2>
                                </div>
                                <h1 className={styles.cardtitle}>5k Run in the Wind</h1>
                                <p className={styles.cardDescription}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.
                                </p>
                            </div>
                            <div>
                                <button>Enroll Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}