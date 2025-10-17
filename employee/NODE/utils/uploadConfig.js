const fs = require("fs");
const multer = require("multer");
const path = require("path");

// 1. Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");

    // if uploads folder not exist -> create
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
    console.log("🍋 path.extname(file.originalname)", path.extname(file.originalname));
    console.log("🧁 file.originalname", file.originalname);
    console.log("🦆 Date.now()", Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
