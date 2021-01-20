import { includes } from "../util/arrays.js"
import { Ingredient } from "./ingredient.js"
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
     * @param {Array<Ingredient<any>>} ingredients
     * @returns {Ingredient<T>} 
     */
    createIngredient(ingredients){
        if(!this.isConstructableFrom(ingredients)){
            throw new IngredientLackError()
        }

        /** @type {Object<string, Ingredient<any>>} */
        const ingredientsHash = {}

        ingredients.forEach(i => ingredientsHash[i.name] = i)
        const dependencyIngredients = this.dependencies.map(dependency => ingredientsHash[dependency])
        return new Ingredient(this.name, dependencyIngredients, this.provider)
    }

    /**
     * @param {Array<Ingredient<any>>} ingredients 
     * @returns {boolean}
     */
    isConstructableFrom(ingredients){
        const ingredientNameList = ingredients.map(i => i.name)
        return this.dependencies.every(dependencyName => includes(ingredientNameList, dependencyName))
    }
}
