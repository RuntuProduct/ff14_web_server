import express from 'express'
import multer from 'multer'
import dealRes from '../utils/dealRes'

const router = express.Router()

// 上传文件配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const nameNow = file.originalname.split('.')
    cb(null, `${nameNow[0].slice(0, 5)}_${Date.now()}.${nameNow[1]}`)
  },
})

// var upload = multer({ dest: 'uploads/' });
const upload = multer({ storage })

// 上传图片
router.post('/', upload.single('file'), (req, res, next) => {
  const { file } = req
  console.log(file)
  dealRes(res, 0, file)
})

export default router
