import { NextFunction,Request,Response } from "express";
import { prisma } from "../lib/prisma";

export const createCategory=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
         let{name,description}=req.body;
         //Checking if the name is string 
        if(typeof(name)!=="string"){
                res.status(400).json({message:"The name field can only be string"});
                return;
        }
        //ensuring the name field is not empty string or just space 
        if(!name.trim()){
               res.status(400).json({message:"The category name is required"});
                return;  
        }
        const existingName=await prisma.category.findUnique({
                where:{
                        name:name.trim()
                }
        });
        if(existingName){
                res.status(400).json({message:"The category name already exists"});
                return ;
        }

        const newCategory=await prisma.category.create({
                data:{
                        name:name.trim(),
                        description:description? description:null

                }
        }); 
        
        res.status(200).json({
                message:"Category created successfully",
                name:newCategory.name,
                description:newCategory.description,
                id:newCategory.id

        });
        
        }catch(error){
                next(error);
        }
}

export const getCategory=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
 const currentCategories=await prisma.category.findMany({
        where:{
                isDeleted:false
        },
                orderBy:{
                        createdAt:'desc'
                }
        });

        res.status(200).json({currentCategories});

        }catch(error){
                next(error);
        }
}
export const updateCategory=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
 let {name,description}=req.body;
         if(!name){
                res.status(400).json({message:"Name of the category is required "});
                return ;
        }
//check if the cateory exists first
        const existingCategory=await prisma.category.findUnique({
                where:{
                        id:req.params.id as string
                }
        });
        if(!existingCategory){
                res.status(404).json({message:"The category is not found"});
                return;
        }
        if(name.trim()!==existingCategory.name){
                const nameConflict=await prisma.category.findUnique({
                        where:{
                                name:name.trim()
                        }
                });
                if(nameConflict){
                        res.status(400).json({message:"The category with this name already exists"});
                        return;
                }
              
        }
         
//update the category 
        const updatedCategory=await prisma.category.update({
                where:{
                        id:req.params.id as string    
                },
                data:{
                        name:name.trim(),
                        description:description? description:null
                }
        });
        
        res.status(200).json({
                message:"The category is updated successfully",
                updatedCategory

        });

}catch(error){
                next(error);
        }
        }
       
export const deleteCatagory=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
try {
//check if the category exists 
        const existingCategory=await prisma.category.findUnique({
                where:{
                        id:req.params.id as string
                }
        });
        if(!existingCategory || existingCategory.isDeleted){
                res.status(404).json({message:"The category is not found"});
                return;
        }

//soft-delete the category 
await prisma.category.update({
        where:{
                id:req.params.id as string
        },
        data:{
isDeleted:true
        }
});

res.status(200).json({
        message:"Catagory was successfully deleted",
})

}catch(error){
        next(error);
}
        
}