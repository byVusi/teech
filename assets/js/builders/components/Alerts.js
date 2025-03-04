import { Validator } from "../../classes/Validator.js";
import { createNewElement } from "../createNewElement.js";

export function createAlert(header='', body='', type = 'info') {
    // Create the alert element
    const alert = createNewElement(
        'div', 
    );

    const allowedTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

    // Check for a valid type
    if(Validator.isNonEmptyString(type) && allowedTypes.includes(type.toLowerCase().trim())) {
        alert.classList.add('alert', `alert-${type.toLowerCase().trim()}`);
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

    const iconElement = createNewElement(
        'i',        
        {
            text: iconText,
            attributes: {
                class: icon.class || 'material-icons'
            }
        }
    );

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