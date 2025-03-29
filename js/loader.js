// Dynamically load header and footer
document.addEventListener('DOMContentLoaded', function () {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) headerPlaceholder.innerHTML = data;

            // 👇 Trigger a custom event after header is inserted
            document.dispatchEvent(new Event('header-loaded'));
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) footerPlaceholder.innerHTML = data;
        });
});