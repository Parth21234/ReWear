import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rewear-items',
    // allowed_formats removed to allow all image types
  },
});

const parser = multer({ storage: storage });

export default parser; 