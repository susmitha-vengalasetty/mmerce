import multer from "multer";
import fs from "fs";

const uploadPath = "./uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        const uniqueName = Date.now() + "-" + file.originalname;
        callback(null, uniqueName);
    },
});

const upload = multer({ storage });

export default upload;
