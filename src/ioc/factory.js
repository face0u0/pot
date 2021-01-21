import { NotImplementedError } from "./throwable.js";

/**
 * @template T
 * @interface
 */
export class Factory{

    /**
     * @param {Array<Instance>} any
     * @returns {T}
     */
    produce(...any){
        throw new NotImplementedError()
    }
}
