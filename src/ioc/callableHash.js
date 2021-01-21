import { DuplicateNameError, IngredientNotFoundError } from "./throwable.js";

/**
 * @typedef {{name: string}} Callable
 */

/**
 * @template T
 */
export class CallableHash {

    /**
     *
     */
    constructor() {

        /** @type {Object<string, T & Callable>} */
        this.__hash = {};
    }

    /**
     * @param {T & Callable} callable
     */
    put(callable) {
        if(this.__hash[callable.name]){
            throw new DuplicateNameError()
        }
        this.__hash[callable.name] = callable;
    }

    /**
     * @param {Array<T & Callable>} callables
     */
    putAll(callables){
        callables.forEach(callable => {
            this.put(callable)
        })
    }

    /**
     *
     * @param {string} name
     * @returns {T & Callable}
     */
    get(name) {

        const result = this.__hash[name];
        if (result === undefined) {
            throw new IngredientNotFoundError();
        }
        return result;
    }

    /**
     *
     * @param {string} name
     * @returns {T & Callable}
     */
    delete(name) {
        const callable = this.get(name)
        delete this.__hash[name]
        return callable
    }

    /**
     *
     * @param {string} name
     * @returns {boolean}
     */
    exist(name) {
        return this.__hash[name] !== undefined;
    }

    /**
     * @param {function(T & Callable): void} callback
     */
    forEach(callback) {
        Object.keys(this.__hash).forEach(name => {
            callback(this.__hash[name])
        })
    }

    /**
     * @returns {CallableHash<T & Callable>}
     */
    duplicate(){
        /** @type {CallableHash<T & Callable>} */
        const callableHash = new CallableHash()

        callableHash.forEach(t => {
            callableHash.put(t)
        })

        return callableHash
    }

    /**
     * @returns {boolean}
     */
    isEmpty(){
        return this.size() === 0
    }

    /**
     * @returns {Number}
     */
    size(){
        return Object.keys(this.__hash).length
    }
}
