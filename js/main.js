document.addEventListener('header-loaded', function () {
    // Add WhatsApp float button to all pages if it doesn't exist
    if (!document.querySelector('.whatsapp-float')) {
        const whatsappHTML = `
            <a href="https://wa.me/your-phone-number" class="whatsapp-float" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;
        document.body.insertAdjacentHTML('beforeend', whatsappHTML);
    }

    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');


    // if (!toggle) {
    //     console.warn('❌ .mobile-menu-toggle not found');
    // }

    // if (!menu) {
    //     console.warn('❌ .nav-menu not found');
    // }

    // if (toggle && menu) {
    //     console.log('✅ Mobile menu elements found');
    // }



    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

    }

    // FAQ Toggle Functionality - Optimized for performance
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        // Use event delegation for better performance
        const faqContainer = document.querySelector('.faq-container');

        if (faqContainer) {
            faqContainer.addEventListener('click', function (e) {
                // Find the closest faq-question parent of the clicked element
                const questionElement = e.target.closest('.faq-question');

                if (!questionElement) return; // Not clicking on a question

                const faqItem = questionElement.parentElement;
                const faqAnswer = faqItem.querySelector('.faq-answer');
                const icon = faqItem.querySelector('.faq-toggle i');

                // Close others first
                faqItems.forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        const itemAnswer = item.querySelector('.faq-answer');
                        const itemIcon = item.querySelector('.faq-toggle i');

                        // Remove active class
                        item.classList.remove('active');

                        // Reset icon
                        if (itemIcon.classList.contains('fa-minus')) {
                            itemIcon.classList.remove('fa-minus');
                            itemIcon.classList.add('fa-plus');
                        }

                        // Collapse the answer with height animation
                        itemAnswer.style.height = '0px';
                    }
                });

                // Toggle current item
                const isActive = faqItem.classList.contains('active');

                if (isActive) {
                    // Collapse
                    faqItem.classList.remove('active');
                    faqAnswer.style.height = '0px';

                    // Change icon
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    // Expand
                    faqItem.classList.add('active');

                    // Calculate the needed height and set it (for smooth animation)
                    const answerContent = faqAnswer.querySelector('.faq-answer-content');
                    faqAnswer.style.height = answerContent.offsetHeight + 'px';

                    // Change icon
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');

                    // Add subtle animation to the icon
                    const faqIcon = faqItem.querySelector('.faq-icon');
                    if (faqIcon && !faqIcon.classList.contains('pulse-animation')) {
                        faqIcon.classList.add('pulse-animation');
                        setTimeout(() => {
                            faqIcon.classList.remove('pulse-animation');
                        }, 400);
                    }
                }
            });

            // Initialize heights to 0 for proper animation
            faqItems.forEach(item => {
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.height = '0px';
                }
            });

            // Auto-open FAQ if hash is present - optimized
            if (window.location.hash === '#delivery-areas') {
                const deliveryFaq = document.getElementById('delivery-areas-faq');
                if (deliveryFaq) {
                    // Wait a tiny bit for everything to render
                    setTimeout(() => {
                        deliveryFaq.classList.add('active');

                        const answer = deliveryFaq.querySelector('.faq-answer');
                        const answerContent = answer.querySelector('.faq-answer-content');
                        answer.style.height = answerContent.offsetHeight + 'px';

                        const icon = deliveryFaq.querySelector('.faq-toggle i');
                        if (icon) {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-minus');
                        }
                    }, 100);
                }
            }
        }

        // Optimized Area Search - using debounce for better performance
        const areaSearch = document.getElementById('area-search');
        if (areaSearch) {
            let searchTimeout;

            areaSearch.addEventListener('input', function () {
                // Clear any existing timeout
                clearTimeout(searchTimeout);

                // Set a new timeout - debounce pattern
                searchTimeout = setTimeout(() => {
                    const searchValue = this.value.toLowerCase().trim();
                    const areaItems = document.querySelectorAll('.area-item');

                    // Hide/show message based on initial state
                    let noResultsMsg = document.querySelector('.no-results-message');
                    if (noResultsMsg) {
                        noResultsMsg.style.display = 'none';
                    }

                    if (searchValue === '') {
                        // Fast path for empty search
                        areaItems.forEach(item => {
                            item.innerHTML = item.textContent; // Remove any highlights
                            item.style.display = '';
                        });
                        return;
                    }

                    // Create a document fragment for more efficient DOM manipulation
                    let hasResults = false;

                    areaItems.forEach(item => {
                        const originalText = item.textContent;
                        const areaText = originalText.toLowerCase();

                        if (areaText.includes(searchValue)) {
                            hasResults = true;
                            item.style.display = '';

                            // Only do the highlighting if necessary
                            const regex = new RegExp(`(${searchValue})`, 'gi');
                            const highlightedText = originalText.replace(
                                regex,
                                '<span class="highlight">$1</span>'
                            );

                            // Only update DOM if text changed
                            if (item.innerHTML !== highlightedText) {
                                item.innerHTML = highlightedText;
                            }
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    // Show message if no results
                    if (!hasResults) {
                        if (!noResultsMsg) {
                            noResultsMsg = document.createElement('div');
                            noResultsMsg.className = 'no-results-message';
                            noResultsMsg.textContent = 'No areas match your search.';
                            areaSearch.parentNode.after(noResultsMsg);
                        } else {
                            noResultsMsg.style.display = '';
                        }
                    }
                }, 200); // 200ms debounce
            });
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