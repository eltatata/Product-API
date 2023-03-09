import { MulterError } from "multer";

export const processMulterError = err => {
    if (err instanceof MulterError) {
        throw new Error('Fallo el procesamiento del archivo, Error: ' + `${err.message}`);
    }
}