import { Provider } from "./provider.js"
import { IngredientNotFoundError } from "./throwable.js"

/**
 * @template T
 */
export class Ingredient {

    /**
     * 
     * @param {string} name
     * @param {Array<Ingredient<any>>} dependencies
     * @param {Provider<T>} provider
     */
    constructor(name, dependencies, provider){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
    }
}

export class IngredientHash {

    /**
     * 
     */
    constructor(){

        /** @type {Object<string, Ingredient<any>>} */
        this.__hash = {}
    }

    /**
     * @param {Ingredient<any>} ingredient
     */
    put(ingredient){
        this.__hash[ingredient.name] = ingredient
    }

    /**
     * 
     * @param {string} name 
     * @returns {Ingredient<any>}
     */
    get(name){

        const result = this.__hash[name]
        if(result === undefined){
            throw new IngredientNotFoundError()
        }
        return result
    }

    /**
     * 
     * @param {string} name 
     * @returns {boolean}
     */
    exist(name){
        return this.__hash[name] !== undefined
    }
}
