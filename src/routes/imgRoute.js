import express from "express";		
import {getImages, uploadImg, getImagesByName, getImageById, getCommentImg, checkImgId, postCommentImg, getSavedImg, getCreatedImg, deleteImg} from "../controllers/imgController.js"			

import upload from "../config/upload.js"

const imgRoute = express.Router ();			
			
imgRoute.get("/get-images", getImages);
imgRoute.post("/upload-img", upload.single("img"), uploadImg);
imgRoute.get("/get-images-by-name", getImagesByName	);
imgRoute.get("/get-image-by-id/:imgId", getImageById);
imgRoute.get("/get-comment-by-img/:imgId", getCommentImg);
imgRoute.get("/get-imgId/:imgId", checkImgId);
imgRoute.post("/post-comment", postCommentImg);
imgRoute.get("/get-saved-img", getSavedImg);
imgRoute.get("/get-created-img", getCreatedImg);
imgRoute.delete("/delete-img", deleteImg);
	
			
export default imgRoute;			