import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={`${styles.title} font-semibold`}>
          Diving Deep into the AI Ocean.
        </h1>
        <p className={styles.desc}>
          A Comprehensive Exploration of the Artificial Intelligence Landscape.
          Stay Ahead with Cutting-Edge Insights and Updates on Artificial
          Intelligence Research .
        </p>
        <Button url="/articles" text="Learn more" />
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img} />
      </div>
    </div>
  );
}
