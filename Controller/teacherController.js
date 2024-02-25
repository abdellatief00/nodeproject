const Teacher = require('../Model/TeacherSchema');
const bcrypt = require('bcrypt');



exports.getAllteachers = (req,res,next)=>{
    Teacher.find({}).then((data)=>{
        res.status(200).json(data);
    }).catch((error)=>{next(error)});
}


exports.addNewTeacher = (req,res,next)=>{
    const teacher = new Teacher({
        fullname: req.body.fullname,
        password: req.body.password,
        email: req.body.email,
        image: req.file.path
    })
    teacher.save().then(()=>{
        res.status(201).json({message : "added" , teacher})
    })
    .catch((error)=>{
        next(error);
    })
}


exports.updateTeacher = (req,res,next)=>{
    let pat = undefined;
    if (req.file && req.file.path) {
        pat = req.file.path;
    }
    const teacher={
        fullname: req.body.fullname,
        password: req.body.password,
        email: req.body.email,
        image: pat
    }
    Teacher.findByIdAndUpdate(req.body._id , teacher)
    .then((data)=>{
        if(data)
            res.status(201).json({message:"updated" , teacher})
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404
            throw error;
        }
    })
    .catch((error)=>{
        next(error);
    })
}


exports.deleteTeacher=(req,res,next)=>{
    Teacher.findByIdAndDelete(req.body._id)
    .then((data)=>{
       if(data)
        res.status(201).json({message:"deleted"})
       else{
        let error = new Error("ID Not Found");
        error.statusCode=404
        throw error;
       }
    })
    .catch((error)=>{next(error)});
}


exports.getTeacherByID=(req,res,next)=>{
    Teacher.findOne({_id:req.params.id})
    .then((data)=>{
        if(data)
            res.status(200).json(data);
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch((error)=>{next(error)});
}


exports.changePassword=async (req,res,next)=>{

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password=hashedPassword;

    Teacher.findByIdAndUpdate(req.body._id,req.body)
    .then((data)=>{
        if(data)
            res.status(201).json({message:"Password changed"})
        else{
            let error = new Error("User Not Found");
            error.statusCode=401;
            throw error;
        }
        })
    .catch((error)=>{next(error)});
}
