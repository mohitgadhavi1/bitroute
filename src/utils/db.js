import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log("hello world", error);
    throw new Error("Connection failed");
  }
};

export default connect;
