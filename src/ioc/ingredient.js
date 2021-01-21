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
     */
    constructor(name, dependencies, provider){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
    }
}


