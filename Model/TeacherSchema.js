const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = new mongoose.Schema({
    fullname:String,
    password:String,
    email:String,
    image:String
})

Schema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


module.exports = mongoose.model('teachers',Schema)