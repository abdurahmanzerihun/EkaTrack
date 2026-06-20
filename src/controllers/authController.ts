import { Request,Response,NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { compare } from "bcrypt";
import jwt  from "jsonwebtoken";

export const login=async(req:Request,res:Response,next:NextFunction): Promise<void> =>{
        try{
           const{email,password}=req.body;

//validate email 
if(!email || !password){
        res.status(400).json({message:"The email and password fields are required"});
        return;
}
const user=await prisma.user.findUnique({
        where:{
                email
        }
}
);
if(!user || ! (await compare(password,user.password))){
        res.status(400).json({message:"Invalid User or Password"});
        return;
}

//Is the user active 
if(!user.isActive){
        res.status(403).json({message:"You have been deactivated"})
}

//jwt token generation
const JWT_SECRET=process.env.JWT_SECRET;

if(!JWT_SECRET){
        throw new Error("Fatal error . The JWT_SECRET is not defined in the file. ")
}
const token=jwt.sign({userId:user.id,role:user.role,username:user.username},JWT_SECRET,{expiresIn:'8h'})

res.status(200).json({
        message:"Login successful",
        token,
        user:{id:user.id,username:user.username,email:user.email,role:user.role}

});
     
}catch(error){
        next(error)
}


};
