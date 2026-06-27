import { TypeOf, z } from "zod";
import { PaymentMethodScalarFieldEnum } from "../generated/prisma/internal/prismaNamespaceBrowser";

export const productBaseSchema=z.object({
       
name: z
    .string()
    .trim()
    .min(2, 'Product name must be at least 2 characters')
    .max(255, 'Product name cannot exceed 255 characters'),
  
sku: z
    .string()
    .trim()
    .min(3, 'SKU must be at least 3 characters')
    .max(50, 'SKU cannot exceed 50 characters')
    .regex(/^[A-Z0-9-_]+$/, 'SKU must be uppercase alphanumeric, hyphens, or underscores'),
  
description: z
    .string()
    .trim()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional()
    .nullable(),
  
  // Coerce handles stringified inputs from multi-part form data or query params
sellingPrice: z
    .coerce
    .number("Selling price must be a number")
    .positive('Selling price must be greater than 0'),
stockCount: z
    .coerce
    .number({error:"Stock count must be a number"})
    .int('Stock count must be a whole number')
    .nonnegative('Stock count cannot be negative')
    .default(0),
  
lowStockThreshold: z
    .coerce
    .number()
    .int('Low stock threshold must be a whole number')
    .nonnegative('Threshold cannot be negative')
    .default(5),
  
})
export const createProductSchema=z.object({
        params:z.object({
        categoryId: z
    .uuid('Invalid category ID format'),
       
}),
        body:productBaseSchema
});

export const updateProductSchema=z.object({
        params:z.object({
                productId:z
                .uuid("Product ID must be a valid UUID")
        }),
        body:productBaseSchema.partial()
});

export const productParamsSchema=z.object({
        params:z.object({
                id:z.uuid()
        })
});

export type CreateProductInput = z.infer <typeof createProductSchema>["body"]
export type UpdateProductInput = z.infer <typeof updateProductSchema>["body"]
export type ProductParamsInput = z.infer <typeof productParamsSchema>["params"]