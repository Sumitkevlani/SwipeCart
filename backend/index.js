import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {default as productRoutes} from './routes/productRoutes.js';
import {default as userRoutes} from './routes/userRoutes.js';
import {default as orderRoutes} from './routes/orderRoutes.js';
import {default as paymentRoutes} from './routes/paymentRoutes.js';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import cookieParser from 'cookie-parser';
import connectToDatabase from './database/db.js';
import errormiddleware from './middleware/errormiddleware.js';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});


//Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});



const app = express();
connectToDatabase();

app.use(cors({
    origin: ['http://127.0.0.1:5173','https://swipe-cart.vercel.app'],
    credentials: true
}));

const filePath = path.join(__dirname, '..','frontend','dist','index.html');
app.use(express.static(path.join(__dirname, '..','frontend','dist')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use('/api/product',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/order',orderRoutes); 
app.use('/api/payment',paymentRoutes);
app.use(errormiddleware);

app.get("*", function (req, res) {
    res.sendFile(filePath);
});

const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


//Unhandled Promise Rejection Error
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ,${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});