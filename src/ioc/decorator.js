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
    patch(instance){
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
    patch(instance){
        // do nothing
    }
}