import express  from "express";
import {Connection} from "./database/db.js";
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import user from "./routes/user.js";
 import post from "./routes/post.js";


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

dotenv.config();

const app=express();

// const corsOptions ={
//   origin:'http://localhost:5173', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
app.use(cors());

app.use(bodyParser.json({limit:"100mb",extended:true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:"100mb",extended:true}));
app.use(express.json());



// app.use(express.static(path.join(__dirname, "../frontend/build")));



// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



const port=8000;
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const PORT=8000;

Connection(USERNAME,PASSWORD);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use("/api/v1", post);
 app.use("/api/v1", user);


app.listen(PORT,()=>console.log(`server running on port ${PORT}`));









//yjrpi5ait3ZKLjn4