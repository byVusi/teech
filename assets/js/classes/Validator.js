export class Validator {
    constructor() {}

    static isString(value) {
        return typeof value === 'string';
    }

    static isNonEmptyString(value) {
        return this.isString(value) && value.trim() !== '';
    }

    static validateString(value) {
        if(!this.isNonEmptyString(value)) {
            throw new Error('Invalid string. Must be a non-empty string.');
        }
        return value;
    }
} 