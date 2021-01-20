import { Constructable } from "./constructable.js"
import { Ingredient } from "./ingredients.js"
import { NotImplementedError } from "./throwable.js"

/**
 * @interface
 * @template T
 */
export class Provider {

    /**
     * @param {Object<string, object>} container // instance hashmap
     * @returns T
     */
    produce(container){
        throw new NotImplementedError()
    }
}

/**
 * @implements Provider<T>
 * @template T
 */
export class SingletonProvider {

    constructor(){
        this.cache = null
    }

    /** 
     * @param {Object<string, object>} container
     * @returns T
     */
    produce(container){
        if(this.cache === null){
            this.cache = this.makeOnce(container)
        }
        return this.cache
    }
    
    /**
     * @abstract
     * @param {Object<string, object>} container
     * @returns T
     */
    makeOnce(container){
        throw new NotImplementedError()
    }
}

/**
 * @implements Provider<T>
 * @extends SingletonProvider<T>
 * @template T
 */
export class NormalProvider extends SingletonProvider {

    /**
     * 
     * @param {Constructable<T>} clazz 
     */
    constructor(clazz){
        super()
        /**
         * @param {Object<string, object>} container
         */
        this.recipe = (container) => {
            //@ts-ignore
            clazz.bind.apply(clazz, [null].concat(container))
            // @ts-ignore
            return new clazz()
        }
    }

    /**
     * @param {Object<string, object>} container
     * @returns T
     */
    makeOnce(container){
        return this.recipe(container)
    }
}