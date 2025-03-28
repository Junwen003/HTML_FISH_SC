document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    // Initialize slider
    function initSlider() {
        // Set first slide as active
        if (slides.length > 0) {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }

        // Start auto slide
        startSlideInterval();
    }

    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update current slide index
        currentSlide = index;
    }

    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    // Start auto slide interval
    function startSlideInterval() {
        // Clear any existing interval
        clearInterval(slideInterval);

        // Set new interval
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    // Add event listeners to dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                // Restart interval when manually changing slide
                startSlideInterval();
            });
        });
    }

    // Add event listeners to prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            // Restart interval when manually changing slide
            startSlideInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            // Restart interval when manually changing slide
            startSlideInterval();
        });
    }

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }

    // Initialize slider
    initSlider();
});