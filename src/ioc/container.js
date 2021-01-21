import { CallableHash } from "./callableHash.js"
import { NormalProvider } from "./provider.js"
import { Recipe } from "./recipe.js"
import { Resolver, ResolverFactory } from "./resolver.js"

export class Container {

    constructor(){

        /** @type {CallableHash<Recipe<Instance>>} */
        this.__recipes = new CallableHash()

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
        this.__define(new Recipe(name, dependencies, new NormalProvider(clazz)))
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
        this.__resolver = new ResolverFactory().produce(this.__recipes)
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
            return new Recipe(aliasName, recipe.dependencies, recipe.provider)
        })
        return recipes
    }
}
