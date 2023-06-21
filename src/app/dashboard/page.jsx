"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Popup from "@/components/Popup";
import Table from "@/components/Table";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value || "N.A";
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex  flex-col items-center   h-screen">
        <div className="flex w-full h-auto    flex-col items-end">
          <button
            className="border border-primary hover:bg-primary mb-2  text-white font-bold py-2 px-4 rounded"
            onClick={handleOpen}
          >
            Add New
          </button>
          <Popup isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-xl font-bold mb-4">Add New Post</h2>
            {/* <p>This is the content of the popup.</p> */}

            <form className={styles.new} onSubmit={handleSubmit}>
              <input type="text" placeholder="Title" className={styles.input} />
              <input type="text" placeholder="Desc" className={styles.input} />
              <input type="text" placeholder="Image" className={styles.input} />
              <textarea
                placeholder="Content"
                className={styles.textArea}
                cols="30"
                rows="10"
              ></textarea>
              <button className={styles.button} onClick={handleClose}>
                Upload
              </button>
            </form>
          </Popup>
          {isLoading ? (
            "loading"
          ) : (
            <Table
              columns={[
                {
                  key: "title",
                  title: "Title",
                },
                {
                  key: "date",
                  title: "Publish Date",
                },
                {
                  key: "action",
                  title: "Action",
                },
              ]}
              data={data.map((post) => ({
                id: post._id,
                title: post.title,
                date:new Date(post.createdAt).toLocaleDateString(),
                action: (
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                ),
              }))}
            />
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;
