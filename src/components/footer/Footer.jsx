import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 BitRoute. All rights reserved.</div>
      <div className={styles.social}>
        <a>
          <Image
            src="/icon_github.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="Lama Dev"
          />
        </a>
        <a>
          <Image
            src="/4.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="Lama Dev"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
