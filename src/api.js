import { Container } from "./domain/container.js";
import { NormalProvider } from "./domain/provider.js";
import { Recipe } from "./domain/recipe.js";
import { concat, getOne } from "./util/arrays.js";

export class Ioc {

    constructor(){

        /** @type {Array<Recipe<any>>} */
        this.__recipes = []

        /** @type {Object<string, string>} */
        this.__aliasesHashMap = {}

        /** @type {Container|null} */
        this.__container = null
    }

    /**
     * 
     * @param {string} name 
     * @param {object} clazz 
     * @param {Array<string>} dependencies
     */
    define(name, clazz, dependencies){
        this.__recipes.push(new Recipe(name, clazz, dependencies, new NormalProvider(clazz)))
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
        this.__container = new Container(concat(this.__recipes, aliasRecipes) )
    }

    /**
     * 
     * @param {string} name 
     */
    locate(name){
        if(this.__container === null){
            return null
        }
        return this.__container.create(name)
    }

    /**
     * @returns {Array<Recipe<any>>}
     */
    __resolveAliases(){
        const recipes = Object.keys(this.__aliasesHashMap).map(aliasName => {
            const preDefinedName = this.__aliasesHashMap[aliasName]
            const recipe = this.__findRecipe(preDefinedName)
            return new Recipe(aliasName, recipe.clazz, recipe.dependencies, recipe.provider)
        })
        return recipes
    }

    /**
     * 
     * @param {string} name
     * @returns {Recipe<any>}
     */
    __findRecipe(name){
        const recipes = this.__recipes.filter(recipe => recipe.name === name)
        return getOne(recipes)
    }
}

export class RecipeUnresolvedError extends Error {

    /**
     * 
     * @param {string} recipeName 
     */
    constructor(recipeName) {
        super(`recipe ${recipeName} cannot resolved`);
        this.name = "RecipeUnresolvedError";
    }
}