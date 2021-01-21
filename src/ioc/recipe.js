import { Ingredient } from "./ingredient.js"
import { CallableHash } from "./callableHash.js"
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
     * @param {CallableHash<Ingredient<Instance>>} ingredients
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
     * @param {CallableHash<Ingredient<Instance>>} ingredients 
     * @returns {boolean}
     */
    isConstructableFrom(ingredients){
        return this.dependencies.every(dependencyName => ingredients.exist(dependencyName))
    }
}
