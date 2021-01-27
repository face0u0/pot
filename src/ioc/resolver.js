import { Factory } from "./factory.js";
import { Ingredient } from "./ingredient.js";
import { CallableHash } from "./callableHash.js";
import { Recipe } from "./recipe.js";
import { UnresolvedError } from "./throwable.js";

export class Resolver{
    
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
        const ingredient = this.__ingredients.get(name)
        /** @type {Array<Instance>} */
        const product = this.__produce(ingredient)
        ingredient.decorator.observe(product)
        return product
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
export class ResolverFactory {

    constructor(){}

    /**
     * @param {CallableHash<Recipe<Instance>>} recipes 
     * @returns {Resolver}
     */
    produce(recipes) {

        /** @type {CallableHash<Ingredient<Instance>>} */
        const ingredients = new CallableHash()

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
                throw new UnresolvedError()
            }
        }

        return new Resolver(ingredients)
    }
}
