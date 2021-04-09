function checkNotAuthentication(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/home')
  }
  next()
}

export default checkNotAuthentication