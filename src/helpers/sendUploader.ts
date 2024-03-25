import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";

cloudinary.config({
  cloud_name: "dh0qpppfr",
  api_key: "878935735777682",
  api_secret: "OBf2PAgqMRHZpXpAJoRzYWM6VnY",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      (error, result) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
  //   cloudinary.uploader.upload(
  //     "P:/Next Level Web Dev/Full Stack Path-PH/PH-Healthcare/uploads/extend.png",
  //     { public_id: "olympic_flag" },
  //     function (error, result) {
  //       console.log(result);
  //     }
  //   );
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
