import { Ingredient } from "./ingredient.js"
import { CallableHash } from "./callableHash.js"
import { Provider } from "./provider.js"
import { IngredientLackError } from "./throwable.js"
import { Decorator } from "./decorator.js"

/**
 * @template T
 */
export class Recipe {

    /**
     * 
     * @param {string} name 
     * @param {Array<string>} dependencies 
     * @param {Provider<T>} provider
     * @param {Decorator} decorator 
     */
    constructor(name, dependencies, provider, decorator){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
        this.decorator = decorator
    }

    /**
     * @param {Decorator} decorator 
     */
    setDecorator(decorator){
        this.decorator = decorator
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
        return new Ingredient(this.name, dependencyIngredients, this.provider, this.decorator)
    }

    /**
     * @param {CallableHash<Ingredient<Instance>>} ingredients 
     * @returns {boolean}
     */
    isConstructableFrom(ingredients){
        return this.dependencies.every(dependencyName => ingredients.exist(dependencyName))
    }
}
