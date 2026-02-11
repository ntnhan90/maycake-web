import http from "@/utils/http";
import { RecipeListResType, RecipeResType, CreateRecipeResBodyType } from "@/models/recipeModel";
const prefix = '/product-recipes'

const recipeApiRequest = {
    list:(params?:{
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<RecipeListResType>(prefix,{params}),
    get:(id:number) => http.get<RecipeResType>(`${prefix}/${id}`),
    create:(body: CreateRecipeResBodyType) => http.post<RecipeResType>(prefix, body),    
    update:(id:number, body: CreateRecipeResBodyType) => http.put<RecipeResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<RecipeResType>(`${prefix}/${id}`),
}

export default recipeApiRequest