import Head from "next/head";
import Image from "next/image";

import Nav from "../components/Nav.tsx";
import Hero from "../components/Hero";
import About from "../components/About";
import Blogs from "../components/Blogs.tsx";
import Events from "../components/Events";
import Donate from "../components/Donate.tsx";

export default function Home() {
    return (
        <>
            {/* <Nav />
            <Hero />
            <About /> */}
            <Blogs />
            {/* <Events /> */}
            <Donate />
        </>
    );
}
