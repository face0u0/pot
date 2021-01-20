import { Constructable } from "./constructable.js"
import { Provider } from "./provider.js"

/**
 * @template T
 */
export class Ingredient {

    /**
     * 
     * @param {string} name
     * @param {Constructable<T>} clazz 
     * @param {Array<Ingredient<any>>} dependencies
     * @param {Provider<T>} provider
     */
    constructor(name, clazz, dependencies, provider){
        this.name = name
        this.clazz = clazz
        this.dependencies = dependencies
        this.provider = provider
    }
}
