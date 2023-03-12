import express from 'express';
import { deleteImage, findImages, uploadImage } from '../controllers/images.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
const router = express.Router();

/* GET home page. */
router.get('/', findImages);

router.post('/upload', requireToken, uploadImage);

router.get('/delete/:name', requireToken, deleteImage);

export default router;