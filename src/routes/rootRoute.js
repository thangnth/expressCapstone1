import express from "express";			
import imgRoute from "./imgRoute.js";			
import authRoute from "./authRoute.js";			
import userRoute from "./userRoute.js";			
 			
const rootRoute = express.Router();			
 			
		
rootRoute.use("/auth", authRoute)	
rootRoute.use("/img",imgRoute)			
rootRoute.use("/user", userRoute)			
 			
export default rootRoute;			