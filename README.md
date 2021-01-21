# Pot

pot is extremely simple ioc container for js.

- small filesize (about 1.2kb gzipped!)
- depends no library

## usage

- sample class
```js
function Egg(){
    console.log("egg created!")
    this.size = "L"
}

function Omlet(egg){
    console.log("omlet created!")
    this.egg = egg
}

function Dish(omlet){
    console.log("dish created!")
    this.content = omlet
}
```

- how to use
```js
import { Pot } from "ioc-pot"

// create new ioc-container
const pot = new Pot()

// define constructor to name (should be unique!) and dependency.
pot.service("dish", Dish, ["omlet"])
pot.service("egg", Egg, [])
pot.service("omlet", Omlet, ["egg"])
pot.alias("dinner", "dish")

// resolve dependency...
pot.resolve()

// get some products!
const egg = pot.locate("egg")
const omlet = pot.locate("omlet")
const dish = pot.locate("dish")
const dinner = pot.locate("dinner")
```