(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IocPot"] = factory();
	else
		root["IocPot"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pot": () => /* reexport safe */ _src_api_js__WEBPACK_IMPORTED_MODULE_0__.Container
/* harmony export */ });
/* harmony import */ var _src_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/api.js */ "./src/api.js");



/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => /* reexport safe */ _ioc_container_js__WEBPACK_IMPORTED_MODULE_0__.Container
/* harmony export */ });
/* harmony import */ var _ioc_container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ioc/container.js */ "./src/ioc/container.js");


/***/ }),

/***/ "./src/ioc/callableHash.js":
/*!*********************************!*\
  !*** ./src/ioc/callableHash.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CallableHash": () => /* binding */ CallableHash
/* harmony export */ });
/* harmony import */ var _throwable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./throwable.js */ "./src/ioc/throwable.js");


/**
 * @typedef {{name: string}} Callable
 */

/**
 * @template T
 */
class CallableHash {

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
            throw new _throwable_js__WEBPACK_IMPORTED_MODULE_0__.DuplicateNameError()
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
            throw new _throwable_js__WEBPACK_IMPORTED_MODULE_0__.IngredientNotFoundError();
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

        this.forEach(t => {
            callableHash.put(t)
        })

        return callableHash
    }

    /**
     * @returns {boolean}
     */
    hasAny(){
        return this.size() !== 0
    }

    /**
     * @returns {Number}
     */
    size(){
        return Object.keys(this.__hash).length
    }
}


/***/ }),

/***/ "./src/ioc/constructable.js":
/*!**********************************!*\
  !*** ./src/ioc/constructable.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Constructable": () => /* binding */ Constructable
/* harmony export */ });
/**
 * @template T
 * @interface
 */
class Constructable{}


/***/ }),

/***/ "./src/ioc/container.js":
/*!******************************!*\
  !*** ./src/ioc/container.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => /* binding */ Container
/* harmony export */ });
/* harmony import */ var _callableHash_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./callableHash.js */ "./src/ioc/callableHash.js");
/* harmony import */ var _provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider.js */ "./src/ioc/provider.js");
/* harmony import */ var _recipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recipe.js */ "./src/ioc/recipe.js");
/* harmony import */ var _resolver_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolver.js */ "./src/ioc/resolver.js");





class Container {

    constructor(){

        /** @type {CallableHash<Recipe<Instance>>} */
        this.__recipes = new _callableHash_js__WEBPACK_IMPORTED_MODULE_0__.CallableHash()

        /** @type {Object<string, string>} */
        this.__aliasesHashMap = {}

        /** @type {Resolver|null} */
        this.__resolver = null
    }

    /**
     * 
     * @param {string} name 
     * @param {object} clazz 
     * @param {Array<string>} dependencies
     */
    service(name, clazz, dependencies){
        this.__define(new _recipe_js__WEBPACK_IMPORTED_MODULE_2__.Recipe(name, dependencies, new _provider_js__WEBPACK_IMPORTED_MODULE_1__.NormalProvider(clazz)))
    }

    /**
     * 
     * @param {string} name 
     * @param {string} preDefinedName 
     */
    alias(name, preDefinedName){
        this.__aliasesHashMap[name] = preDefinedName
    }

    resolve(){
        const aliasRecipes = this.__resolveAliases()
        this.__aliasesHashMap = {}
        this.__recipes.putAll(aliasRecipes)
        this.__resolver = new _resolver_js__WEBPACK_IMPORTED_MODULE_3__.ResolverFactory().produce(this.__recipes)
    }

    /**
     * 
     * @param {string} name 
     */
    locate(name){
        if(this.__resolver === null){
            return null
        }
        return this.__resolver.create(name)
    }

    /**
     * 
     * @param {Recipe<Instance>} recipe
     */
    __define(recipe){
        this.__recipes.put(recipe)
    }

    /**
     * @returns {Array<Recipe<Instance>>}
     */
    __resolveAliases(){
        const recipes = Object.keys(this.__aliasesHashMap).map(aliasName => {
            const preDefinedName = this.__aliasesHashMap[aliasName]
            const recipe = this.__recipes.get(preDefinedName)
            return new _recipe_js__WEBPACK_IMPORTED_MODULE_2__.Recipe(aliasName, recipe.dependencies, recipe.provider)
        })
        return recipes
    }
}


/***/ }),

/***/ "./src/ioc/factory.js":
/*!****************************!*\
  !*** ./src/ioc/factory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Factory": () => /* binding */ Factory
/* harmony export */ });
/* harmony import */ var _throwable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./throwable.js */ "./src/ioc/throwable.js");


/**
 * @template T
 * @interface
 */
class Factory{

    /**
     * @param {Array<Instance>} any
     * @returns {T}
     */
    produce(...any){
        throw new _throwable_js__WEBPACK_IMPORTED_MODULE_0__.NotImplementedError()
    }
}


/***/ }),

/***/ "./src/ioc/ingredient.js":
/*!*******************************!*\
  !*** ./src/ioc/ingredient.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ingredient": () => /* binding */ Ingredient
/* harmony export */ });
/* harmony import */ var _provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./provider.js */ "./src/ioc/provider.js");


/**
 * @template T
 */
class Ingredient {

    /**
     * 
     * @param {string} name
     * @param {Array<Ingredient<Instance>>} dependencies
     * @param {Provider<T>} provider
     */
    constructor(name, dependencies, provider){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
    }
}




/***/ }),

/***/ "./src/ioc/provider.js":
/*!*****************************!*\
  !*** ./src/ioc/provider.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Provider": () => /* binding */ Provider,
/* harmony export */   "SingletonProvider": () => /* binding */ SingletonProvider,
/* harmony export */   "NormalProvider": () => /* binding */ NormalProvider
/* harmony export */ });
/* harmony import */ var _constructable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructable.js */ "./src/ioc/constructable.js");
/* harmony import */ var _throwable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throwable.js */ "./src/ioc/throwable.js");



/**
 * @interface
 * @template T
 */
class Provider {

    /**
     * @param {Array<Instance>} container // instance hashmap
     * @returns {T}
     */
    produce(container){
        throw new _throwable_js__WEBPACK_IMPORTED_MODULE_1__.NotImplementedError()
    }
}

/**
 * @implements {Provider<T>}
 * @template T
 */
class SingletonProvider {

    constructor(){
        /** @type {T|null} */
        this.cache = null
    }

    /** 
     * @param {Array<Instance>} container
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
     * @param {Array<Instance>} container
     * @returns {T}
     */
    makeOnce(container){
        throw new _throwable_js__WEBPACK_IMPORTED_MODULE_1__.NotImplementedError()
    }
}

/**
 * @implements Provider<T>
 * @extends SingletonProvider<T>
 * @template T
 */
class NormalProvider extends SingletonProvider {

    /**
     * 
     * @param {Constructable<T>} clazz 
     */
    constructor(clazz){
        super()
        /**
         * @param {Array<Instance>} container
         */
        this.recipe = (container) => {
            //@ts-ignore
            const binded = clazz.bind.apply(clazz, [null].concat(container))
            return new binded()
        }
    }

    /**
     * @param {Array<Instance>} container
     * @returns {T}
     */
    makeOnce(container){
        return this.recipe(container)
    }
}


/***/ }),

/***/ "./src/ioc/recipe.js":
/*!***************************!*\
  !*** ./src/ioc/recipe.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Recipe": () => /* binding */ Recipe
/* harmony export */ });
/* harmony import */ var _ingredient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ingredient.js */ "./src/ioc/ingredient.js");
/* harmony import */ var _callableHash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./callableHash */ "./src/ioc/callableHash.js");
/* harmony import */ var _provider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./provider.js */ "./src/ioc/provider.js");
/* harmony import */ var _throwable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./throwable.js */ "./src/ioc/throwable.js");





/**
 * @template T
 */
class Recipe {

    /**
     * 
     * @param {string} name 
     * @param {Array<string>} dependencies 
     * @param {Provider<T>} provider 
     */
    constructor(name, dependencies, provider){
        this.name = name
        this.dependencies = dependencies
        this.provider = provider
    }

    /**
     * 
     * @param {CallableHash<Ingredient<Instance>>} ingredients
     * @returns {Ingredient<T>} 
     */
    createIngredient(ingredients){
        if(!this.isConstructableFrom(ingredients)){
            throw new _throwable_js__WEBPACK_IMPORTED_MODULE_3__.IngredientLackError()
        }

        const dependencyIngredients = this.dependencies.map(dependency => ingredients.get(dependency))
        return new _ingredient_js__WEBPACK_IMPORTED_MODULE_0__.Ingredient(this.name, dependencyIngredients, this.provider)
    }

    /**
     * @param {CallableHash<Ingredient<Instance>>} ingredients 
     * @returns {boolean}
     */
    isConstructableFrom(ingredients){
        return this.dependencies.every(dependencyName => ingredients.exist(dependencyName))
    }
}


/***/ }),

/***/ "./src/ioc/resolver.js":
/*!*****************************!*\
  !*** ./src/ioc/resolver.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resolver": () => /* binding */ Resolver,
/* harmony export */   "ResolverFactory": () => /* binding */ ResolverFactory
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory.js */ "./src/ioc/factory.js");
/* harmony import */ var _ingredient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ingredient.js */ "./src/ioc/ingredient.js");
/* harmony import */ var _callableHash_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./callableHash.js */ "./src/ioc/callableHash.js");
/* harmony import */ var _recipe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recipe.js */ "./src/ioc/recipe.js");
/* harmony import */ var _throwable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./throwable.js */ "./src/ioc/throwable.js");






class Resolver{
    
    /**
     * 
     * @param {CallableHash<Ingredient<Instance>>} ingredients
     */
    constructor(ingredients){
        
        this.__ingredients = ingredients
    }

    /**
     * 
     * @param {string} name 
     * @returns {Instance}
     */
    create(name){
        const product = this.__ingredients.get(name)
        /** @type {Array<Instance>} */
        return this.__produce(product)
    }

    /**
     * 
     * @param {Ingredient<T>} ingredient 
     * @returns {T}
     * @template T
     */
    __produce(ingredient){
        const sources = ingredient.dependencies.map(dependency => this.__produce(dependency))
        return ingredient.provider.produce(sources)
    }

}

/**
 * @implements Factory<Resolver>
 */
class ResolverFactory {

    constructor(){}

    /**
     * @param {CallableHash<Recipe<Instance>>} recipes 
     * @returns {Resolver}
     */
    produce(recipes) {

        /** @type {CallableHash<Ingredient<Instance>>} */
        const ingredients = new _callableHash_js__WEBPACK_IMPORTED_MODULE_2__.CallableHash()

        const notResolvedRecipes = recipes.duplicate()

        while(notResolvedRecipes.hasAny()){
            const prevNotResolvedLen = notResolvedRecipes.size()

            notResolvedRecipes.forEach(recipe => {

                if(recipe.isConstructableFrom(ingredients)){
                    ingredients.put(recipe.createIngredient(ingredients))
                    notResolvedRecipes.delete(recipe.name)
                }
            })
            
            if (prevNotResolvedLen === notResolvedRecipes.size()){
                throw new _throwable_js__WEBPACK_IMPORTED_MODULE_4__.UnresolvedError()
            }
        }

        return new Resolver(ingredients)
    }
}


/***/ }),

/***/ "./src/ioc/throwable.js":
/*!******************************!*\
  !*** ./src/ioc/throwable.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotImplementedError": () => /* binding */ NotImplementedError,
/* harmony export */   "UnexpectedError": () => /* binding */ UnexpectedError,
/* harmony export */   "UnresolvedError": () => /* binding */ UnresolvedError,
/* harmony export */   "IngredientNotFoundError": () => /* binding */ IngredientNotFoundError,
/* harmony export */   "DuplicateNameError": () => /* binding */ DuplicateNameError,
/* harmony export */   "IngredientLackError": () => /* binding */ IngredientLackError
/* harmony export */ });
class NotImplementedError extends Error {

    constructor() {
        super("not implemented");
        this.name = "NotImplementedError";
    }
}

class UnexpectedError extends Error {

    constructor() {
        super("internal error occured");
        this.name = "UnexpectedError";
    }
}

class UnresolvedError extends Error {

    constructor() {
        super("there is circular reference or not defined reference");
        this.name = "UnresolvedError";
    }
}

class IngredientNotFoundError extends Error {

    constructor() {
        super("ingredient not found");
        this.name = "IngredientNotFoundError";
    }
}

class DuplicateNameError extends Error {

    constructor() {
        super("same name defined");
        this.name = "DuplicateNameError";
    }
}

class IngredientLackError extends Error {

    constructor() {
        super("ingredient is lacked");
        this.name = "IngredientLackError";
    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()
;
});
//# sourceMappingURL=ioc-pot.js.map