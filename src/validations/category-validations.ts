import { z } from "zod";

export const baseCategorySchema=z.object({
name:z
        .string()
        .trim()
        .min(2,"Category name field must be atleast 2 characters")
        .max(50,"Category name field must not exceed 50 characters"),
description:z
         .string()
         .trim()
         .max(500,"Description must not exceed 500 characters")
         .optional()

})

export const createCategorySchema=z.object({
        body:baseCategorySchema
})

export const updateCategorySchema=z.object({
        params:z.object({
    id: z.uuid({ error: "Category ID must be a valid UUID" }),
}),
      body:baseCategorySchema.partial()
})

export const categoryParamsSchema=z.object({
        params:z.object({
                id:z.uuid({error:"Category ID must be a valid UUID"})
        })
})

//for compile time type checkings
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>["body"];
export type CatagoryParamsInput = z.infer<typeof categoryParamsSchema>["params"];