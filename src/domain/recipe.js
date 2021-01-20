import { Constructable } from "./constructable.js"
import { Provider } from "./provider.js"

/**
 * @template T
 */
export class Recipe {

    /**
     * 
     * @param {string} name 
     * @param {Constructable<T>} clazz 
     * @param {Array<string>} dependencies 
     * @param {Provider<T>} provider 
     */
    constructor(name, clazz, dependencies, provider){
        this.name = name
        this.clazz = clazz
        this.dependencies = dependencies
        this.provider = provider
    }
}