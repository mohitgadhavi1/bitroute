import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/robot_bgremove.png";
import Button from "@/components/Button/Button";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={`${styles.title} font-semibold`}>
            Diving Deep into the AI Ocean.
          </h1>
          <p className={styles.desc}>
            A Comprehensive Exploration of the Artificial Intelligence
            Landscape. Stay Ahead with Cutting-Edge Insights and Updates on
            Artificial Intelligence Research .
          </p>
          <Button url="/articles" text="Subscribe" />
        </div>
        <div className={` flex justify-end `}>
          <div>
            <Image
              priority
              src={Hero}
              alt=""
              className={`rounded-xl ${styles.img}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
