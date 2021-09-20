
Options = ()=>{
    let options = {
        secret:process.env.SESSION_KEY,
        resave: true,
        saveUninitialized: true
      }
      return options
}


const validatePage = (req, res, next)=>{
  try{
      console.log(!req.session)
      if(!req.session.userdata || req.session.userdata.msisdn == null || req.session.msisdn == "" || req.session.msisdn == typeof undefined){
          res.redirect('/login')
      }else{
          next()
      }
  }catch(e){
      res.redirect('/login')
  }
}

const validateJSON = (req, res, next)=>{
  try{
      if(!req.session.userdata || req.session.userdata.msisdn == null || req.session.msisdn == "" || req.session.msisdn == typeof undefined){
          res.status(401).json({
              status:'error',
              code:401,
              message:'Session is expired or was not initiated!'
          })
      }else{
          next()
      }
  }catch(e){
      res.status(401).json({
          status:'error',
          code:401,
          message:'Session is expired or was not initiated!'
      })
  }
}

module.exports = {validatePage, validateJSON, Options}
