import { Constructable } from "./constructable.js"
import { NotImplementedError } from "./throwable.js"

/**
 * @interface
 * @template T
 */
export class Provider {

    /**
     * @param {Array<any>} container // instance hashmap
     * @returns {T}
     */
    produce(container){
        throw new NotImplementedError()
    }
}

/**
 * @implements {Provider<T>}
 * @template T
 */
export class SingletonProvider {

    constructor(){
        /** @type {T|null} */
        this.cache = null
    }

    /** 
     * @param {Array<any>} container
     * @returns {T}
     */
    produce(container){
        if(this.cache === null){
            this.cache = this.makeOnce(container)
        }
        return this.cache
    }
    
    /**
     * @abstract
     * @param {Array<any>} container
     * @returns {T}
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
         * @param {Array<any>} container
         */
        this.recipe = (container) => {
            //@ts-ignore
            const binded = clazz.bind.apply(clazz, [null].concat(container))
            return new binded()
        }
    }

    /**
     * @param {Array<any>} container
     * @returns {T}
     */
    makeOnce(container){
        return this.recipe(container)
    }
}
