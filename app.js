const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const teacherRouter = require('./Route/teacherRoute');
const childRouter = require('./Route/childRouter');
const classRouter = require('./Route/classRouter');
const authRoute = require('./Route/authRoute');
const authorizationMW =  require('./MiddleWares/authMW');
const upload = require('./MiddleWares/uploadImage');
const docsRoute =  require('./Route/docsRoute');


const server = express();
const port = process.env.port || 8080
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(()=>{
    console.log('Db is connected')
    server.listen(port,()=>{
        console.log("server listening" , port);
    })
    
})
.catch((error)=>{
    console.log('error connecting to db');
})



//------------------ morgan


server.use(morgan("combined"));



//---------------settings 

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));



//----Auth mdware ------//


server.use((req,res,next)=>{
    console.log('user is Authoraized'); 
    next();
})


//---------------routes---------

server.use(authRoute); 
server.use(docsRoute);

server.use(authorizationMW);

server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);




//---------error handling -------------
server.use((request,response,next)=>{
    response.status(404).json({message:"Not Found"});
    next();
});

server.use((error,request,response,next)=>{
    response.status(500).json({message:error.message+""});
})

