import { NextFunction,Request,Response } from "express";
import { prisma } from "../lib/prisma";

export const createProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
      const {name,sku,description,sellingPrice,stockCount,lowStockThreshold}=req.body;
        const catagoryId=req.params.id;

       if(typeof(sku)!=="string"){
                res.status(400).json({message:"Stock Keeping Unit(SKU) can only be string"});
                return;
        } 
         if(typeof(name)!=="string"){
                res.status(401).json({message:"Name can only be string"});
                return;
        }
        if(!sku.trim()){
                res.status(400).json({message:"The Stock Keeping Unit(SKU) is required"});
                return;
        }
        const existingProduct=await prisma.product.findUnique({
                where:{
                        sku:sku.trim()
                }
        });
        //find if there is already  
        if(existingProduct){
                res.status(400).json({message:"A product already exists"});
                return;
        }
        
        if(!sellingPrice){
                res.status(401).json({message:"Selling Price field is required"});
                return;
        }
        if(!sku){
                res.status(401).json({message:"Name field is required"});
                return;
        }
        const newProduct=await prisma.product.create({
              data:{
                name:name.trim(),
                sku:sku.trim(),
                sellingPrice,
                stockCount,
                lowStockThreshold,
                description:description?description:null,
                categoryId:catagoryId as string
              }
        })
        }catch(error){
                next(error);
        }
       
}

export const getProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        
}

export const updateProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        
}

export const deleteProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        
}