"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import HoverMenu from "../HoverMenu";

const links = [
  {
    id: 3,
    title: "Articles",
    url: "/articles",
  },
  {
    id: 2,
    title: "Resources",
    url: "/resources",
  },

  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="w-full ">
        <div className="max-w-7xl mx-auto   ">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className={styles.logo}>
                BitRoute Ai{" "}
                <span className="text-sm text-gray-500">(beta)</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                {links.map((link) => (
                  <Link key={link.id} href={link.url} className={styles.link}>
                    {link.title}
                  </Link>
                ))}

                {session.status === "authenticated" && (
                  <HoverMenu items={[<p onClick={signOut}>Logout</p>]}>
                    <FaUserCircle className="text-primary text-2xl cursor-pointer hover:text-primary/80" />
                  </HoverMenu>
                )}
                <DarkModeToggle />
              </div>
            </div>

            {/* -------------------------mobile menu-------------------------------------  */}

            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`block h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`block h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="dark:bg-dark border bg-dark min-h-[50vh] justify-center items-center rounded-md flex flex-col  z-50 mb-4 gap-y-6 ">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className={` hover:underline text-white dark:text-base`}
              >
                {link.title}
              </Link>
            ))}
            {session.status === "authenticated" && (
              <button className={styles.logout} onClick={signOut}>
                Logout
              </button>
            )}
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      {/* <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BitRoute Ai <span className="text-sm text-gray-500">(beta)</span>
        </Link>
        <div className={styles.links}>
          {links.map((link) => (
            <Link key={link.id} href={link.url} className={styles.link}>
              {link.title}
            </Link>
          ))}
          {session.status === "authenticated" && (
            <button className={styles.logout} onClick={signOut}>
              Logout
            </button>
          )}
          <DarkModeToggle />
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
