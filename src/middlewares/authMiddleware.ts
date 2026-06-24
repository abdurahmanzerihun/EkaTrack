import { Request,Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { Role } from "../generated/prisma/enums";

interface CustomJwtPayload{
        userId:string,
        role:Role,
        username:string
}
export const authenticateUser=(req:Request,res:Response,next:NextFunction) =>{
try{
        const header=req.headers.authorization;
        if(!header || !header.startsWith("Bearer ")){
        res.status(401).json({message:"No token provided or the token does not include the Bearer"});
        return;

}
//split the header like ["Bearer","the token"] and take the the one with index 1 
const token=header.split(" ")[1];
const JWT_SECRET=process.env.JWT_SECRET;
if(!JWT_SECRET){
        throw new Error("FATAL ERROR: JWT_SECRET is not defined in the environment variables.");
}

const decoded=jwt.verify(token,JWT_SECRET);
req.user=decoded as CustomJwtPayload;
next()

}
catch(error){
        res.status(401).json({message:"The token is invalid or expired"});
}

}

export const authorizeUser=(...allowedRoles:Role[])=>{
return (req:Request,res:Response,next:NextFunction)=>{
        try{
         const userRole=req.user?.role;
         if(!userRole ){
                res.status(401).json({message:"Unauthorized: Role Missing"});
                return;
         }
      if(!allowedRoles.includes(userRole)){
       res.status(403).json({message:"Error: Role not allowed"});
       return;
}
next();

}catch(error){
               next(error);
        }
}

}
