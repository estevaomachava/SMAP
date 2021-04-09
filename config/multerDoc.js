import multer from 'multer'
import { resolve } from 'path'


const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, resolve(__dirname, '..', 'tmp', 'docs')) 
  },
  filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
  },
  limits: { fileSize: 4 * 1024 * 1024 }
})

const docs = multer({ dest: resolve(__dirname, '..', 'tmp', 'docs'), storage })

export default docs