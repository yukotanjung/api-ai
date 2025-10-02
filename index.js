import express from "express";
import cors from 'cors';
import 'dotenv/config';
import multer from "multer";
import router from "./routes/router.js";


const app = express();
const port = 3000


//app.use(cors())
//app.use(multer())
app.use(express.json())
app.use("/", router);




 app.listen(port,() =>{
    console.log('running server with port ' + port);
})