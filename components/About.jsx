import React from "react";
import Image from "next/image";
import styles from '../styles/styles.module.css'

export default function About() {
    return (
        <>
            <div className={styles.aboutclass}>
                <div className={styles.aboutusimage}>
                    <Image alt="" src="/logo.jpg" width={500} height={500} className={styles.aboutusimages}/>
                </div>
                <div className={styles.standardtext}>
                    <h1>About Us</h1> <hr className={styles.hr} />
                    <h2>Suppyling Underprivileged Kids the Sports They Should Grow Up With.</h2>
                    <h3>The secret to happiness lies in helping others. Never underestimate the difference YOU can make in the lives of the poor, the abused and the helpless.</h3>
                </div>
            </div>
        </>
    );
}