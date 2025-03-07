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
import { setNavItemStyling, navigationClick } from './assets/js/handlers/clickHandlers.js';

// Show a notification when a new update is available
function showUpdateNotification(worker) {
    const updateBanner = createUpdateBanner();

    // updateBanner.append(createUpdateBanner());
    document.body.appendChild(updateBanner);

    document.getElementById('refresh').addEventListener('click', () => {
        worker.postMessage('update-sw'); // Tell service worker to update
        window.location.reload(); // Reload to apply the new version
    });

    function createUpdateBanner() {
        const validatedText =  'A new update is available!';
        
        const banner = createNewElement(
            'div',
            {
                text: validatedText,
                attributes: {
                    style: `
                        width: 100%;
                        max-width: 30em;
                        display: inline-flex;
                        gap: 1em;
                        align-items: center;
                        justify-content: space-between;
                        position: absolute;
                        bottom: 1em;
                        left: 50%;
                        transform: translateX(-50%);
                        padding: 1em;
                        border-radius: 0.5em;
                        z-index: 10000;
                    `
                }
            }
        );

        const button = createButton('Update', {  attributes: { id: 'refresh' } }  );

        if(window.matchMedia('(prefers-color-scheme: light)').matches) {
            banner.style.backgroundColor = `var(--dark)`;
            banner.style.color = `var(--light)`;
            button.classList.add('btn', 'btn-outline-light');
        } else {
            banner.style.backgroundColor = `var(--light)`;
            banner.style.color = `var(--dark)`;
            button.classList.add('btn', 'btn-outline-dark');
        }

        banner.append(button);

        return banner;
    }
}

function setManifest(theme) {
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if(!manifestLink) {
        manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        document.head.append.append(manifestLink);
    }

    manifestLink.href = theme === 'dark' ? '/manifest-dark.json' : '/manifest-light.json';
}

// Set up application
const userPreferedTheme = window.matchMedia('(prefers-color-scheme: light)').matches;
setManifest(userPreferedTheme ? 'light' : 'dark');
setNavItemStyling();
navigationClick();

