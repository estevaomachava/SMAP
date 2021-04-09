import fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'


async function deleteFile(file, type){

  if(type == 'image'){
    const image = await promisify(fs.unlink)(resolve(__dirname, '..', '..', 'tmp', 'uploads', file))
  }

  if(type == 'doc'){
    const doc = await promisify(fs.unlink)(resolve(__dirname, '..', '..', 'tmp', 'docs', file))
  }
}

export default deleteFile
