import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;


async function connectToDatabase() {
    const result = await mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to database successfully");
}

export default connectToDatabase;