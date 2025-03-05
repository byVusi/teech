if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);

            // Check for updates every 30 seconds
            setInterval(() => {
                registration.update();
            }, 30000);

            // Listen for updates
            registration.onupdatefound = () => {
                const newWorker = registration.installing;
                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateNotification(newWorker);
                    }
                };
            };
        })
        .catch(error => console.log('Service Worker registration failed:', error));
}

import {createNewElement  } from './assets/js/builders/createNewElement.js';
import {createButton} from './assets/js/builders/components/Buttons.js';
import { Validator } from './assets/js/classes/Validator.js';

// Show a notification when a new update is available
function showUpdateNotification(worker) {
    const updateBanner = document.createElement('div');
    updateBanner.append(updateBanner());
    document.body.appendChild(updateBanner);

    document.getElementById('refresh').addEventListener('click', () => {
        worker.postMessage('update-sw'); // Tell service worker to update
        window.location.reload(); // Reload to apply the new version
    });

    function updateBanner(value = 'A new update is available!') {
        const validatedText = Validator.isNonEmptyString(value) || 'A new update is available!';
        
        const banner = createNewElement(
            'div',
            {
                text: validatedText,
                attributes: {
                    style: `
                        position: fixed;
                        bottom: 0.625em;
                        left: 50%;
                        transform: translateX(-50%);
                        padding: 1em;
                        border-radius: 0.5em;
                    `
                }
            }
        );

        const button = createButton('Update', {  attributes: { id: 'refresh' } }  );

        if(window.matchMedia('(prefers-color-scheme: light)').matches) {
            banner.style = `
                background-color: var(--dark);
                color: var(--light);
            `;

            button.classList.add('btn', 'btn-outline-light');
        } else {
            banner.style = `
                background-color: var(--light);
                color: var(--dark);
            `;

            button.classList.add('btn', 'btn-outline-dark');
        }

        banner.append(button);

        return banner;
    }
}

