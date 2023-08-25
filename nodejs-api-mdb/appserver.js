import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { InitMDBConnection } from "./config/db_op.js";
import userouter from "./routes/useroutes.js";
import hprouter from "./routes/homepageroute.js";

dotenv.config();
const appsvr = express();
InitMDBConnection()
appsvr.use(express.urlencoded({ extended: true }));
appsvr.use(express.json());
appsvr.use(cors({
    origin: ['http://localhost:3000', 'https://wbxsxu168.github.io'],
    methods: ["OPTIONS",'GET','POST','DELETE','UPDATE','PUT','PATCH'],
    exposedHeaders: ['Content-Length', 'Access-Control-Allow-Origin'],
    allowedHeaders:['accept', 'authorization', 'content-type', 'user-agent', 'x-csrftoken', 'x-requested-with'],
    credentials: true,
}));
appsvr.use("/api",userouter);
appsvr.use("/api/h1H3Fyw5Kjfy1",hprouter);
appsvr.use(express.static('public'))  // static resource here
//import ejs from 'ejs';
//import LRU from 'lru-cache';
//ejs.cache = LRU(300);  
appsvr.set('view engine', 'ejs') 
const bindPort=process.env.WEBSERVER_PORT || 8083
appsvr.set('port', bindPort)
appsvr.listen(appsvr.get('port'), () => {
    console.info(`Web server started & listening on port: ${bindPort} `);
});

export default appsvr;
