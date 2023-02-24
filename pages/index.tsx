import {
    collection,
    getDocs,
    query,
    limit,
    Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import Nav from "../components/Nav.tsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import CardGroup from "../components/CardGroup.tsx";
import DonateCard from "../components/DonateCard.tsx";
import BlogCard from "../components/BlogCard.tsx";

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
    // const blogData: blogPost[] = [
    //     {
    //         id: 1,
    //         title: "Charity Event - Soccer, Football, Fun and Games!",
    //         description:
    //             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.",
    //         image: "https://source.unsplash.com/random/?card=4",
    //         author: "Ester Howard",
    //         date: "12 Sep 2021",
    //     },
    //     {
    //         id: 2,
    //         title: "Children We Work With",
    //         description:
    //             "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.",
    //         image: "https://source.unsplash.com/random/?card=5",
    //         author: "Jacob Jones",
    //         date: "22 Aug 2021",
    //     },
    //     {
    //         id: 3,
    //         title: "5k Run in the Wind",
    //         description:
    //             "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.",
    //         image: "https://source.unsplash.com/random/?card=6",
    //         author: "Floyd Miles",
    //         date: "30 Jul 2021",
    //     },
    //     {
    //         id: 4,
    //         title: "Boston Marathon",
    //         description:
    //             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero. Incidunt officiis quae voluptates corporis repellendus odio reiciendis, accusantium unde.",
    //         image: "https://source.unsplash.com/random/?card=7",
    //         author: "Henry Rollock",
    //         date: "12 Jan 2021",
    //     },
    //     {
    //         id: 5,
    //         title: "Boston Legends of the Ball",
    //         description:
    //             "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores saepe porro atque obcaecati. Facilis libero et alias quam voluptatum.",
    //         image: "https://source.unsplash.com/random/?card=8",
    //         author: "Katrina Younce",
    //         date: "20 Aug 2022",
    //     },
    //     {
    //         id: 6,
    //         title: "Meet our 2022 New York City Marathon Runners",
    //         description:
    //             "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur nisi iure, vitae a maxime qui.",
    //         image: "https://source.unsplash.com/random/?card=9",
    //         author: "Margaret Norton",
    //         date: "12 Nov 2022",
    //     },
    // ];

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
            <CardGroup /* DONATE */
                title="Donate Now"
                subtitle="Be a part of the Cause"
                card={DonateCard}
                data={props.donateData}
            />
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
