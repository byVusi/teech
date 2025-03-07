import { Validator } from "../../classes/Validator.js";
import { createNewElement } from "../createNewElement.js";

/**
 * Creates an alert element.
 * @param {string|HTMLElement} [header=''] - The alert header, can be a string or an HTML element.
 * @param {string|HTMLElement} [body=''] - The alert body, can be a string or an HTML element.
 * @param {string} [type='info'] - The type of alert (e.g., 'primary', 'secondary', 'success', etc.).
 * @returns {HTMLElement} The generated alert element.
 */
export function createAlert(header='', body='', type = 'info') {
    // Create the alert element
    const alert = createNewElement('div', {attributes: {class: 'alert'}});
    const allowedTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    const validatedType = allowedTypes.includes(type.toLowerCase().trim()) ? type.toLowerCase().trim() : 'info';

    // Check for a valid type
    if(Validator.isNonEmptyString(validatedType)) {
        alert.classList.add(`alert-${validatedType}`);
    }

    // Check for a valid header
    if(Validator.isValidHTMLElement(header)) {
        alert.append(header);
    }

    // Check for a valid body
    if(Validator.isValidHTMLElement(body)) {
        alert.append(body);
    }
    return alert;
}

/**
 * Creates an alert header element.
 * @param {string} [text='Alert Header'] - The header text.
 * @param {Object} [icon={}] - An object containing icon properties (name, class, size, position).
 * @param {string} [icon.name] - The name of the icon.
 * @param {string} [icon.class] - The CSS class for the icon.
 * @param {string} [icon.size] - The size of the icon ('small', 'medium', 'large', etc.).
 * @param {string} [icon.position] - The position of the icon ('left' or 'right').
 * @param {Object} [options={}] - Additional options for the header element.
 * @returns {HTMLElement} The generated alert header element.
 */
export function createAlertHeader(text = 'Alert Header', icon = {}, options = {}) {
    // Check for a valid text value
    if(!Validator.isString(text)) {
        console.warn(`Expected text to be a string, received ${typeof text}. Converting to string...`);
        text = text.toString();
    }

    const header = createNewElement('h4', {text: text, ...options});
    header.classList.add('alert-header');

    // Check for valid icon object
    if(!Validator.isNonEmptyObject(icon) || !Validator.isNonEmptyString(icon.name)) return header;

    const iconText = Validator.validateString(icon.name);
    if(!iconText) return header;
    const iconElement = createNewElement('i', { text: iconText, attributes: { class: icon.class || 'material-icons' }});

    // Check for a valid icon size
    if(Validator.isNonEmptyString(icon.size)) {
        switch(icon.size.toLowerCase().trim()) {
            case 'small':
                iconElement.classList.add('small');
                break;
            case 'large':
                iconElement.classList.add('large');
                break;
            case 'xlarge':
                iconElement.classList.add('xlarge');
                break;
            case 'xxlarge':
                iconElement.classList.add('xxlarge');
                break;
            default:
                iconElement.classList.add('medium');
        }
    } else {
        iconElement.classList.add('medium');
    }

    // Check if a valid position is provided and act accordingly
    if(Validator.isNonEmptyString(icon.position) && icon.position.toLowerCase().trim() === 'left') {
        header.prepend(iconElement);
    } else {
        header.append(iconElement);
    }
    return header;
}

/**
 * Creates an alert body element.
 * @param {string} [text='Some random alert message'] - The body text of the alert.
 * @param {Object} [options={}] - Additional options for the body element.
 * @returns {HTMLElement} The generated alert body element.
 */
export function createAlertBody(text = 'Some random alert message', options = {}) {
    // Check for a valid text value
    if(!Validator.isString(text)) {
        console.warn(`Expected text to be a string, received ${typeof text}. Converting to string...`);
        text = text.toString();
    }

    const body = createNewElement('p', {text: text, ...options});
    body.classList.add('alert-body');
    return body;
}