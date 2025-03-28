document.addEventListener('DOMContentLoaded', function () {
    // Adjustable configuration
    const animationDuration = 25; // Smooth and natural duration
    const rotationInterval = 10000; // Reasonable delay for announcements change
    const spacing = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; // Adequate spacing for natural looping

    // Create the notification banner if it doesn't exist
    if (!document.querySelector('.notification-banner')) {
        createNotificationBanner();
    }

    // Start the text animation
    startTextAnimation(animationDuration, spacing);
});

function createNotificationBanner() {
    const rotationInterval = 10000; // Reasonable delay for announcements change
    // Array of announcement messages
    const announcements = [
        "🎥 Live Stream Today at 14:00 MYT!",
        "🔥 Special Promotion: 20% OFF on Tiger Prawns",
        "🌟 New Arrival: Fresh Red Snapper",
        "📦 Free Delivery for Orders Above RM100",
        "⏰ Order Before 12PM for Same-Day Delivery"
    ];

    // Create notification HTML for announcements
    const notificationHTML = `
        <div class="notification-banner">
            <div class="notification-content">
                <div class="notification-message">
                    <span class="sliding-text"></span>
                </div>
            </div>
        </div>
    `;

    // Insert notification at the top of the body
    document.body.insertAdjacentHTML('afterbegin', notificationHTML);

    // Show notification immediately
    const notification = document.querySelector('.notification-banner');
    if (notification) {
        notification.classList.add('show');
    }

    // Set the initial announcement text
    updateAnnouncementText(announcements);

    // Set up rotation of announcements
    setInterval(() => {
        // Rotate the announcements array (move first item to end)
        announcements.push(announcements.shift());
        updateAnnouncementText(announcements);
    }, rotationInterval);
}

function startTextAnimation(animationDuration, spacing) {
    const slidingText = document.querySelector('.sliding-text');
    if (slidingText) {
        // Clone the text for seamless loop with improved spacing
        slidingText.innerHTML += spacing + slidingText.innerHTML;

        // Start the animation with a smoother duration and linear motion
        slidingText.style.animation = `slide ${animationDuration}s linear infinite`;
    }
}

function updateAnnouncementText(announcements) {
    const slidingText = document.querySelector('.sliding-text');
    if (!slidingText) return;

    // Create announcement text with the first item highlighted
    let announcementText = `<em>${announcements[0]}</em>`;

    // Add the rest of the announcements
    for (let i = 1; i < announcements.length; i++) {
        announcementText += ` | ${announcements[i]}`;
    }

    // Smooth transition effect
    slidingText.style.opacity = '0';
    setTimeout(() => {
        slidingText.innerHTML = announcementText;
        slidingText.style.opacity = '1';
    }, 300); // Short delay for a smooth fading effect
}
