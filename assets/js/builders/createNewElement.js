import { Validator } from "../classes/Validator.js";

export function createNewElement(tagName, options = {}) {
    if(!Validator.isNonEmptyString(tagName)) {
        throw new TypeError('Invalid tagName. Must be a non-empty string.');
    }

    const allowedTagNames = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'button', 'input', 'label', 'select', 'option', 'form', 'ul', 'li', 'img', 'video', 'audio', 'source', 'iframe', 'nav', 'header', 'footer', 'section', 'article', 'aside', 'main', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'col', 'colgroup', 'details', 'summary', 'dialog', 'menu', 'menuitem', 'meter', 'progress', 'blockquote', 'cite', 'code', 'pre', 'em', 'strong', 'small', 'sub', 'sup', 'del', 'ins', 'mark', 'abbr', 'address', 'b', 'i', 'u', 's', 'time', 'var', 'kbd', 'samp', 'q', 'dfn', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'wbr', 'br', 'hr', 'script', 'style', 'link', 'meta', 'title', 'base', 'head', 'body', 'html'];
    
    if(!allowedTagNames.includes(tagName.toLowerCase().trim())) throw new TypeError('Invalid tagName. Must be a valid HTML tag name.');

    const element = document.createElement(tagName);

    // If no options are provided, return the element
    if(!Validator.isNonEmptyObject(options)) return element;

    // Set the text content if valid
    if(Validator.isNonEmptyString(options.text)) element.textContent = options.text;

    // Set attributes
    if(Validator.isNonEmptyObject(options.attributes)) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            if(Validator.isNonEmptyString(key)) element.setAttribute(key, value);    
         })
    }

    // Add event listeners
    if(Validator.isNonEmptyObject(options.events)) {
        Object.entries(options.events).forEach(([event, handler]) => {
            if(!Validator.isNonEmptyString(event) && Validator.isValidFunction(handler)) {
                element.addEventListener(event, handler);
            } else {
                console.error(`Event handler for "${event}" is not a function`);
            }
        })
    }

    return element;
}