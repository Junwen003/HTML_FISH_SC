document.addEventListener('DOMContentLoaded', function () {
    // Create Intersection Observer to trigger animations when elements come into view
    const animateElements = document.querySelectorAll('.mission-value, .team-member, .region-card');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element comes into view
            if (entry.isIntersecting) {
                // Add small delay to ensure it's triggered by scroll
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                // Unobserve after animation is triggered
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25,  // Trigger when 25% of the element is visible
        rootMargin: '0px 0px -100px 0px'  // Only trigger when element is well into the viewport
    },
        // initializeTestimonialSlider(),

    );
    function initializeTestimonialSlider() {
        let currentSlide = 0;
        let testimonialInterval;
        let isAnimating = false;
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        const prevArrow = document.querySelector('.prev-testimonial');
        const nextArrow = document.querySelector('.next-testimonial');

        if (testimonialCards.length > 0) {
            testimonialCards.forEach((card, index) => {
                if (index !== 0) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(50px) scale(0.95)';
                    card.style.display = 'none';
                } else {
                    card.classList.add('active');
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0) scale(1)';
                }
            });

            function changeSlide(newIndex = null, direction = 'next') {
                if (isAnimating) return;
                isAnimating = true;

                let nextIndex = (currentSlide + 1) % testimonialCards.length;
                if (newIndex !== null) {
                    clearInterval(testimonialInterval);
                    if (newIndex === currentSlide) {
                        isAnimating = false;
                        return;
                    }
                    nextIndex = newIndex;
                    direction = newIndex > currentSlide ? 'next' : 'prev';
                }

                testimonialDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === nextIndex);
                });

                const outTransform = direction === 'next' ? 'translateX(-100px) scale(0.95)' : 'translateX(100px) scale(0.95)';
                const inTransform = direction === 'next' ? 'translateX(100px) scale(0.95)' : 'translateX(-100px) scale(0.95)';

                testimonialCards[currentSlide].style.opacity = '0';
                testimonialCards[currentSlide].style.transform = outTransform;

                setTimeout(() => {
                    testimonialCards[currentSlide].style.display = 'none';
                    testimonialCards[currentSlide].classList.remove('active');

                    currentSlide = nextIndex;

                    testimonialCards[currentSlide].style.transform = inTransform;
                    testimonialCards[currentSlide].style.display = 'block';

                    setTimeout(() => {
                        testimonialCards[currentSlide].style.opacity = '1';
                        testimonialCards[currentSlide].style.transform = 'translateX(0) scale(1)';
                        testimonialCards[currentSlide].classList.add('active');
                        isAnimating = false;
                    }, 50);
                }, 500);
            }

            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => changeSlide(index));
            });

            if (prevArrow) {
                prevArrow.addEventListener('click', () => {
                    const prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                    changeSlide(prevIndex, 'prev');
                });
            }

            if (nextArrow) {
                nextArrow.addEventListener('click', () => {
                    const nextIndex = (currentSlide + 1) % testimonialCards.length;
                    changeSlide(nextIndex, 'next');
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    const prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                    changeSlide(prevIndex, 'prev');
                } else if (e.key === 'ArrowRight') {
                    const nextIndex = (currentSlide + 1) % testimonialCards.length;
                    changeSlide(nextIndex, 'next');
                }
            });

            const testimonialSlider = document.querySelector('.testimonial-slider');
            if (testimonialSlider) {
                let touchStartX = 0;
                let touchEndX = 0;

                testimonialSlider.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                });

                testimonialSlider.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    const swipeThreshold = 50;
                    if (touchEndX < touchStartX - swipeThreshold) {
                        const nextIndex = (currentSlide + 1) % testimonialCards.length;
                        changeSlide(nextIndex, 'next');
                    } else if (touchEndX > touchStartX + swipeThreshold) {
                        const prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                        changeSlide(prevIndex, 'prev');
                    }
                });
            }

            testimonialInterval = setInterval(() => changeSlide(), 7000);
        }
    }

    // Observe all elements that should animate on scroll
    animateElements.forEach(element => {
        // Reset any animations that might have been triggered on page load
        element.classList.remove('animate');
        animationObserver.observe(element);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        // Reset any animations that might have been triggered on page load
        item.classList.remove('animate');
        timelineObserver.observe(item);
    });

    // Sustainability list items animation
    const sustainabilitySection = document.querySelector('.sustainability');
    const sustainabilityList = document.querySelector('.sustainability-list');
    const sustainabilityItems = document.querySelectorAll('.sustainability-list li');

    if (sustainabilitySection && sustainabilityList && sustainabilityItems.length > 0) {
        // Check if items already have visible class (added in HTML)
        const hasVisibleClass = sustainabilityList.classList.contains('visible');

        // Only apply animations if items don't already have visible class
        if (!hasVisibleClass) {
            // Reset items for scroll-based animation
            sustainabilityItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });

            const sustainabilityObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animation class with short delay to ensure it's triggered by scroll
                        setTimeout(() => {
                            // Add animation class to the container rather than individual items
                            sustainabilityList.classList.add('animate-items');

                            // Also animate each item individually with staggered delay
                            sustainabilityItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('animate');
                                    item.style.opacity = '1';
                                    item.style.transform = 'translateX(0)';
                                }, index * 200); // Staggered delay
                            });
                        }, 100);

                        sustainabilityObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -150px 0px'
            });

            sustainabilityObserver.observe(sustainabilitySection);
        } else {
            // If already visible, ensure they stay visible
            sustainabilityItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        }
    }

    //*** if open will effect header and whastapp bhhutton */
    // Quality Process animation enhancements
    // const qualityProcessObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             // Add staggered animations to each step when the section comes into view
    //             const processSteps = document.querySelectorAll('.process-step');
    //             const isMobile = window.innerWidth <= 768;

    //             // Reset animations first
    //             processSteps.forEach(step => {
    //                 step.classList.remove('visible');
    //                 step.style.opacity = "0";
    //                 step.style.transform = "translateX(-20px)";
    //             });

    //             // Add mobile-specific class if on small screen
    //             if (isMobile) {
    //                 entry.target.classList.add('mobile-view');
    //             }

    //             // Add small delay before starting animations to ensure it's triggered by scroll
    //             setTimeout(() => {
    //                 processSteps.forEach((step, index) => {
    //                     // Longer delay for mobile to make animation more noticeable
    //                     const delay = isMobile ? (index * 300) : (index * 200);

    //                     setTimeout(() => {
    //                         step.classList.add('visible');

    //                         // Special animation for mobile - slide and fade for better visibility
    //                         if (isMobile) {
    //                             step.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    //                             step.style.opacity = "1";
    //                             step.style.transform = "translateX(0)";
    //                         } else {
    //                             step.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    //                             step.style.opacity = "1";
    //                             step.style.transform = "translateX(0)";
    //                         }
    //                     }, delay);
    //                 });
    //             }, 150);

    //             qualityProcessObserver.unobserve(entry.target);
    //         }
    //     });
    // }, {
    //     threshold: 0.25,
    //     rootMargin: '0px 0px -150px 0px'
    // });

    // const qualitySection = document.querySelector('.about-quality');
    // if (qualitySection) {
    //     qualityProcessObserver.observe(qualitySection);
    // }

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const heroSection = document.querySelector('.page-hero');
        if (heroSection) {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // Add hover animations for cards
    const cards = document.querySelectorAll('.region-card, .mission-value, .team-member');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('hover');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
        });
    });

    // Enhanced Testimonial slider animation
    let currentSlide = 0;
    let testimonialInterval;
    let isAnimating = false;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevArrow = document.querySelector('.prev-testimonial');
    const nextArrow = document.querySelector('.next-testimonial');

    if (testimonialCards.length > 0) {
        // Initially hide all but the first slide
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px) scale(0.95)';
                card.style.display = 'none';
            } else {
                card.classList.add('active');
                card.style.opacity = '1';
                card.style.transform = 'translateX(0) scale(1)';
            }
        });

        // Function to change slides
        function changeSlide(newIndex = null, direction = 'next') {
            if (isAnimating) return;
            isAnimating = true;

            // If manual navigation, clear interval and set new index
            if (newIndex !== null) {
                clearInterval(testimonialInterval);
                if (newIndex === currentSlide) {
                    isAnimating = false;
                    return; // Don't change if clicking the current slide
                }
                nextIndex = newIndex;
                // Set direction based on index
                direction = newIndex > currentSlide ? 'next' : 'prev';
            } else {
                nextIndex = (currentSlide + 1) % testimonialCards.length;
            }

            // Update dots
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === nextIndex);
            });

            // Set animation direction
            const outTransform = direction === 'next' ? 'translateX(-100px) scale(0.95)' : 'translateX(100px) scale(0.95)';
            const inTransform = direction === 'next' ? 'translateX(100px) scale(0.95)' : 'translateX(-100px) scale(0.95)';

            // Fade out current slide
            testimonialCards[currentSlide].style.opacity = '0';
            testimonialCards[currentSlide].style.transform = outTransform;

            setTimeout(() => {
                testimonialCards[currentSlide].style.display = 'none';
                testimonialCards[currentSlide].classList.remove('active');

                // Update current slide index
                currentSlide = nextIndex;

                // Set starting position for new slide
                testimonialCards[currentSlide].style.transform = inTransform;
                testimonialCards[currentSlide].style.display = 'block';

                // Small delay to ensure display change has taken effect
                setTimeout(() => {
                    // Animate in new slide
                    testimonialCards[currentSlide].style.opacity = '1';
                    testimonialCards[currentSlide].style.transform = 'translateX(0) scale(1)';
                    testimonialCards[currentSlide].classList.add('active');

                    // Restart interval if it was manually changed
                    if (newIndex !== null) {
                        clearInterval(testimonialInterval);
                        testimonialInterval = setInterval(() => changeSlide(), 7000);
                    }

                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                }, 50);
            }, 500);
        }

        // Add click events for dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                changeSlide(index);
            });
        });

        // Add click events for arrows
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                const prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                changeSlide(prevIndex, 'prev');
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                const nextIndex = (currentSlide + 1) % testimonialCards.length;
                changeSlide(nextIndex, 'next');
            });
        }

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                const prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                changeSlide(prevIndex, 'prev');
            } else if (e.key === 'ArrowRight') {
                const nextIndex = (currentSlide + 1) % testimonialCards.length;
                changeSlide(nextIndex, 'next');
            }
        });

        // Add swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const testimonialSlider = document.querySelector('.testimonial-slider');

        testimonialSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        testimonialSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - go to next
                const nextIndex = (currentSlide + 1) % testimonialCards.length;
                changeSlide(nextIndex, 'next');
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - go to previous
                const prevIndex = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                changeSlide(prevIndex, 'prev');
            }
        }

        // Start automatic slide change every 7 seconds (longer to give people time to read)
        testimonialInterval = setInterval(() => changeSlide(), 7000);
    }

    // Add bubble animations to hero section
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        // Random horizontal starting position
        const randomX = Math.floor(Math.random() * 100);
        bubble.style.left = `${randomX}%`;

        // Random delay for each bubble
        const randomDelay = Math.floor(Math.random() * 5);
        bubble.style.animationDelay = `${randomDelay}s`;

        // Random size for each bubble
        const randomSize = Math.floor(Math.random() * 60) + 30;
        bubble.style.width = `${randomSize}px`;
        bubble.style.height = `${randomSize}px`;

        // Random duration
        const randomDuration = Math.floor(Math.random() * 10) + 15;
        bubble.style.animationDuration = `${randomDuration}s`;
    });
}); 