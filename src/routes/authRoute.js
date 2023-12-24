import express from "express";			
import {login, signUp} from "../controllers/authController.js"			

const authRoute = express.Router();	
 			
authRoute.post("/sign-up", signUp);			
authRoute.post("/login", login);			
// authRoute.post("/login-facebook", loginFacebook)			
// authRoute.post("/token-ref", tokenRef)			
			
export default authRoute;			