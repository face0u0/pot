import { Decorator } from "./decorator.js"
import { Provider } from "./provider.js"

/**
 * @template T
 */
export class Ingredient {

    /**
     * 
     * @param {string} name
     * @param {Array<Ingredient<Instance>>} dependencies
     * @param {Provider<T>} provider
     * @param {Decorator} decorator
     */
    constructor(name, dependencies, provider, decorator){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
        this.decorator = decorator
    }
}


