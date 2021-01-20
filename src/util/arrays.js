
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