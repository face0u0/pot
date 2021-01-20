/**
 * 
 * @param {Array<any>} array 
 * @param {string} val 
 */
export const includes = (array, val) => {
    return array.indexOf(val) !== -1
}

/**
 * @param {Array<Array<T>>} arrays
 * @returns {Array<T>}
 * @template T
 */
export const concat = (...arrays) => {
    /** @type {Array<T>} */
    let concatted = []
    arrays.forEach(array => {
        concatted = concatted.concat(array)
    })
    return concatted
}

/**
 * 
 * @param {Array<T>} array 
 * @returns {T}
 * @template T
 */
export const getOne = (array) => {
    switch(array.length){
        case 0:
            throw new HasNoElementError()
        case 1:
            return array[0]
        default:
            throw new HasMultipleElementError()
    }
}

/**
 * 
 * @param {Array<any>} array 
 * @returns {boolean}
 */
export const isUnique = (array) => {
    const set = new Set(array)
    return set.size === array.length
}

export class HasNoElementError extends Error {

    constructor() {
        super("list is empty");
        this.name = "HasNoElementError";
    }
}

export class HasMultipleElementError extends Error {

    constructor() {
        super("list is not one");
        this.name = "HasMultipleElementError";
    }
}
