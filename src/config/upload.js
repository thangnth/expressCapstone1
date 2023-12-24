import multer from "multer";			

//Xử lý hình ảnh tại middleware
let storage = multer.diskStorage({			
destination: process.cwd() + "/public/img",			
filename: (req, file, callback)=>{			
let newName = new Date().getTime() + "_" + file.originalname;			
callback(null, newName)			
}			
})			
let upload = multer({storage})			
export default upload;	

//--> đưa upload.single("img") vào route