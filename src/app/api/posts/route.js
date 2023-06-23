import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request) => {
  // console.log(request);
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    const posts = await Post.find(username && { username });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  // console.log(request);
  const data = await request.formData();
  console.log("data", data);
  const title = data.get("title");
  const desc = data.get("desc");
  const img = data.get("img");
  const content = data.get("content");
  const username = data.get("username");

  let imageBuffer = null;

  if (img && Array.isArray(img) && img.length > 0) {
    const imgData = img[0];
    const reader = new FileReader();

    reader.readAsArrayBuffer(imgData);

    await new Promise((resolve) => {
      reader.onloadend = () => {
        imageBuffer = Buffer.from(reader.result);
        resolve();
      };
    });
  }

  const newPost = new Post({
    title,
    desc,
    img: imageBuffer,
    content,
    username,
  });

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
