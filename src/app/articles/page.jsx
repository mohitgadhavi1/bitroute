"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";

const url = process.env.URL;

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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/posts`);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("data", data);

  return (
    <>
      <Head>
        <title>Mohit Gadhavi | Articles Page</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="w-full mb-16 flex flex-col items-center  dark:text-light justify-center overflow-hidden">
        {/* <AnimatedText
          text={"Featured Articles "}
          className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl lg:gap-8 xs:!text-4xl md:gap-y-16"
        /> */}
        <ul className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-16 ">
          {data?.map((article) => {
            if (article.desc === "featured") {
              return (
                <FeaturedArticle
                  key={article._id}
                  title={article.title}
                  summary={` Learn how to build a custom pagination component in ReactJS from scratch.
              Follow this step-by-step guide to integrate Pagination component in your ReactJS project.`}
                  time={" 9 min read"}
                  link={"/"}
                  img={null}
                />
              );
            }
          })}
        </ul>
        <h2 className="font-bold text-4xl w-full  text-center  my-16 ">
          All Articles
        </h2>

        <ul className="">
          {data?.map((article) => {
            if (article.desc === "general") {
              return (
                <Article
                  key={article._id}
                  title={article.title}
                  date={article.createdAt}
                  link={"/"}
                />
              );
            }
          })}
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
        {/* <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        /> */}
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
      initial={{ y: 50 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full my-4 p-4 py-6  rounded-xl flex items-center
     justify-between bg-light dark:bg-dark dark:border-light
      dark:text-light text-dark first:mt-0 border border-solid border-dark 
     border-r-4 border-b-4
     "
    >
      <Link href={link} target="_blank">
        <h2 className="capitalize text-xl font-semibold hover:underline">
          {title}
        </h2>
      </Link>
      <span className="text-primary dark:text-primaryDark font-semibold pl-4 ">
        {date}
      </span>
    </motion.li>
  );
};
