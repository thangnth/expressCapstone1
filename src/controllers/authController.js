import initModels from "../models/init-models.js";			
import sequelize from "../models/connect.js";			
import bcrypt from "bcrypt";			
import { responseData } from "../config/response.js";			
import { createRefToken, createToken} from "../config/jwt.js";
let model = initModels(sequelize);	

//Câu 1 : POST trang đăng ký & POST trang đăng nhập 

//Câu 1 : Sign up API		
export const signUp = async (req, res)=>{			
try{			
    let{fullName, email, passWord}= req.body;			
    let checkUser = await model.users.findOne({			
        where : {			
        email			
        }			
    })			
    //Check trùng email			
    if(checkUser){			
        responseData(res, "Email đã tồn tại", "", 400); 			
        return;			
    }			
			
    let newData = {			
        full_name : fullName,			
        email : email,		
        avatar : "",		
        pass_word : bcrypt.hashSync(passWord, 10),					
        role : "user",
        refresh_token : ""
        }			
    //Tạo user mới			
    await model.users.create(newData)			
    res.status(201).send('Đăng ký thành công!')			
    }catch{			
    res.status(500).send('Lỗi 500')			
    }			
}		
//Câu 1 : Login API
export const login = async (req, res)=>{
    try{
    let {email , pass_word} = req.body; 
    
    let checkUser = await model.users.findOne({
    where : {
    email,
    }
    })
    if (checkUser){
    if(bcrypt.compareSync(pass_word, checkUser.pass_word)){
     
    let key = new Date().getTime(); 
    let token = createToken({
    user_id : checkUser.user_id,
    key: key 
    })
    //Khoi tao refresh token
    let refToken = createRefToken({
    user_id : checkUser.user_id,
    key : key
    })
    //Luu refresh token vao table users
    // checkUser.dataValue vì sequelize không nhận dữ liệu là 1 object nên ta phải dùng thuộc tính dataValues của thư viện
    await model.users.update({...checkUser.dataValues, refresh_token : refToken},{
    where : {user_id : checkUser.user_id}
    });
    responseData(res, 'login thành công!', token, 200)
    }
    }else{
    res.status(400).send('sai email hoặc password')
    }
    }catch{
    res.status(500).send('Lỗi 500')
    }
    }

//Refresh token
export const tokenRef = async (req, res)=>{			
try{			
			
let {token} = req.headers;			
			
let check = checkToken(token);			
			
if(check != null && check.name != "TokenExpiredError"){			
res.status(401).send(check.name);			
return;			
}			
			
let accessToken = decodeToken(token)			
let getUser = await model.users.findOne({			
where : {			
user_id : accessToken.data.user_id			
}			
});			
			
let checkRef = checkRefToken(getUser.refresh_token);			
if (checkRef != null ){			
res.status(401).send(check.name);			
return ;			
}			
			
let refToken = decodeToken(getUser.refresh_token);			
if(accessToken.data.key != refToken.data.key){			
res.status(401).send(check.name);			
return;			
}			
			
let newToken = createToken({			
user_id : getUser.user_id,			
key : refToken.data.key			
})			
 			
responseData(res, "", newToken, 200)			
}			
catch{			
responseData(res, "Lỗi 500", "", 500)			
}			
}			
 			