document.addEventListener('DOMContentLoaded', function () {
    // Add WhatsApp float button to all pages if it doesn't exist
    if (!document.querySelector('.whatsapp-float')) {
        const whatsappHTML = `
            <a href="https://wa.me/your-phone-number" class="whatsapp-float" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;
        document.body.insertAdjacentHTML('beforeend', whatsappHTML);
    }
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const icon = otherItem.querySelector('.faq-toggle i');
                        if (icon.classList.contains('fa-minus')) {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        }
                    }
                });

                // Toggle current item
                item.classList.toggle('active');

                // Toggle icon
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });

        // Auto-open delivery areas FAQ if hash is present
        if (window.location.hash === '#delivery-areas') {
            const deliveryFaq = document.getElementById('delivery-areas-faq');
            if (deliveryFaq && !deliveryFaq.classList.contains('active')) {
                deliveryFaq.classList.add('active');
                const icon = deliveryFaq.querySelector('.faq-toggle i');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (navMenu && navMenu.classList.contains('active') &&
            !event.target.closest('.nav-menu') &&
            !event.target.closest('.mobile-menu-toggle')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    let header = null;
    let lastScrollTop = 0;

    // Initialize header reference and set up scroll event
    function initHeaderScroll() {
        header = document.querySelector('.header');
        if (!header) {
            // If header is not available yet, try again after a short delay
            setTimeout(initHeaderScroll, 100);
            return;
        }
    }

    // Call the initialization function
    initHeaderScroll();

    window.addEventListener('scroll', function () {
        // Get the header element if it's not already set
        if (!header) {
            header = document.querySelector('.header');
            if (!header) return; // Exit if header still doesn't exist
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop;
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartCount = document.querySelector('.cart-count');

    if (addToCartButtons.length > 0 && cartCount) {
        let count = parseInt(cartCount.textContent) || 0;

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                count++;
                cartCount.textContent = count;

                // Animation effect
                cartCount.classList.add('cart-count-animation');
                setTimeout(() => {
                    cartCount.classList.remove('cart-count-animation');
                }, 300);

                // Get product info
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;

                // Show notification
                showNotification(`${productName} added to cart - ${productPrice}`);
            });
        });
    }

    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // In a real application, you would send this to your server
                console.log('Newsletter subscription:', email);

                // Show success message
                showNotification('Thank you for subscribing to our newsletter!');

                // Clear the input
                emailInput.value = '';
            }
        });
    }

    // Delivery Areas Search Functionality
    const areaSearch = document.getElementById('area-search');
    if (areaSearch) {
        areaSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const areaItems = document.querySelectorAll('.area-item');

            areaItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                    // Highlight the matching text
                    if (searchTerm.length > 0) {
                        const regex = new RegExp(`(${searchTerm})`, 'gi');
                        item.innerHTML = item.textContent.replace(regex, '<span class="highlight">$1</span>');
                    } else {
                        item.textContent = item.textContent; // Reset highlighting
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide regions based on whether they have visible items
            const regions = document.querySelectorAll('.delivery-region');
            regions.forEach(region => {
                const visibleItems = region.querySelectorAll('.area-item[style="display: flex;"]');
                if (visibleItems.length === 0) {
                    region.style.display = 'none';
                } else {
                    region.style.display = 'block';
                }
            });
        });
    }

    // Add CSS class for animation when elements come into view
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');

    const animateOnScroll = function () {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Run once on page load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});