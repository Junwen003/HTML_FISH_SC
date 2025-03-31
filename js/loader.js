// Preload header and footer to optimize loading
document.addEventListener('DOMContentLoaded', function () {
    // Check if header is already cached
    if (localStorage.getItem('cachedHeader')) {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            // Use cached header immediately
            headerPlaceholder.innerHTML = localStorage.getItem('cachedHeader');

            // Toggle classes for smooth transition
            document.body.classList.remove('header-loading');
            document.body.classList.add('loaded');

            // Hide initial header
            const initialHeader = document.getElementById('initial-header');
            if (initialHeader) {
                initialHeader.style.opacity = '0';
                setTimeout(() => {
                    initialHeader.style.display = 'none';
                }, 300);
            }

            // Still fetch the latest version in the background for next time
            fetchAndCacheHeader();
        }
    } else {
        // No cache available, fetch header normally but optimize
        fetchAndCacheHeader();
    }

    // Load footer (less critical)
    setTimeout(() => {
        fetchFooter();
    }, 100);

    function fetchAndCacheHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                const headerPlaceholder = document.getElementById('header-placeholder');
                if (headerPlaceholder) {
                    // Cache the header for future use
                    localStorage.setItem('cachedHeader', data);

                    // Only update DOM if not already loaded from cache
                    if (!document.body.classList.contains('loaded')) {
                        headerPlaceholder.innerHTML = data;

                        // Remove loading class to show the real header
                        document.body.classList.remove('header-loading');
                        document.body.classList.add('loaded');

                        // Fade out initial header for smooth transition
                        const initialHeader = document.getElementById('initial-header');
                        if (initialHeader) {
                            initialHeader.style.opacity = '0';
                            setTimeout(() => {
                                initialHeader.style.display = 'none';
                            }, 300);
                        }
                    }
                }

                // Trigger custom event after header is inserted
                document.dispatchEvent(new Event('header-loaded'));
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // If there's an error, make sure initial header is visible and usable
                const initialHeader = document.getElementById('initial-header');
                if (initialHeader) {
                    initialHeader.style.position = 'sticky';
                    initialHeader.style.top = '0';
                    initialHeader.style.opacity = '1';
                }

                // Try to reload from cache if available
                if (localStorage.getItem('cachedHeader')) {
                    const headerPlaceholder = document.getElementById('header-placeholder');
                    if (headerPlaceholder) {
                        headerPlaceholder.innerHTML = localStorage.getItem('cachedHeader');
                        document.body.classList.remove('header-loading');
                        document.body.classList.add('loaded');
                    }
                }
            });
    }

    function fetchFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = data;
                }
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
});