const multer = require("multer");
const router = require("express").Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/avatar", upload.single("image"));

router.post("/petPhotos", upload.array("images", 10));
module.exports = router;
