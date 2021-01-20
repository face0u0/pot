import { includes } from "../util/arrays.js"
import { Ingredient, IngredientHash } from "./ingredient.js"
import { Provider } from "./provider.js"
import { IngredientLackError } from "./throwable.js"

/**
 * @template T
 */
export class Recipe {

    /**
     * 
     * @param {string} name 
     * @param {Array<string>} dependencies 
     * @param {Provider<T>} provider 
     */
    constructor(name, dependencies, provider){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
    }

    /**
     * 
     * @param {IngredientHash} ingredients
     * @returns {Ingredient<T>} 
     */
    createIngredient(ingredients){
        if(!this.isConstructableFrom(ingredients)){
            throw new IngredientLackError()
        }

        const dependencyIngredients = this.dependencies.map(dependency => ingredients.get(dependency))
        return new Ingredient(this.name, dependencyIngredients, this.provider)
    }

    /**
     * @param {IngredientHash} ingredients 
     * @returns {boolean}
     */
    isConstructableFrom(ingredients){
        return this.dependencies.every(dependencyName => ingredients.exist(dependencyName))
    }
}
