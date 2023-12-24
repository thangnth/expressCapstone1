import express from "express";		
import { getUserInfo } from "../controllers/userController.js";		
import { checkToken, verifyToken } from "../config/jwt.js";	
import upload from "../config/upload.js"

const userRoute = express.Router ();	

userRoute.get("/get-user-info", getUserInfo);

export default userRoute;