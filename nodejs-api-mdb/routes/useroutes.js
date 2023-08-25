import express from "express";
import { refreshToken } from "../controllers/genRefreshToken.js";
import { Login, Logout  } from "../controllers/SignIn.js";
import {  userSignUp } from "../controllers/SignUp.js";
import { SignInValidation } from "../validation/validateSignIn.js";
import { SignUpValidation } from "../validation/validateSignUp.js";

const userouter = express.Router();
userouter.post('/signup', SignUpValidation, userSignUp);
userouter.post('/token', SignInValidation, Login);  // using uid/pwd in signin..
userouter.post('/logout', Logout);  
userouter.get('/logout', Logout);  // for old client
userouter.post('/token/refresh/', refreshToken);
export default userouter;