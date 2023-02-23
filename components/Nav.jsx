import React from "react";
import Image from 'next/image';
import Link from 'next/link'
import styles from '../styles/styles.module.css'
import { FaInstagram } from 'react-icons/fa'


export default function Nav() {
    return (
        <div className={styles.nav}>
            <Link href="/#">
                <Image alt="back to top" src="/logo.jpg" width={60} height={60} className={styles.navImage}/>
            </Link>
        </div>
    );
}