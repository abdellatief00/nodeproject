const Class = require('../Model/ClassSchema');
const Child = require('../Model/ChildSchema');
const Teacher = require('../Model/TeacherSchema');


exports.getAllClasses = (req,res,next)=>{
    Class.find()
    .then((data)=>{
        res.status(200).json(data);
    }).catch((error)=>{next(error)});
}

exports.addNewClass = (req,res,next)=>{
    const newClass = new Class({
        fullname:req.body.fullname,
        supervisor:req.body.supervisor,
        children:req.body.children
    });

    newClass.save().then(()=>{
        res.status(201).json({message:"added" , newClass});
    }).catch((error)=>{next(error)})
}

exports.updateNewClass = (req,res,next)=>{
    Class.findByIdAndUpdate(req.body._id,req.body)
    .then((data)=>{
        if(data)
            res.status(200).json({message:"updated"})
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
        })
    .catch((error)=>{next(error)});
}

exports.deleteClass = (req,res,next)=>{
    Class.findByIdAndDelete(req.body._id)
    .then((data)=>{
       if(data)
        res.status(200).json({message:"deleted"})
       else{
        let error = new Error("ID Not Found");
        error.statusCode=404;
        throw error;
       }
    })
    .catch((error)=>{next(error)});
}

exports.getClassById = (req,res,next)=>{
    Class.findOne({_id:req.params.id})
    .then((data)=>{
        if(data)
            res.json(data);
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch((error)=>{next(error)});
}

exports.getClassChildrenById = (req,res,next)=>{
    Class.findOne({_id:req.params.id})
    .then((targetClass)=>{
        if(targetClass){
            const idArray = targetClass.children;
            Child.find().where('_id').in(idArray)
            .then((data)=>{res.status(200).json(data)})
            .catch((error)=>{next(error)});
        }
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch((error)=>{next(error)});
}

exports.getClassTeacherById = (req,res,next)=>{
    Class.findOne({_id:req.params.id})
    .then(targetClass=>{
        if(targetClass){
           Teacher.findById(targetClass.supervisor)
           .then((data)=>{res.status(200).json(data)})
           .catch((error)=>{next(error)});
        }else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    }).catch(error=>{next(error)})
}
