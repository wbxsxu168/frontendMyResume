import express from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { Resume2ReactPage } from "../controllers/HomePage.js";

const hprouter = express.Router();
hprouter.get('/', verifyJWT, Resume2ReactPage);
export default hprouter;