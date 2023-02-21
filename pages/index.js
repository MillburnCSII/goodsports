import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Blogs from '../components/Blogs'
import Events from '../components/Events'
import Donate from '../components/Donate'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Events />
      <Blogs />
      <Donate />
    </>
 )
}