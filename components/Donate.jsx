import React from "react";
import Image from "next/image";
import styles from '../styles/styles.module.css'
import Link from 'next/link'

export default function Donate() {
    return (
        <>
            <div className={styles.donateclass}>
                <h1 class={styles.standardtext}> Donat
 </h1>
                <Link href="https://paypal.com/" target="_blank" class={styles.linktext}>
                    <h2> Paypal </h2>
                </Link>
                <Link href="https://venmo.com/" target="_blank" class={styles.linktext}>
                    <h2> Venmo </h2>
                </Link>
                <Link href="https://zellepay.com/" target="_blank" class={styles.linktext}>
                    <h2> Zelle </h2>
                </Link>
            </div>
        </>
    );
}