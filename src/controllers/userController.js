import initModels from "../models/init-models.js";		
import sequelize from "../models/connect.js";		
import {responseData} from "../config/response.js";
import { decodeToken } from '../config/jwt.js';	
 		
let model = initModels(sequelize);		

// Lấy thông tin user
export const getUserInfo = async (req, res) => {		
    try {		        
    let { token } = req.headers;		
    let accessToken = decodeToken(token);		        
    let getUser = await model.users.findOne({		
    where: {		
    user_id: accessToken.data.user_id		
    }		
    })		         
    if (!getUser) {		
    responseData(res, "User không tồn tại", "", 404);		
    return;		
    }		         
    responseData(res, "Success !", getUser, 200);		
             
    } catch (error){		
    responseData(res, "Lỗi 500", error.message, 500);		
    }		
    }		