import multer from 'multer'
import { resolve } from 'path'


const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, resolve(__dirname, '..', 'tmp', 'uploads')) 
  },
  filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
  },
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/tif", "image/pcx", "image/tga"]
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Este ficheiro é inválido'))
    }
  }
})

const upload = multer({ dest: resolve(__dirname, '..', 'tmp', 'uploads'), storage })

export default upload