import { includes } from "../util/arrays.js";
import { Ingredient } from "./ingredients.js";
import { Recipe } from "./recipe.js";
import { CircularReferenceError, UnexpectedError } from "./throwable.js";

export class Container{
    
    /**
     * 
     * @param {Array<Recipe<any>>} recipes 
     */
    constructor(recipes){
        
        /** @type {Object<string, Recipe<any>>} */
        const recipeHash = {}
        recipes.forEach(recipe => recipeHash[recipe.name] = recipe)

        /** @type {Object<string, Ingredient<any>>} */
        const ingredientsHash = {}
        while(true){
            let ingredientSatisfiedFlag = false
            Object.keys(recipeHash).forEach(name => {
                const stuff = recipeHash[name]

                const ingredientsName = Object.keys(ingredientsHash)
                const satisfied = stuff.dependencies.filter(dependency => !includes(ingredientsName, dependency)).length === 0 // can create only to use ingredients 
                if(satisfied){
                    ingredientsHash[name] = new Ingredient(name, stuff.clazz, stuff.dependencies.map(dependency => ingredientsHash[dependency]), stuff.provider)
                    ingredientSatisfiedFlag = true
                }
            })
            
            if(Object.keys(ingredientsHash).length === Object.keys(recipeHash).length){
                break
            } else if (!ingredientSatisfiedFlag){
                throw new CircularReferenceError()
            }
        }

        this.__ingredientsHash = ingredientsHash
    }

    /**
     * 
     * @param {string} name 
     */
    create(name){
        const product = this.__ingredientsHash[name]
        if(product !== undefined){
            /** @type {Array<any>} */
            const products = product.dependencies.map(dependency => this.create(dependency.name))
            return product.provider.produce(products)
        } else {
            throw new IngredientNotFoundError()
        }
    }

}


export class IngredientNotFoundError extends Error {

    constructor() {
        super("ingredient not found");
        this.name = "UnexpIngredientNotFoundErrorectedError";
    }
}