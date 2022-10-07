import multer from "multer";
import path from "path";
import crypto from "crypto"
import { Request } from "express";
import { UnsupportedMediaTypeError } from "./api/utils/internalErrors";
import { error } from "console";
import fs from 'fs'

enum MESSAGE {
  UNSUPPORTED_MEDIA_TYPE = 'Tipo de arquivo não suportado'
}

module.exports = {
  dest: path.resolve(__dirname, "api", "public", "images"),
  storage: multer.diskStorage({
    destination:  (req, file, callback) => {
      let storePath = path.resolve(__dirname, "api", "public", "images")

      fs.readdir(storePath, (error) => {
        if(error) fs.mkdirSync(storePath, { recursive: true })
      })
      
      callback(null, storePath);
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err){ 
          
          callback(new Error(), "");
        }

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, fileName);
      });
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req: Request, file: { mimetype: string; }, callback: (arg0: Error | null, arg1?: boolean | undefined) => () => void) => {

    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeError(MESSAGE.UNSUPPORTED_MEDIA_TYPE));
    }
  }
};