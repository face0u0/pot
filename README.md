# Pot

pot is extremely simple ioc container for js.

## usage

- sample class
```js
function Egg(){
    this.size = "L"
}

function Omlet(egg){
    this.egg = egg
}
```

- how to use
```js
import { Pot } from "ioc-pot"

// create new ioc-container
const new pot = new Pot()

// define constructor to name (should be unique!) and dependency.
pot.define("egg", Egg, [])
pot.define("omlet", Omlet, ["egg"])

// resolve dependency...
pot.resolve()

// get some products!
const egg = pot.locate("egg")
const omlet = pot.locate("omlet")
```