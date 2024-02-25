const jwt = require("jsonwebtoken");

const Key = process.env.SECRET_KEY;


module.exports=(req,res,next)=>{
    try{
        let token = req.get('authorization').split(" ")[1];
        let decodedToken = jwt.verify(token,Key);
        req.token=decodedToken;
        next();
    }catch(error){
            error.message = "Not Authinticated";
            error.statusCode = 403;
            next(error);
    }
   
}



module.exports.isAdmin=(req,res,next)=>{
    if(req.token.role=="Admin"){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}

module.exports.isAdminOrTeacher=(req,res,next)=>{
    if(req.token.role=="Admin" || req.token.role == "Teacher"){
        next();
    }else{
        let error = new Error('Not Authorized');
        error.statusCode=403;
        next(error);
    }
}