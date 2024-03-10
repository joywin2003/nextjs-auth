import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {});

    const dbConnection = mongoose.connection;

    dbConnection.on("connected", () => {
      console.log("Connected to the database successfully.");
    });

    dbConnection.on("error", (error) => {
      console.error("Error connecting to the database:");
      console.error(error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB.");
    console.error(error);
    process.exit(1);
  }
};
