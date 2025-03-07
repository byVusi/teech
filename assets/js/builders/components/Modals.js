import { createNewElement } from "../createNewElement.js";
import {createButton} from './Buttons.js';
import { handleModalCloseClick } from "../../handlers/clickHandlers.js";
import { Validator } from "../../classes/Validator.js";

/**
 * Creates a modal element.
 * @param {string|HTMLElement} [header='Modal header'] - The modal header, can be a string or an HTML element.
 * @param {string|HTMLElement} [body=''] - The modal body, can be a string or an HTML element.
 * @param {string|HTMLElement} [footer=''] - The modal footer, can be a string or an HTML element.
 * @param {Object} [options={}] - Additional options for modal customization.
 * @returns {HTMLElement} The generated modal element.
 */
export function createModal(header = 'Modal header', body = '', footer = '', options = {}) {
    const modal = createNewElement('div', { attributes: { class: 'modal', ...options.attributes } });

    if(Validator.isValidHTMLElement(header)) modal.append(header);
    if(Validator.isValidHTMLElement(body)) modal.append(body);
    if(Validator.isValidHTMLElement(footer)) modal.append(footer);

    const overlay = createModalOverlay();
    const bodyElement = document.body;
    bodyElement.style.overflow = 'hidden';
    bodyElement.append(overlay);
    return modal;
}

/**
 * Creates a modal header element.
 * @param {string} [title='Modal title'] - The title of the modal header.
 * @param {Object} [options={}] - Additional options for modal header customization.
 * @returns {HTMLElement} The generated modal header element.
 */
export function createModalHeader( title = 'Modal title', options = {} ) {
    if(!Validator.isNonEmptyString(title)) {
        console.error('Invalid title. Title must be non-empty string. Defaulting to "Modal title"...');
        title = 'Modal title';
    }

    if(!Validator.isValidObject(options)) {
        console.error(`Options invalid. '${options}' must be a valid object.`);
        options = {};
    }
 
    const modalHeader = createNewElement('div', {text: title, attributes: { class: 'modal-header', ...options.attributes } });
    const closeButton = createButton('', { attributes: { class: 'btn close-button' }, events: { 'click': handleModalCloseClick } }, { name: 'close', size: 'large'} );
    modalHeader.append(closeButton);
    return modalHeader;
}

/**
 * Creates a modal body element.
 * @param {string} [content=''] - The content of the modal body.
 * @param {Object} [options={}] - Additional options for modal body customization.
 * @returns {HTMLElement} The generated modal body element.
 */
export function createModalBody( content = '', options = {} ) {
    if(content && !Validator.isString(content)) {
        console.error('Invalid content. Content must be a valid HTML element.');
        content = 'Modal body';
    }

    if(!Validator.isValidObject(options)) {
        console.error(`Options invalid. '${options}' must be a valid object.`);
        options = {};
    }

    const modalBody = createNewElement('div', { attributes: { class: 'modal-body', ...options.attributes} });
    modalBody.append(content);
    return modalBody;
}

/**
 * Creates a modal footer element.
 * @param {HTMLElement[]} [content=['Modal footer']] - An array of valid HTML elements for the footer.
 * @param {Object} [options={}] - Additional options for modal footer customization.
 * @returns {HTMLElement} The generated modal footer element.
 */
export function createModalFooter(content = ['Modal footer'], options = {}) {
    if(!Validator.isValidHTMLElement(...content)) {
        console.error('Invalid content. Content must be a valid HTML element.');
        content = 'Modal footer';
    }

    if(!Validator.isValidObject(options)) {
        console.error(`Options invalid. '${options}' must be a valid object.`);
        options = {};
    }

    const modalFooter = createNewElement('div', { attributes: { class: 'modal-footer', ...options.attributes } });
    modalFooter.append(...content);
    return modalFooter;
}

/**
 * Creates a modal overlay element.
 * @returns {HTMLElement} The generated modal overlay element.
 */
function createModalOverlay() {
    const overlay = createNewElement('div', { attributes: { class: 'modal-overlay' } });
    return overlay;
}