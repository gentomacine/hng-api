import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);

        mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected succesfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}