import deleteFile from './deleteFile'

function checkStudentProfile(req, res, next){
  const { year, civil } = req.body
  const { filename } = req.file
  const today = parseInt(new Date().getFullYear().toString())

  if((today - parseInt(year)) < 5){
    deleteFile(filename, 'image')
    req.flash('err', 'A data inserida está incorrecta!')
    return res.redirect('/students')
  }

  if(civil == 'Casado' && (today - parseInt(year)) < 18){
    deleteFile(filename, 'image')
      req.flash('err', 'O estado civil não coincide com a idade do estudante!')
      return res.redirect('/students')
  }
  
  next()

}

export default checkStudentProfile