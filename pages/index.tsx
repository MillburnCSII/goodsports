import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import Nav from "../components/Nav";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import CardGroup from "../components/CardGroup";
import DonateCard from "../components/DonateCard";
import BlogCard from "../components/BlogCard";
import React from "react";

interface goalProject {
    id: string;
    title: string;
    catergory: string;
    description: string;
    image: string;
    goal: number;
    current: number;
}

interface stupidTs {
    title: string;
    description: string;
    image: string;
    goal: number;
    current: number;
    catergory: string;
}

interface blogPost {
    id: string;
    title: string;
    description?: string;
    image: string;
    author: string;
    date: number;
    content: string;
}

interface stupidTs2 {
    title: string;
    description?: string;
    image: string;
    author: string;
    date: number;
    content: string;
}

export default function Home(props) {
    //         title: "Boston Marathon",
    //         author: "Henry Rollock",
    //         date: "12 Jan 2021",

    //         title: "Boston Legends of the Ball",
    //         author: "Katrina Younce",
    //         date: "20 Aug 2022",

    //         title: "Meet our 2022 New York City Marathon Runners",
    //         author: "Margaret Norton",
    //         date: "12 Nov 2022",

    return (
        <>
            {/* <Nav />
            <Hero />
            <About /> */}
            <CardGroup /* BLOG */
                title="Our Most Recent Blogs"
                subtitle="Latest Blogs"
                card={BlogCard}
                data={props.blogData}
            />
            {/* <CardGroup */
            /* DONATE */
            /*
                title="Donate Now"
                subtitle="Be a part of the Cause"
                card={DonateCard}
                data={props.donateData}
            /> */}
        </>
    );
}

export async function getServerSideProps() {
    const donateQuery = query(collection(db, "donate"), limit(6));
    const donateDocs = await getDocs(donateQuery);
    const donateData: goalProject[] = donateDocs.docs.map((doc) => {
        const data = doc.data();
        return {
            ...(data as stupidTs),
            id: doc.id,
        };
    });

    const blogQuery = query(collection(db, "blog"), limit(6));
    const blogDocs = await getDocs(blogQuery);
    const blogData: blogPost[] = blogDocs.docs.map((doc) => {
        const data = doc.data();
        data.date = data.date.toDate().getTime();
        return {
            ...(data as stupidTs2),
            id: doc.id,
        };
    });

    return {
        props: {
            donateData,
            blogData,
        },
    };
}
