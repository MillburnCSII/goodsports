import React from "react";
import Image from "next/image";
import styles from "../styles/styles.module.css"

export default function Hero() {
    return (
        <>
            <div className={styles.hero}>
                <div className="HeroText">
                    <h1 className={styles.herotext}>Millburn</h1>
                    <h1 className={styles.herotext}>Goodsports</h1>
                </div>
                <div className="HeroImage">
                    <Image alt="" src="/logo.jpg" width={400} height={400} className={styles.heroimage}/>
                </div>
            </div>
        </>
    );
}