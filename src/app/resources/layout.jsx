import React from "react";
import styles from "./page.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <h1 className={`text-3xl md:text-7xl font-semibold`}>
        Compiled Resources
      </h1>
      {children}
    </div>
  );
};

export default Layout;
