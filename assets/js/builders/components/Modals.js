import { createNewElement } from "../createNewElement.js";
import {createButton} from './Buttons.js';
import { handleModalCloseClick } from "../../handlers/clickHandlers.js";
import { Validator } from "../../classes/Validator.js";

export function createModal(header = 'Modal header', body = '', footer = '', options = {}) {
    const modal = createNewElement('div', { attributes: { class: 'modal', ...options.attributes } });

    if(Validator.isValidHTMLElement(header)) modal.append(header);
    if(Validator.isValidHTMLElement(body)) modal.append(body);
    if(Validator.isValidHTMLElement(footer)) modal.append(footer);

    const overlay = createModalOverlay();
    document.body.append(overlay);
    return modal;
}

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

export function createModalBody( content = '', options = {} ) {
    if(!Validator.isValidHTMLElement(content)) {
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

function createModalOverlay() {
    const overlay = createNewElement('div', { attributes: { class: 'modal-overlay' } });
    return overlay;
}