import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div className=" flex flex-col justify-center items-center md:items-start">
      {/* <h1 className={styles.selectTitle}>Choose a category</h1> */}
      <div className={`${styles.items} flex flex-col md:flex-row mt-4`}>
        <Link href="/resources/Deep Learning" className={styles.item}>
          <span className={styles.title}>Deep Learning</span>
        </Link>
        <Link href="/resources/Machine Learning" className={styles.item}>
          <span className={styles.title}>Machine Learning</span>
        </Link>
        <Link href="/resources/Data Science" className={styles.item}>
          <span className={styles.title}>Data Science</span>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
