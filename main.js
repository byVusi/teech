if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
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

// Show a notification when a new update is available
function showUpdateNotification(worker) {
    const updateBanner = document.createElement('div');
    updateBanner.innerHTML = `
        <div style="position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%);
                    background: #333; color: #fff; padding: 10px 20px; border-radius: 5px;">
            A new update is available! <button id="refresh">Update</button>
        </div>
    `;
    document.body.appendChild(updateBanner);

    document.getElementById('refresh').addEventListener('click', () => {
        worker.postMessage('update-sw'); // Tell service worker to update
        window.location.reload(); // Reload to apply the new version
    });
}


import { createAlert, createAlertHeader, createAlertBody } from "./assets/js/builders/components/Alerts.js";

document.body.append(
    createAlert(
        createAlertHeader('alert', { name: 'info', position: 'left'}),
        createAlertBody(),
         
        'primary'
    ),
    createAlert(
        createAlertHeader('text', { name: 'edit', position: 'left'}),
        createAlertBody(),
         
        'secondary'
    ),
    createAlert(
        createAlertHeader('success', { name: 'check_circle', position: 'left'}),
        createAlertBody(),
         
        'success'
    ),
    createAlert(
        createAlertHeader('danger', { name: 'error', position: 'left'}),
        createAlertBody(),
         
        'danger'
    ),
    createAlert(
        createAlertHeader('warning', { name: 'warning', position: 'left'}),
        createAlertBody(),
         
        'warning'
    ),
    createAlert(
        createAlertHeader('info', { name: 'info', position: 'left'}),
        createAlertBody(),
         
        'info'
    ),
    createAlert(
        createAlertHeader('light theme', { name: 'brightness_high', position: 'left'}),
        createAlertBody(),
         
        'light'
    ),
    createAlert(
        createAlertHeader('dark theme', { name: 'brightness_low', position: 'left'}),
        createAlertBody(),
         
        'dark'
    ) 
)