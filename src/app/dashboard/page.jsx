"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Popup from "@/components/Popup";
import Table from "@/components/Table";
import ImageUpload from "@/components/ImageUpload";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

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
    console.log(e.target);
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = selectedImage;
    const content = e.target[3].value;

    console.log(img);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("img", img);
      formData.append("content", content);
      formData.append("username", session.data.user.name);

      await fetch("/api/posts", {
        method: "POST",
        body: formData,
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
  console.log("session", session);

  if (
    session.status === "authenticated" &&
    session.data.user.email === "mohitgadhavi1@gmail.com"
  ) {
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
              <input type="text" placeholder="Type" className={styles.input} />
              {/* <input type="text" placeholder="Image" className={styles.input} /> */}
              <div>
                <label
                  title="upload image"
                  htmlFor="imageUpload"
                  className=" mb-2 cursor-pointer w-24 h-24 rounded-lg border-2 border-dashed
         border-gray-300 bg-gray-100 flex justify-center items-center"
                >
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                {selectedImage && (
                  <div className="flex items-center mt-2">
                    <p className="text-sm mr-2">{selectedImage.name}</p>
                    <button
                      onClick={handleRemoveImage}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
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
                  key: "type",
                  title: "Type",
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
                type: post.desc,
                date: new Date(post.createdAt).toLocaleDateString(),
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
