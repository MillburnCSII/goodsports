import Head from "next/head";
import Image from "next/image";

import Nav from "../components/Nav.tsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import CardGroup from "../components/CardGroup.tsx";
import DonateCard from "../components/DonateCard.tsx";
import BlogCard from "../components/BlogCard.tsx";

interface goalProject {
    id: number;
    title: string;
    catergory: string;
    description: string;
    image: string;
    goal: number;
    current: number;
}

interface blogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    date: string;
}

export default function Home() {
    const donateData: goalProject[] = [
        {
            id: 1,
            title: "Soccer for All!",
            catergory: "Category 2",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero, distinctio.",
            image: "https://source.unsplash.com/random/",
            goal: 1000,
            current: 500,
        },
        {
            id: 2,
            title: "Flag football in rural areas",
            catergory: "Category 1",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quaerat accusantium alias!",
            image: "https://source.unsplash.com/random/?asd=2",
            goal: 900,
            current: 750,
        },
        {
            id: 3,
            title: "Baseball",
            catergory: "Category 2",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi.",
            image: "https://source.unsplash.com/random/?er=2",
            goal: 350,
            current: 350,
        },
        {
            id: 4,
            title: "Basketball",
            catergory: "Category 3",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            image: "https://source.unsplash.com/random/?asd=3",
            goal: 800,
            current: 100,
        },
        {
            id: 5,
            title: "Volleyball",
            catergory: "Category 1",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            image: "https://source.unsplash.com/random/?gf=4",
            goal: 700,
            current: 500,
        },
        {
            id: 6,
            title: "Tennis",
            catergory: "Category 2",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            image: "https://source.unsplash.com/random/?gb=5",
            goal: 500,
            current: 300,
        },
    ];

    const blogData: blogPost[] = [
        {
            id: 1,
            title: "Charity Event - Soccer, Football, Fun and Games!",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.",
            image: "https://source.unsplash.com/random/?card=4",
            author: "Ester Howard",
            date: "12 Sep 2021",
        },
        {
            id: 2,
            title: "Children We Work With",
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.",
            image: "https://source.unsplash.com/random/?card=5",
            author: "Jacob Jones",
            date: "22 Aug 2021",
        },
        {
            id: 3,
            title: "5k Run in the Wind",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.",
            image: "https://source.unsplash.com/random/?card=6",
            author: "Floyd Miles",
            date: "30 Jul 2021",
        },
        {
            id: 4,
            title: "Boston Marathon",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.",
            image: "https://source.unsplash.com/random/?card=7",
            author: "Henry Rollock",
            date: "12 Jan 2021",
        },
        {
            id: 5,
            title: "Boston Legends of the Ball",
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.",
            image: "https://source.unsplash.com/random/?card=8",
            author: "Katrina Younce",
            date: "20 Aug 2022",
        },
        {
            id: 6,
            title: "Meet our 2022 New York City Marathon Runners",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.",
            image: "https://source.unsplash.com/random/?card=9",
            author: "Margaret Norton",
            date: "12 Nov 2022",
        },
    ];

    return (
        <>
            <Nav />
            <Hero />
            <About />
            <CardGroup /* BLOG */
                title="Our Most Recent Blogs"
                subtitle="Latest Blogs"
                card={BlogCard}
                data={blogData}
            />
            <CardGroup /* DONATE */
                title="Donate Now"
                subtitle="Be a part of the Cause"
                card={DonateCard}
                data={donateData}
            />
        </>
    );
}
