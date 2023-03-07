import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import Nav from "../../components/Nav";
import { useEffect, useState } from "react";

interface postProps {
    data: dataProps | null;
    mdHTML: string | undefined;
}

interface dataProps {
    title: string;
    content: string;
    date: number;
    author: string;
}

export default function Post({ data, mdHTML }: postProps) {
    const [date, setDate] = useState("Loading...");

    useEffect(() => {
        const dateObject = new Date(data.date);
        setDate(dateObject.toDateString());
    }, [data.date]);

    if (!data) {
        return (
            <>
                <h1>404</h1>
                <h2>Post not found.</h2>
            </>
        );
    }

    console.log(mdHTML);
    console.log(data);

    return (
        <>
            <Nav position="sticky" />
            <main className="flex justify-center">
                <article className="prose p-4 sm:p-8 w-[80vw] !block xl:!max-w-[90ch]">
                    <h1 className="mb-0">{data.title}</h1>
                    <h2 className="mt-4 md:text-xl text-lg sm:hidden">
                        {data.author} <br /> {date}
                    </h2>
                    <h2 className="mt-4 sm:block hidden">
                        {data.author} - {date}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: mdHTML }} />
                </article>
            </main>
        </>
    );
}

export async function getStaticPaths() {
    // ...
    return {
        paths: [
            {
                // You can add a cache of posts by getting a list of ids every build
                params: { pid: "markdown-blog" },
            },
        ],
        // In case a new post is created after the build or we don't implement the cache which we should do since it greatly decreases load speeds
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
    const docRef = doc(db, "blog", params.pid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return { props: { data: null } };
    }

    const data = docSnap.data();

    const processedMD = await remark()
        .use(remarkGfm)
        .use(html)
        .process(data.content);

    const mdHTML = processedMD.toString();

    console.log("mdHTML");
    console.log(mdHTML);

    data.date = data.date.toDate().getTime();

    return { props: { data, mdHTML } };
}
