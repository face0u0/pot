import { NotImplementedError } from "./throwable.js";

/**
 * 
 * @interface
 * @template T
 */
export class Decorator{

    /**
     * 
     * @param {T} instance 
     */
    observe(instance){
        throw new NotImplementedError()
    }
}

/**
 * 
 * @abstract
 * @implements {Decorator<T>}
 * @template T
 */
export class ExactryOnceDecorator{

    constructor(){

        /** @type {Array<T>} */
        this.prevs = []
    }

    /**
     * 
     * @param {T} instance 
     */
    observe(instance){
        const isDecorated = this.prevs.some(t => (typeof t === "object") && t === instance)
        if(!isDecorated){
            this.prevs.push(instance)
            this.onceDo(instance)
        }
    }
    /**
     * 
     * @param {T} instance
     * @abstract 
     */
    onceDo(instance){
        throw new NotImplementedError()
    }
}

/**
 * @implements {Decorator<Instance>}
 */
export class SilentDecorator{

    /**
     * 
     * @param {Instance} instance 
     */
    observe(instance){
        // do nothing
    }
}