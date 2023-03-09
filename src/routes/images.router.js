import express from 'express';
import { deleteImage, findImages, uploadImage } from '../controllers/images.controller.js';
const router = express.Router();

/* GET home page. */
router.get('/', findImages);

router.post('/upload', uploadImage);

router.get('/delete/:name', deleteImage);

export default router;