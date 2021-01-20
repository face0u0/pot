import { Constructable } from "./src/domain/constructable.js";
import { Container } from "./src/domain/container.js";
import { Ingredient } from "./src/domain/ingredients.js";
import { NormalProvider, Provider } from "./src/domain/provider.js";
import { Recipe } from "./src/domain/recipe.js";
import { CircularReferenceError } from "./src/domain/throwable.js";
import { includes } from "./src/util/arrays.js";

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
}
