import 'dotenv/config';
import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const connectToDB = await mongoose.connect(process.env.MONGO_URI);
        console.log(connectToDB.connection.host); 
    } catch (error) {
        console.log(error);
    }
}

export default connectDB