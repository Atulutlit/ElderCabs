const multer = require("multer");
const fs = require('fs');

// file upload

exports.fileUpload = (path) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `${Date.now()}.${ext}`);
        },
        fileFilter: (req, file, cb) => {
            const typesArr = ['image/jpeg', 'image/png', 'image/webp'];
            if (typesArr.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
    }),
});

// file delete
exports.fileDelete = (filePath) => {
    try {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return err;
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    return err;
                }
                return true;
            });
        });
    } catch (err) {
        throw err;
    }
}