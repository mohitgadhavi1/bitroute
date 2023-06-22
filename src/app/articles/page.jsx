"use client";

import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link
          href={`/articles/${item._id}`}
          className={styles.container}
          key={item.id}
        >
          {/* <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div> */}
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const FramerImage = motion(Image);

const Articles = async () => {
  const data = await getData();
  console.log(data, "data");

  return (
    <>
      <Head>
        <title>Mohit Gadhavi | Articles Page</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="w-full mb-16 flex flex-col items-center  dark:text-light justify-center overflow-hidden">
        {/* <AnimatedText
            text={"Words Can Change The World! "}
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl lg:gap-8 xs:!text-4xl md:gap-y-16"
          /> */}
        <ul className="grid grid-cols-2 gap-16 md:grid-cols-1">
          <FeaturedArticle
            title={
              "Build A Custom Pagination Component In Reactjs From Scratch"
            }
            summary={` Learn how to build a custom pagination component in ReactJS from scratch.
            Follow this step-by-step guide to integrate Pagination component in your ReactJS project.`}
            time={" 9 min read"}
            link={"/"}
            // img={article1}
          />
          <FeaturedArticle
            title={
              " Creating Stunning Loading Screens In React: Build 3 Types Of Loading Screens"
            }
            summary={`Learn how to create stunning loading screens in React with 3 different methods.
               Discover how to use React-Loading, React-Lottie & build a custom loading screen.
               Improve the user experience.`}
            time={" 10 min read"}
            link={"/"}
            // img={article2}
          />
        </ul>
        <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
          All Articles
        </h2>
        <ul>
          <Article
            title={
              " Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
            }
            date={"January 27, 2023"}
            link={"/"}
          />
          <Article
            title={
              " Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
            }
            date={"January 27, 2023"}
            link={"/"}
          />
          <Article
            title={
              "Creating An Efficient Modal Component In React Using Hooks And Portals"
            }
            date={"January 27, 2023"}
            link={"/"}
          />
          <Article
            title={
              "Build A Fabulous Todo List App With React, Redux And Framer-Motion"
            }
            date={"January 27, 2023"}
            link={"/"}
          />
          <Article
            title={"  Redux Simplified: A Beginner's Guide For Web Developers"}
            date={"January 27, 2023"}
            link={"/"}
          />
          <Article
            title={" What Is Higher Order Component (Hoc) In React?"}
            date={"January 27, 2023"}
            link={"/"}
          />
        </ul>
      </main>
    </>
  );
};

export default Articles;

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light dark:bg-dark dark:border-light border border-solid border-dark rounded-2xl">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] rounded-br-3xl bg-dark" />
      <Link
        href={link}
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          // src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={link} target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary dark:text-primaryDark font-bold">
        {time}
      </span>
    </li>
  );
};

const Article = ({ title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center
     justify-between bg-light dark:bg-dark dark:border-light
      dark:text-light text-dark first:mt-0 border border-solid border-dark 
sm:flex-col
     border-r-4 border-b-4
     "
    >
      <Link href={link} target="_blank">
        <h2 className="capitalize text-xl font-semibold hover:underline">
          {title}
        </h2>
      </Link>
      <span className="text-primary dark:text-primaryDark font-semibold pl-4 sm:pl-0 sm:self-start xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};
