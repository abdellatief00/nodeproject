const mongoose = require('mongoose');
const {autoInc } = require('auto-increment-group');




const Schema = new mongoose.Schema({
    _id:String,
    fullname:String,
    supervisor:{type:mongoose.Types.ObjectId, ref:'teachers'},
    children:[{type:String, ref:'children'}]
});


Schema.plugin(autoInc, {
    field: "_id",
    digits: 4,
    startAt: 1,
    incrementBy: 1,
    unique: false
});

module.exports = mongoose.model("classes",Schema);