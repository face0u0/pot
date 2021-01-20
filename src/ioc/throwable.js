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

export class UnresolvedError extends Error {

    constructor() {
        super("there is circular reference or not defined reference");
        this.name = "UnresolvedError";
    }
}

export class IngredientNotFoundError extends Error {

    constructor() {
        super("ingredient not found");
        this.name = "IngredientNotFoundError";
    }
}

export class DuplicateNameError extends Error {

    constructor() {
        super("same name defined");
        this.name = "DuplicateNameError";
    }
}

export class IngredientLackError extends Error {

    constructor() {
        super("ingredient is lacked");
        this.name = "IngredientLackError";
    }
}

