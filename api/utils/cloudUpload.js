import cloudinary from "cloudinary";
import multer from "multer";

import dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, './api/utils/file-uploads');
    }
    else {
      cb({ message: 'only image files are allowed!' }, false)
    }
  },
  filename: function (req, file, cb) { cb(null, file.originalname); }
})


export const upload = multer({ storage: storage });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


export const uploads = file => (
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (result) => {
      if (result.error){
        reject(result.error)
      }
      else {
        resolve({ url: result.url, id: result.public_id })
      }
    }, { resource_type: "auto" })
  })
)