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
                <div className={styles.aboutustext}>
                    <div>
                        <h1 className={styles.aboutustitle}>About Us</h1>
                        <br />
                        <br />
                    </div>
                    <div className={styles.aboutusinfo1}>
                        <h1>Suppyling underprivileged Kids the sports they should grow up with.</h1>
                        <br />
                        <br />
                    </div>
                    <div className={styles.aboutusinfo2}>
                        <h1>The secret to happiness lies in helping others. Never underestimate the difference YOU can make in the lives of the poor, the abused and the helpless.</h1>
                    </div>
                </div>
            </div>
        </>
    );
}