import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB Connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
};

export default connectDB;
