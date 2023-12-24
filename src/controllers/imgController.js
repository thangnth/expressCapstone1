import initModels from "../models/init-models.js";			
import sequelize from "../models/connect.js"	
import { decodeToken } from '../config/jwt.js';
import compress_images from 'compress-images';		
import { responseData } from "../config/response.js";
import { unlink } from 'fs';
 			
let model = initModels(sequelize)	

// Trang chủ 
//  Trang chủ - GET images 			
export const getImages = async (req,res)=>{			
try{			
let data = await  model.images.findAll ();			
res.status(200).send(data)			
} catch(exception){		
console.log(exception);	
res.status(500).send("Lỗi...")			
}			
}		

// Trang chủ - Tìm kiếm danh sách ảnh theo tên 
// 1. Upload Image				
export const uploadImg = async (req, res)=>{	
//form data		
const {file} = req;		
const {img_name, description, type_id} = req.body;
	
//tối ưu hình ảnh 	

compress_images(
    process.cwd() + "/public/img/" + file.filename,
    process.cwd() + "/public/img_compress/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (err, completed) {
         unlink(process.cwd() + "/public/img/" + file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Đã xoá tấm hình chưa tối ưu.");
          });
        }
  );
	
// res.send(file.filename);
//--> Ta đã lấy được img về source back-end.
//Upload img
const {token} = req.headers;			
let dToken = decodeToken(token);			
const {user_id} = dToken.data;					
try {
    let newData = {
        img_name,
        description,
        views : 0,
        source : file.filename,
        user_id,
        type_id,
    };
    const createdImg = await model.images.create(newData);
    const img_id = createdImg.img_id;
    let newCollect = {
        img_id,
        created_by_userID : user_id,
        saved_by_userID : 0,
        saved_date: new Date()
    }
    await model.image_collection.create(newCollect);

    responseData(res, 'Upload thanh Cong!', file.filename, 201)
} catch (error){
    console.error(error);
    responseData(res, 'Lỗi 500', error.message, 500)
}
}		

// 2. Tìm kiếm danh sách ảnh theo tên 
export const getImagesByName = async (req, res) => {
    try { 
        const { img_name } = req.body;
        let data = await model.images.findAll({
            where: {
                img_name
            },
            include : "user"
        })
        if(data != ""){
            responseData(res, "Thành công", data, 200);
        } else {
            responseData(res, "Không tìm thấy từ khoá bạn yêu cầu", data, 404)
        };
    }
    catch (error) {
        responseData(res, "Lỗi 500 !", error.message, 500);
    }
}


// Trang chi tiết : GET thông tin ảnh bằng ID ảnh
export const getImageById = async (req,res)=>{		
    try{		
    const {imgId} = req.params;		
    let data = await model.images.findOne ({		
    where : {img_id : imgId},		
    include : "user"	
    });		
    responseData(res, "Thành công !", data, 200);	
    } catch(error){		
    responseData(res, "Lỗi 500 !", error.message, 500);		
    }		
    }		

// Trang chi tiết : GET thông tin bình luận theo ID ảnh
export const getCommentImg = async (req, res)=>{			
    try{			
    let {imgId} = req.params;			
    let data = await model.image_comment.findAll({			
    where : {			
    img_id : imgId			
    },			
    include : ["user"]		
    })			
    responseData(res, "Thành công !", data, 200);				
    }catch (error){			
        responseData(res, "Lỗi 500 !", error.message, 500);
    }			
    };	
// Trang chi tiết : GET thông tin đã lưu hình này hay chưa theo Id ảnh 
export const checkImgId = async (req, res)=>{		
    try{
    let {token} = req.headers;							
    let dToken = decodeToken(token);				
    let {user_id} = dToken.data;

    let {imgId} = req.params;			
    let data = await model.image_collection.findOne({			
    where : {			
    img_id : imgId,
    saved_by_userID : user_id	
    },				
    })	
    if (data) {
        responseData(res, "Ảnh đã được lưu !", data, 200);	
    }else {
        responseData(res, "Ảnh chưa được lưu !", " ", 200);
    }	
   			
    }catch (error){			
        responseData(res, "Lỗi 500 !", error.message, 500);
    }			
    }	

// Trang chi tiết : POST để lưu thông tin bình luận của người dùng
export const postCommentImg = async (req, res)=>{				
    try{				
    let {token} = req.headers;							
    let dToken = decodeToken(token);				
    let {user_id} = dToken.data;				
    let {img_id, content} = req.body;				
                     
    let newData = {				
    user_id,				
    img_id,				
    content,				
    date_create : new Date(),				
    reply_list : "",				
    timestamp : new Date()				
    }				
                     
    await model.image_comment.create(newData);				
                     
    responseData(res, 'Thành công!', newData, 200)				
    }catch (error){				
        responseData(res, 'Lỗi 500!', error.message, 500)				
    }				
    }	

// Trang quản lý hình ảnh 
// GET danh sách ảnh đã lưu theo user_id : 
export const getSavedImg = async (req, res)=>{		
    try{
    let {token} = req.headers;							
    let dToken = decodeToken(token);				
    let {user_id} = dToken.data;
		
    let data = await model.image_collection.findAll({			
    where : {			
    saved_by_userID : user_id	
    },				
    })	
    responseData(res, "Thành công!", data, 200);
   			
    }catch (error){			
        responseData(res, "Lỗi 500 !", error.message, 500);
    }			
    }	

// GET danh sách ảnh đã tạo theo user_id 
export const getCreatedImg = async (req, res)=>{		
    try{
    let {token} = req.headers;							
    let dToken = decodeToken(token);				
    let {user_id} = dToken.data;
        
    let data = await model.images.findAll({			
    where : {			
    user_id	
    },				
    })	
    responseData(res, "Thành công!", data, 200);
               
    }catch (error){			
        responseData(res, "Lỗi 500 !", error.message, 500);
    }			
    }	
// Xoá ảnh đã tạo theo ID ảnh 
export const deleteImg = async (req, res) =>{
try {
    const {token} = req.headers;							
    const dToken = decodeToken(token);				
    const {user_id} = dToken.data;
    const {img_id} = req.body

    const img = await model.images.findOne({  
        where : {
            img_id,
            user_id
        }
    });
    if (img){
        await model.image_collection.destroy({
            where : {
                img_id,
            }
        })
        await model.image_comment.destroy({
            where : {
                img_id,
            }
        })
        const filename = img.source;
        unlink(process.cwd() + "/public/img_compress/" + filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Xoá thành công file :", filename )
          });
        await model.images.destroy({
            where : {
                img_id,
                user_id
            }
        })
   
        responseData(res, "Đã xoá hình thành công!", img, 200);
    }
    
} catch (error){
    console.log(error)
    responseData(res, "Lỗi 500!", error.message, 500);
}   
}

