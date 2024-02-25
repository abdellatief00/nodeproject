const Child = require('../Model/ChildSchema');



exports.getAllchildren = (req,res,next)=>{
    Child.find().then((data)=>{
        res.status(200).json(data);
    })
    .catch((error)=>{
        next(error);
    })
}


exports.getChildByID = (req,res,next)=>{

    Child.findOne({_id:req.params.id}).then((data)=>{
        if(data)
            res.status(200).json(data);
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    })
    .catch((error)=>{
        next(error);
    })
}



exports.addNewchild = (req,res,next)=>{
    const child = new Child({
        fullname:req.body.fullname,
        age:req.body.age,
        level:req.body.level,
        address:req.body.address
    });
    child.save().then(()=>{
        res.status(201).json({message:'added', child});
    })
    .catch((error)=>{
        next(error);
    })
}

exports.updatechild = (req,res,next)=>{
    Child.findByIdAndUpdate(req.body._id , req.body)
    .then((data)=>{
        if(data)
            res.status(200).json({message:'updated'})
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    })
    .catch((error)=>{
        next(error);
    })
}

exports.deleteChild = (req,res,next)=>{
    Child.findByIdAndDelete(req.body._id)
    .then((data)=>{
        if(data)
        res.status(200).json({message:'deleted'})
        else{
            let error = new Error("ID Not Found");
            error.statusCode=404;
            throw error;
        }
    })
    .catch((error)=>{
        next(error)
    })
}