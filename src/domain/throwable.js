export class NotImplementedError extends Error {

    constructor() {
        super("not implemented");
        this.name = "NotImplementedError";
    }
}

export class UnexpectedError extends Error {

    constructor() {
        super("internal error occured");
        this.name = "UnexpectedError";
    }
}

export class CircularReferenceError extends Error {

    constructor() {
        super("there is circular reference");
        this.name = "CircularReferenceError";
    }
}

export class IngredientNotFoundError extends Error {

    constructor() {
        super("ingredient not found");
        this.name = "UnexpIngredientNotFoundErrorectedError";
    }
}