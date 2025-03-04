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

// Show a notification when a new update is available
function showUpdateNotification(worker) {
    const updateBanner = document.createElement('div');
    updateBanner.innerHTML = `
        <div style="position: fixed; bottom: 0.625em; left: 50%; transform: translateX(-50%);
                    background: var(--dark); color: var(--light); padding: 1em; border-radius: 0.5em;">
            A new update is available! <button id="refresh">Update</button>
        </div>
    `;
    document.body.appendChild(updateBanner);

    document.getElementById('refresh').addEventListener('click', () => {
        worker.postMessage('update-sw'); // Tell service worker to update
        window.location.reload(); // Reload to apply the new version
    });
}