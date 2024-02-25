const mongoose = require('mongoose');
const {autoInc } = require('auto-increment-group');


const AddressSchema = new mongoose.Schema({
    city:String,
    street:String,
    building:String
},{_id:false});

const Schema = new mongoose.Schema({
    _id:String,
    fullname:String,
    age : Number,
    level : {
        type:String,
        enum:["PreKG","KG1","KG2"]
    },
    address : AddressSchema
})

Schema.plugin(autoInc, {
    field: "_id",
    digits: 4,
    startAt: 1,
    incrementBy: 1,
    unique: false
});

module.exports = mongoose.model('children',Schema);