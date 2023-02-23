import React from "react";
import Image from "next/image";
import styles from '../styles/styles.module.css'
import Link from 'next/link'

export default function Donate() {
    return (
        <>
            <div className={styles.donatey}>
                <h2>Be a part of the Cause</h2>
                <h1>Donate Now</h1>
                <div className={[styles.cardgrid, styles.donategrid].join(" ")}>
                    <div className={[styles.card, styles.donate].join(" ")}>
                        <img src="https://source.unsplash.com/random/" />
                        <h2>Category 2</h2>
                        <h1>Soccer for All!</h1>
                        <div className={styles.sliderWrapper}>
                            <div className={styles.outsideSlider}>
                                <div className={styles.insideSlider} style={{"width": "50%"}}></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div className={styles.donateBtnWrapper}>
                            <button>Donate Now</button>
                        </div>
                    </div>
                    <div className={[styles.card, styles.donate].join(" ")}>
                        <img src="https://source.unsplash.com/random/?asd=2" />
                        <h2>Category 1</h2>
                        <h1>Flag football in rural areas</h1>
                        <div className={styles.sliderWrapper}>
                            <div className={styles.outsideSlider}>
                                <div className={styles.insideSlider} style={{"width": "50%"}}></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div className={styles.donateBtnWrapper}>
                            <button>Donate Now</button>
                        </div>
                    </div>
                    <div className={[styles.card, styles.donate].join(" ")}>
                        <img src="https://source.unsplash.com/random/?er=2" />
                        <h2>Category 2</h2>
                        <h1>Baseball</h1>
                        <div className={styles.sliderWrapper}>
                            <div className={styles.outsideSlider}>
                                <div className={styles.insideSlider} style={{"width": "50%"}}></div>
                            </div>
                            <p>50%</p>
                        </div>
                        <div className={styles.donateBtnWrapper}>
                            <button>Donate Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}