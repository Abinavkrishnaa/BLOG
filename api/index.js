import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('mongodb connected');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
app.get('/test',(req,res)=>{
    res.send({msg:'hello world'});
})