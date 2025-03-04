import { Validator } from "../../classes/Validator.js";
import { createNewElement } from "../createNewElement.js";

/**
 * Creates a button element with optional icon, outline, and custom options.
 *
 * @param {string} [text='Button'] - The text to display on the button.
 * @param {Object} [options={}] - Additional attributes or options to be applied to the button.
 * @param {Object} [icon={}] - The icon to display within the button. Should be an object containing:
 *   - {string} name - The name of the icon (e.g., 'home', 'search').
 *   - {string} [class] - Optional CSS class to be added to the icon element.
 *   - {string} [size] - Optional size of the icon. Can be 'small', 'medium', or 'large'.
 *   - {string} [position] - Optional position of the icon within the button. Can be 'left' or 'right'.
 * @param {boolean} [isOutline=false] - Whether to apply the 'outline' class to the button.
 * 
 * @returns {HTMLElement} The created button element.
 * 
 * @example
 * const button = createButton('Click Me', {id: 'submitBtn'}, {name: 'check', size: 'large'}, true);
 * document.body.appendChild(button);
 */
export function createButton(text = 'Button', options = {}, icon = {}, isOutline = false) {
    // Check for a valid text value
    if(!Validator.isString(text)) {
        console.warn(`Expected text to be a string, received ${typeof text}. Converting to string...`);
        text = text.toString();
    }

    const button = createNewElement('button', {text: text, ...options});

    // Apply outline if needed
    if(isOutline) {
        button.classList.add('btn-outline');
    } else {
        button.classList.add('btn');
    }

    // Check for a valid icon object
    if(!Validator.isNonEmptyObject(icon) || !Validator.isNonEmptyString(icon.name)) { 
        return button;
    }
    
    const iconElement = createNewElement(
        'i', 
        {
            text: icon.name.toLowerCase().trim(), 
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
            default:
                iconElement.classList.add('medium');
        }
    }
        
    // Check if a valid position is provided and act accordingly
    if (Validator.isNonEmptyString(icon.position) && icon.position.toLowerCase().trim() === 'left') {
        button.prepend(iconElement);
    } else {
        button.append(iconElement); 
    }
    
    return button;
}