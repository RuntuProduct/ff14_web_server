const express = require('express');
const router = express.Router();
const multer  = require('multer');
const dealRes = require('../utils/dealRes');

// 上传文件配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let nameNow = file.originalname.split('.');
    cb(null, nameNow[0].slice(0, 5) + '_' + Date.now() + '.' + nameNow[1])
  }
})

// var upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage })

// 上传图片
router.post('/', upload.single('file'), (req, res, next) => {
  let file = req.file;
  console.log(file);
  dealRes(res, 0, file);
})

module.exports = router;