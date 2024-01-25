import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt  from "jsonwebtoken";
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password||username==='' || email==='' || password==='') {

        return next(errorHandler(400,'all field are required'))
    }
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPassword});
    try {
        
        await newUser.save();
        res.json('success')
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
export const signin=async(req,res,next)=> {
    const{username,email,password}=req.body;
    if (!email || !password || email==='' || password==='') {
        return next(errorHandler(400,"please provide a valid user name and password"))
    }
    try {    
        const user = await User.findOne({email});
        if (!user) {
            return next(errorHandler(400,"Invalid Credentials"));
        }
        const isValidPass =bcryptjs.compareSync(password,user.password);
        if (!isValidPass) {
            return next(errorHandler(400,"Invalid Password"));
        }
        const token =Jwt.sign({id : user._id},process.env.JWT_SECRET)
        const {password:pass , ...rest}=user._doc;
        res.status(200).cookie("access_token",token ,{httpOnly:true}).json(rest)

    } catch (error) {
        next(error)
    }
}