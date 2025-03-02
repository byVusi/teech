// Register the Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);

            // Check for updates
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('New version available! Reload to update.');
                        // Notify user that an update is available
                        if (confirm('A new version is available. Reload now?')) {
                            window.location.reload();
                        }
                    }
                };
            };
        })
        .catch(error => console.log('Service Worker registration failed:', error));
}
