import { Validator } from "../classes/Validator.js";

/**
 * Creates a new HTML element with optional attributes, text content, and event listeners.
 *
 * @param {string} tagName - The tag name for the element (e.g., 'div', 'span', 'button', etc.).
 * @param {Object} [options={}] - An optional object with additional options to customize the element. The available options are:
 *   - {string} [options.text] - The text content to be set for the element.
 *   - {Object} [options.attributes] - An object containing key-value pairs for the attributes to be set on the element.
 *   - {Object} [options.events] - An object where the keys are event types (e.g., 'click', 'mouseover') and the values are event handler functions.
 * 
 * @returns {HTMLElement} The created HTML element with the applied options.
 * 
 * @throws {TypeError} If the tagName is not a non-empty string or is not a valid HTML tag name.
 * 
 * @example
 * const button = createNewElement('button', {
 *   text: 'Click me',
 *   attributes: { class: 'btn btn-primary' },
 *   events: { click: () => alert('Button clicked!') }
 * });
 * document.body.appendChild(button);
 */
export function createNewElement(tagName, options = {}) {
    if(!Validator.isNonEmptyString(tagName)) {
        throw new TypeError('Invalid tagName. Must be a non-empty string.');
    }

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