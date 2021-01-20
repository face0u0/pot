import { Container } from "./domain/container.js";
import { NormalProvider } from "./domain/provider.js";
import { Recipe } from "./domain/recipe.js";
import { UnexpectedError } from "./domain/throwable.js";
import { concat } from "./util/arrays.js";

export class Pot {

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
    add(name, clazz, dependencies){
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
     */
    __findRecipe(name){
        const recipes = this.__recipes.filter(recipe => recipe.name === name)
        switch(recipes.length){
            case 0:
                throw new RecipeUnresolvedError(name)
            case 1:
                return recipes[0]
            default:
                throw new UnexpectedError()
        }
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

globalThis.Pot = Pot
