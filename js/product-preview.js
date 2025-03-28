document.addEventListener('DOMContentLoaded', function () {
    // Create modal container if it doesn't exist
    if (!document.getElementById('product-preview-modal')) {
        const modalHTML = `
            <div id="product-preview-modal" class="product-modal">
                <div class="product-modal-content">
                    <span class="product-modal-close">&times;</span>
                    <div class="product-modal-body">
                        <div class="product-modal-gallery">
                            <div class="product-modal-main-image">
                                <img src="" alt="Product Image" id="modal-main-image">
                            </div>
                            <div class="product-modal-thumbnails">
                                <!-- Thumbnails will be added dynamically -->
                            </div>
                        </div>
                        <div class="product-modal-info">
                            <h2 id="modal-product-title"></h2>
                            <div class="product-modal-price" id="modal-product-price"></div>
                            <div class="product-modal-description" id="modal-product-description"></div>
                            <div class="product-modal-details">
                                <h3>Product Details</h3>
                                <ul id="modal-product-details">
                                    <!-- Details will be added dynamically -->
                                </ul>
                            </div>
                            <div class="product-modal-origin">
                                <h3>Origin</h3>
                                <p id="modal-product-origin"></p>
                            </div>
                            <div class="product-modal-actions">
                                <button class="btn btn-primary">Add to Cart</button>
                                <button class="btn btn-outline">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
    }

    // Get modal elements
    const modal = document.getElementById('product-preview-modal');
    const modalClose = document.querySelector('.product-modal-close');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDescription = document.getElementById('modal-product-description');
    const modalDetails = document.getElementById('modal-product-details');
    const modalOrigin = document.getElementById('modal-product-origin');
    const modalThumbnails = document.querySelector('.product-modal-thumbnails');

    // Product data (in a real application, this would come from a database)
    const productData = {
        'Tiger Prawns': {
            title: 'Tiger Prawns',
            price: 'RM 45.00/kg',
            description: 'Premium wild-caught tiger prawns from the South China Sea. Known for their sweet flavor and firm texture, these prawns are perfect for grilling, stir-frying, or adding to your favorite curry.',
            details: [
                'Size: Large (16-20 count per kg)',
                'Type: Wild-caught',
                'Processing: Cleaned and deveined available',
                'Storage: Keep frozen until ready to use'
            ],
            origin: 'Sourced from sustainable fisheries in the South China Sea, Malaysia.',
            images: [
                'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
                'https://img.freepik.com/premium-photo/fresh-tiger-prawn-shrimp-board_1339-146586.jpg?ga=GA1.1.1837182524.1743166287&semt=ais_hybrid',
                'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
            ]
        },
        'Red Snapper': {
            title: 'Red Snapper',
            price: 'RM 38.00/kg',
            description: 'Fresh whole red snapper, perfect for grilling or steaming. This premium fish has a sweet, nutty flavor with firm texture and is considered one of the most delicious fish in Malaysian waters.',
            details: [
                'Size: 800g - 1.2kg per fish',
                'Type: Wild-caught',
                'Processing: Cleaned and scaled',
                'Best cooking methods: Steaming, grilling, or baking whole'
            ],
            origin: 'Caught fresh from the Straits of Malacca, Malaysia.',
            images: [
                'https://media.istockphoto.com/id/480634681/photo/florida-fishing-red-snapper-fish.jpg?s=1024x1024&w=is&k=20&c=e6liUdx3qNxa6q5ahSTckjZB5QwmSvTenexyjsHKzcg=',
                'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1580554530778-ca36943938b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
            ]
        },
        'Blue Crab': {
            title: 'Blue Crab',
            price: 'RM 32.00/kg',
            description: 'Sweet and tender blue crabs from Malaysian mangroves. These crabs are known for their sweet meat and are perfect for Singapore-style chili crab, black pepper crab, or simply steamed.',
            details: [
                'Size: Medium (200-300g per crab)',
                'Type: Wild-caught',
                'Processing: Live or pre-cooked available',
                'Best enjoyed: Fresh steamed or in local crab recipes'
            ],
            origin: 'Harvested from sustainable mangrove habitats along the west coast of Peninsular Malaysia.',
            images: [
                'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
                'https://images.pexels.com/photos/15665165/pexels-photo-15665165/free-photo-of-crabs-with-claws.jpeg?auto=compress&cs=tinysrgb&w=600',
                'https://images.pexels.com/photos/2630954/pexels-photo-2630954.jpeg?auto=compress&cs=tinysrgb&w=600',
            ]
        },
        'Salmon Fillet': {
            title: 'Salmon Fillet',
            price: 'RM 58.00/kg',
            description: 'Premium Atlantic salmon fillets, rich in omega-3. Our salmon is sustainably farmed in cold, clean waters to ensure the highest quality and flavor. Perfect for grilling, baking, or enjoying as sashimi.',
            details: [
                'Size: 200-250g per fillet',
                'Type: Sustainably farmed',
                'Processing: Deboned and skin-on',
                'Best for: Grilling, baking, or raw preparations'
            ],
            origin: 'Imported from sustainable aquaculture farms in Norway and Scotland.',
            images: [
                'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
                'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
            ]
        }
    };

    // Function to open modal with product data
    function openProductModal(productName) {
        const product = productData[productName];
        if (!product) return;

        // Set modal content
        modalTitle.textContent = product.title;
        modalPrice.textContent = product.price;
        modalDescription.textContent = product.description;
        modalOrigin.textContent = product.origin;

        // Set main image
        modalMainImage.src = product.images[0];
        modalMainImage.alt = product.title;

        // Clear and add details
        modalDetails.innerHTML = '';
        product.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            modalDetails.appendChild(li);
        });

        // Clear and add thumbnails
        modalThumbnails.innerHTML = '';
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'product-modal-thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.innerHTML = `<img src="${image}" alt="${product.title} thumbnail ${index + 1}">`;
            thumbnail.addEventListener('click', () => {
                // Update main image when thumbnail is clicked
                modalMainImage.src = image;
                // Update active thumbnail
                document.querySelectorAll('.product-modal-thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                thumbnail.classList.add('active');
            });
            modalThumbnails.appendChild(thumbnail);
        });

        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Add click event to all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productTitle = card.querySelector('.product-title').textContent;
        card.addEventListener('click', (event) => {
            // Don't trigger modal if clicking the add to cart button
            if (!event.target.closest('.btn-add-cart')) {
                openProductModal(productTitle);
            }
        });
        // Add cursor pointer to indicate clickable
        card.style.cursor = 'pointer';
    });
});