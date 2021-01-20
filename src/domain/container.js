import { copy, includes, isUnique, remove } from "../util/arrays.js";
import { Factory } from "./factory.js";
import { Ingredient, IngredientHash } from "./ingredient.js";
import { Recipe } from "./recipe.js";
import { UnresolvedError, DuplicateNameError, IngredientNotFoundError, UnexpectedError } from "./throwable.js";

export class Container{
    
    /**
     * 
     * @param {IngredientHash} ingredients
     */
    constructor(ingredients){
        
        this.__ingredients = ingredients
    }

    /**
     * 
     * @param {string} name 
     * @returns {any}
     */
    create(name){
        const product = this.__ingredients.get(name)
        /** @type {Array<any>} */
        return this.__produce(product)
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

/**
 * @implements Factory<Container>
 */
export class ContainerFactory {

    constructor(){}

    /**
     * @param {Array<Recipe<any>>} recipes 
     * @returns {Container}
     */
    produce(recipes) {

        this.__ensureUnique(recipes)

        const notResolvedRecipes = copy(recipes)

        const ingredients = new IngredientHash()

        while(notResolvedRecipes.length > 0){
            const prevNotResolvedLen = notResolvedRecipes.length
            notResolvedRecipes.forEach(recipe => {

                if(recipe.isConstructableFrom(ingredients)){
                    ingredients.put(recipe.createIngredient(ingredients))
                    remove(notResolvedRecipes, recipe)
                }
            })
            
            if (prevNotResolvedLen === notResolvedRecipes.length){
                throw new UnresolvedError()
            }
        }

        return new Container(ingredients)
    }

    /**
     * 
     * @param {Array<Recipe<any>>} recipes 
     */
    __ensureUnique(recipes){
        if(!isUnique(recipes.map(r => r.name))){
            throw new DuplicateNameError()
        }
    }
}
