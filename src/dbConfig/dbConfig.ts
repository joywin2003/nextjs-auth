import mongoose from "mongoose";

export async function connect() {
  return new Promise<void>((resolve, reject) => {
    try {
      mongoose.connect(process.env.MONGO_URI!);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB connected successfully");
        resolve();
      });

      connection.on("error", (err) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. " +
            err
        );
        reject(err);
      });
    } catch (error) {
      console.log("Something goes wrong!");
      console.log(error);
    }
  });
}
