import { Container } from "./domain/container.js";
import { NormalProvider, Provider } from "./domain/provider.js";
import { Recipe } from "./domain/recipe.js";

export class Pot {

    constructor(){

        /** @type {Array<Recipe<any>>} */
        this.__recipes = []
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

    resolve(){
        this.__container = new Container(this.__recipes)
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
}

globalThis.Pot = Pot
