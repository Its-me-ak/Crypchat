import mongoose from "mongoose";

// export const connectDB = () => {
//     mongoose
//         .connect(process.env.MONGODB_URI)
//         .then(() => console.log("Connected to MongoDB"))
//         .catch((err) => console.log(err));
// };

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Connected to MongoDB at",
      connect.connection.host,
      "and database name is",
      connect.connection.name
    );
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  }
};
