"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/robot_bgremove.png";
import Button from "@/components/Button/Button";
import Head from "next/head";
import Popup from "@/components/Popup";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      // Perform your subscription logic here
      console.log("Subscribed with email:", email);
      togglePopup();
    } else {
      setIsValid(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  return (
    <>
      <div
        className={`w-full ${styles.container} flex-col lg:flex-row-reverse`}
      >
        <div className={`hidden md:flex justify-end `}>
          <div>
            <Image
              priority
              src={Hero}
              alt=""
              className={`rounded-xl ${styles.img}`}
            />
          </div>
        </div>
        <div className={`w-full ${styles.item}`}>
          <h1 className={`${styles.title} font-semibold text-7xl`}>
            Diving Deep into the AI Ocean.
          </h1>
          <p className={styles.desc}>
            A Comprehensive Exploration of the Artificial Intelligence
            Landscape. Stay Ahead with Cutting-Edge Insights and Updates on
            Artificial Intelligence Research.
          </p>
          <button
            className="
          cursor-pointer
          bg-[#53c28b]
          rounded-md
          border: none;
          w-max
          text-white
          px-6
          py-4
          hover:bg-[#53c28b]/50
          
          "
            onClick={togglePopup}
          >
            Subscribe
          </button>

          <Popup isOpen={isOpen} onClose={togglePopup}>
            <h1 className="text-gray-600 text-4xl font-semibold mb-2">
              Subscribe to our Newsletter
            </h1>
            <p className="text-gray-500 mb-6">
              Receive Valuable Articles and Resources Delivered to Your Inbox
              Every Week
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-600  text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className={`border ${
                    isValid ? "border-gray-300" : "border-red-500"
                  } rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500`}
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {!isValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <button
                className="cursor-pointer
                bg-[#53c28b]
                rounded-md
                border: none;
                w-max
                text-white
                px-6
                py-2
                hover:bg-[#53c28b]/50"
                type="submit"
              >
                Submit
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-400">
              * No Spam, Just Informative Emails Focused on Education
            </p>
          </Popup>
        </div>
      </div>
    </>
  );
}
