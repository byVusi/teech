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
            throw new TypeError('Invalid string. Must be a non-empty string.');
        }
        return value.trim();
    }

    static isValidDate(value) {
        const date = new Date(value);
        return date instanceof Date && !isNaN(date);
    }

    static validateDate(value) {
        if(!this.isValidDate(value)) {
            throw new TypeError('Invalid date. Must be a valid date.');
        }
        return new Date(value);
    }

    static isValidEmail(value) {
        if(!this.isNonEmptyString(value)) {
            console.error('Invalid email. Must be a non-empty string.');
            return false
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!emailRegex.test(value.trim())) {
            console.error('Invalid email. Must be a valid email address.');
            return false;
        }

        return true;
    }

    static validateEmail(value) {
       if(!this.isValidEmail(value)) {
        throw new TypeError('Invalid email. Must be a valid email address.');
       }
       return value.trim();
    }

    static isValidArray(value) {
        return Array.isArray(value);
    }

    static isNonEmptyArray(value) {
        return this.isValidArray(value) && value.length > 0;
    }

    static validateArray(value) {
        if(!this.isNonEmptyArray(value)) {
            throw new TypeError('Invalid array. Must be a non-empty array.');
        }
        return value;
    }

    static isValidObject(value) {
        return value !== null && !Array.isArray(value) && typeof value === 'object';
    }

    static isNonEmptyObject(value) {
        return this.isValidObject(value) && Object.keys(value).length > 0;
    }

    static validateObject(value, isEmpty = false) {
        if (!this.isValidObject(value)) {
            throw new TypeError("Invalid object. Must be a valid object.");
        }

        if(!isEmpty && !this.isNonEmptyObject(value)) {
            throw new TypeError('Invalid object. Must be a non-empty object.');
        }
        return value;
    }

    static isValidFunction(value) {
        return typeof value === 'function';
    }

    static isValidHTMLElement(value) {

        const allowedTagNames = [
            'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'button', 'input', 
            'label', 'select', 'option', 'optgroup', 'textarea', 'form', 'fieldset', 'legend', 
            'datalist', 'ul', 'li', 'img', 'video', 'audio', 'source', 'track', 'iframe', 
            'nav', 'header', 'footer', 'section', 'article', 'aside', 'main', 'figure', 
            'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'col', 
            'colgroup', 'details', 'summary', 'dialog', 'menu', 'menuitem', 'meter', 'progress', 
            'blockquote', 'cite', 'code', 'pre', 'em', 'strong', 'small', 'sub', 'sup', 'del', 
            'ins', 'mark', 'abbr', 'address', 'b', 'i', 'u', 's', 'time', 'var', 'kbd', 'samp', 
            'q', 'dfn', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'wbr', 'br', 'hr', 'script', 'style', 
            'link', 'meta', 'title', 'base', 'head', 'body', 'html', 'noscript', 'template', 
            'slot', 'picture', 'embed', 'object', 'param', 'output'
          ]; 
        return value instanceof HTMLElement || allowedTagNames.includes(value.toLowerCase().trim());
    }
} 