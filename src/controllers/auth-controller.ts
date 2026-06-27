import { Request,Response,NextFunction } from "express";
import { prisma } from "../lib/prisma";
import crypto from "crypto";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';


export const login=async(req:Request,res:Response,next:NextFunction): Promise<void> =>{
        try{
           const{email,password}=req.body;

const user=await prisma.user.findUnique({
        where:{
                email
        }
}
);
// Checking if the user exists first
if (!user) {
    res.status(400).json({ message: "Invalid User or Password" });
    return ;
}

//Compare the password 

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    res.status(400).json({ message: "Invalid Password" }); 
    return ;
}

//Is the user active 
if(!user.isActive){
        res.status(403).json({message:"You have been deactivated"});
        return;
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

export const registerStaff=async (req:Request,res:Response,next:NextFunction):Promise<void> =>{

try{
        const {firstName ,lastName,phoneNumber,gender,email,role}=req.body;

        const existingUser=await prisma.user.findUnique({
                where:{
                        email
                }
        });
        if(existingUser){
                res.status(409).json({message:"The email already exists "});
                return ;
        }

//temporary password and username generations
        const OTP=crypto.randomBytes(4).toString("hex");
        const hashedPassword=await bcrypt.hash(OTP,10);
        const prefix=email.split('@')[0];
        const generatedUsername=`${prefix}_${crypto.randomBytes(2).toString("hex")}`;

//user account and profile creation with transaction
const result=await prisma.$transaction(async(tx)=>{
    const staffAccount=await tx.user.create({
                data:{
                   email,
                   username:generatedUsername,
                   role,
                   firstLogin:true,
                   password:hashedPassword
                },
        });
        
        const staffProfile=await tx.profile.create({
                data:{
                firstName,
                lastName,
                phoneNumber,
                gender,
                userId:staffAccount.id
                }

        }) ;

        return {staffAccount,staffProfile}
})
       
     res.status(200).json({
                message:"Staff Onboarded Succesfully",
                firstName:result.staffProfile.firstName,
                lastName:result.staffProfile.lastName,
                username:result.staffAccount.username,
                email:result.staffAccount.email,
                OTP
 })

}catch(error){
        next(error);
}
}


