import React from "react";
import Image from "next/image";
import styles from '../styles/styles.module.css'
import Link from 'next/link'

export default function Donate() {
    return (
        <>
            <div className={styles.donateclass}>
                <div className={styles.linktitle}>
                    <h1>Donate</h1> <hr className={styles.hr} />
                    <Link href="https://paypal.com/" target="_blank" className={styles.linktext}>
                        <h3> Paypal </h3>
                    </Link>
                    <Link href="https://venmo.com/" target="_blank" className={styles.linktext}>
                        <h3> Venmo </h3>
                    </Link>
                    <Link href="https://zellepay.com/" target="_blank" className={styles.linktext}>
                        <h3> Zelle </h3>
                    </Link>
                 </div>
            </div>
        </>
    );
}