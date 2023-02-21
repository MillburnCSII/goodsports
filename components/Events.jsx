import React from "react";
import Image from "next/image";
import styles from '../styles/styles.module.css'

export default function Events() {
    return (
        <>
            <div className={styles.eventclass}>
                <div className={styles.standardtext}>
                    <h1>Upcoming Events</h1> <hr className={styles.hr} />
                    <h2>Yes</h2>

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