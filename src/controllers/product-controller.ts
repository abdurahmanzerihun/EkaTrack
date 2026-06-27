import { NextFunction,Request,Response } from "express";
import { prisma } from "../lib/prisma";

export const createProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
      const {name,sku,description,sellingPrice,stockCount,lowStockThreshold}=req.body;
        const categoryId=req.params.categoryId;

        const existingProduct=await prisma.product.findUnique({
                where:{
                        sku
                }
        });
        //find if there is already  
        if(existingProduct){
                res.status(400).json({message:"A product already exists"});
                return;
        }
        const newProduct=await prisma.product.create({
              data:{
                name,
                sku:sku,
                sellingPrice,
                stockCount,
                lowStockThreshold,
                description:description?description:null,
                categoryId:categoryId as string
              }
        });

        res.status(201).json({
              message:"You have successfully created a product" ,
              productName:newProduct.name,
              productSKU:newProduct.sku,
              description:newProduct.description,
              catagoryId:newProduct.categoryId
})
        }catch(error){
                next(error);
        }
       
}
export const getAllProducts=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
       try{
const currenProducts=await prisma.product.findMany({
        where:{
                isDeleted:false
        },
        orderBy:{
                createdAt:'desc'
        }
});
res.status(200).json({currenProducts});

}catch(error){
        next(error);
       }

}

export const updateProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{

        try{ 
        const{name,sku,sellingPrice,stockCount,lowStockThreshold,description}=req.body
        const {productId}=req.params;

        const existingProduct=await prisma.product.findUnique({
                where:{
                        id:productId as string
                }
        });
        if(!existingProduct){
                res.status(404).json({message:"The product with that ID is not found"});
                return;

        }
        const updatedProduct=await prisma.product.update({
                where:{
                        id:productId as string
                },
                 data:{
                name,
                sku:sku,
                sellingPrice,
                stockCount,
                lowStockThreshold,
                description:description?description:null,
              }
        });
        res.status(200).json({
                message:"You successfully updated a product",
                Name:updatedProduct.name,
                SKU:updatedProduct.sku,
                description:updatedProduct.description,
                categoryId:updatedProduct.categoryId
});

}catch(error){
                next(error);
        }
       
}

export const deleteProduct=async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try{
const {productId}=req.params;

         const existingProduct=await prisma.product.findUnique({
                where:{
                        id:productId as string
                }

         });

         if(!existingProduct){
                res.status(404).json({message:"The product with that ID is not found"});
                return;
         }

         await prisma.product.update({
                where:{
                        id:productId as string
                },
                data:{
                        isDeleted:true

                }
         });

         res.status(200).json({message:"Product was successfully deleted"})
        
        }catch(error){
                next(error);
        }
         
}