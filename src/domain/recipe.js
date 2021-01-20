import { Constructable } from "./constructable"
import { Provider } from "./provider"

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