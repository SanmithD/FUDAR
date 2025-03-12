import pkg from 'cloudinary';
import 'dotenv/config';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const { v2: cloudinary } = pkg;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Setting up Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FUDAR',
    allowed_formats: ['jpg', 'png', 'jpeg'], 
  },
});

const upload = multer({ storage: storage });

export default upload;
