import React from "react";
import Image from "next/image";
import styles from '../styles/styles.module.css'

export default function Events() {
    return (
        <>
            <div className={styles.eventclass}>
                <div className={styles.standardtext}>
                    <h1>Upcoming Events</h1> <hr className={styles.hr} />
                    <h2>Look out for our fundraising events at the high school!</h2>

                    <div className={styles.cardgrid}>
                        <div className={styles.card}>
                            <img alt="" src="https://source.unsplash.com/random/?card=1" className={styles.cardimages}/>
                            <div className={styles.cardtext}>
                                <h2 className={styles.cardLocation}>Millburn, NJ</h2>
                                <h1 className={styles.cardtitle}>Charity Event - Soccer, Football, Fun and Games!</h1>
                                <p className={styles.cardDescription}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.
                                </p>
                                <button>Enroll Now</button>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <img alt="" src="https://source.unsplash.com/random/?card=2" className={styles.cardimages}/>
                            <div className={styles.cardtext}>
                                <h2 className={styles.cardLocation}>South Orange, NJ</h2>
                                <h1 className={styles.cardtitle}>Children We Work With</h1>
                                <p className={styles.cardDescription}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.
                                </p>
                                <button>Enroll Now</button>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <img alt="" src="https://source.unsplash.com/random/?card=3" className={styles.cardimages}/>
                            <div className={styles.cardtext}>
                                <h2 className={styles.cardLocation}>Philadelphia, PA</h2>
                                <h1 className={styles.cardtitle}>5k Run in the Wind</h1>
                                <p className={styles.cardDescription}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.
                                </p>
                                <button>Enroll Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}