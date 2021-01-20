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