import path from "path";
import fs from "fs";
import multer from "multer";
import { Img } from "../models/Img.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { processMulterError } from "../utils/processMulterError.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;

        const mimeType = fileTypes.test(file.mimetype);

        const extName = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extName) {
            return cb(null, true);
        }

        cb(console.log("Error: El archivo no es una imagen"));
    }
}).single("image");

export const findImages = async (req, res) => {
    try {
        const images = await Img.find().lean();

        res.json({ images: images })
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const uploadImage = async (req, res) => {
    upload(req, res, async (err) => {
        try {
            processMulterError(err);

            const image = new Img({
                name: req.file.originalname,
                url: `http://localhost:3000/${req.file.originalname}`,
            });

            await image.save();

            console.log(image);

            res.json({ upload: true, image: image });
        } catch (error) {
            res.json({ upload: true, error: error.message });
        }
    })
}

export const deleteImage = async (req, res) => {
    try {
        const { name } = req.params;

        const image = await Img.findOne({ name: name });

        const dirFile = path.join(__dirname, `../uploads/${image.name}`);
        fs.unlinkSync(dirFile);

        console.log(`Imagen eliminada: ${name}`);

        res.json({ delete: true, image: image });
    } catch (error) {
        res.json({ delete: false, error: error.message });
    }
}