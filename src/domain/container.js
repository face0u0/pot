import { copy, includes, isUnique } from "../util/arrays.js";
import { Ingredient } from "./ingredient.js";
import { Recipe } from "./recipe.js";
import { UnresolvedError, DuplicateNameError, IngredientNotFoundError, UnexpectedError } from "./throwable.js";

export class Container{
    
    /**
     * 
     * @param {Array<Recipe<any>>} recipes 
     */
    constructor(recipes){

        if(!isUnique(recipes.map(r => r.name))){
            throw new DuplicateNameError()
        }
        
        let notRegisterdRecipes = copy(recipes)

        /** @type {Object<string, Ingredient<any>>} */
        const ingredientsHash = {}
        while(true){
            let ingredientSatisfiedFlag = false
            notRegisterdRecipes = notRegisterdRecipes.filter(recipe => {
                const ingredientNameList = Object.keys(ingredientsHash)
                const isConstructable = recipe.dependencies.every(dependencyName => includes(ingredientNameList, dependencyName))

                if(isConstructable){
                    ingredientsHash[recipe.name] = new Ingredient(recipe.name, recipe.dependencies.map(dependency => ingredientsHash[dependency]), recipe.provider)
                    ingredientSatisfiedFlag = true
                }
                return !isConstructable
            })
            
            if(notRegisterdRecipes.length == 0){
                break
            } else if (!ingredientSatisfiedFlag){
                throw new UnresolvedError()
            }
        }

        this.__ingredientsHash = ingredientsHash
    }

    /**
     * 
     * @param {string} name 
     * @returns {any}
     */
    create(name){
        const product = this.__ingredientsHash[name]
        if(product !== undefined){
            /** @type {Array<any>} */
            return this.__produce(product)
        } else {
            throw new IngredientNotFoundError()
        }
    }

    /**
     * 
     * @param {Ingredient<T>} ingredient 
     * @returns {T}
     * @template T
     */
    __produce(ingredient){
        const sources = ingredient.dependencies.map(dependency => this.__produce(dependency))
        return ingredient.provider.produce(sources)
    }

}
