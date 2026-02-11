import z from "zod";
import { PaginationSchema } from "./pagination";

export const RecipeSchema = z.object({
    id: z.number(),
    product_id: z.number(),
    material_id: z.number(),
    material_quantity: z.number(),
})

export type RecipeResType = z.TypeOf<typeof RecipeSchema>

export const RecipeListRes = z.object({
    data: z.array(RecipeSchema),
    pagination: PaginationSchema,
})
export type RecipeListResType = z.TypeOf<typeof RecipeListRes>

export const CreateRecipeBody = z.object({
    product_id: z.number(),
    material_id: z.number(),
    material_quantity: z.number(),
})
export type CreateRecipeBodyType = z.TypeOf<typeof CreateRecipeBody>