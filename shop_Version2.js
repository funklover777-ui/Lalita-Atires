// Sample product data
const products = [
    {
        id: 1,
        name: "Silk Saree - Maroon Gold",
        category: "sarees",
        price: 4999,
        emoji: "👗",
        rating: 4.8,
        reviews: 125,
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Cotton Salwar Kameez",
        category: "salwar-kameez",
        price: 2499,
        emoji: "👔",
        rating: 4.6,
        reviews: 89,
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "New"
    },
    {
        id: 3,
        name: "Lehenga Choli Set",
        category: "lehengas",
        price: 7999,
        emoji: "💃",
        rating: 4.9,
        reviews: 156,
        sizes: ["XS", "S", "M", "L"],
        badge: "Premium"
    },
    {
        id: 4,
        name: "Georgette Saree",
        category: "sarees",
        price: 3499,
        emoji: "👗",
        rating: 4.7,
        reviews: 102,
        sizes: ["S", "M", "L", "XL"],
        badge: ""
    },
    {
        id: 5,
        name: "Embroidered Salwar Suit",
        category: "salwar-kameez",
        price: 3999,
        emoji: "👔",
        rating: 4.8,
        reviews: 134,
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "Best Seller"
    },
    {
        id: 6,
        name: "Designer Lehenga",
        category: "lehengas",
        price: 11999,
        emoji: "💃",
        rating: 5.0,
        reviews: 78,
        sizes: ["XS", "S", "M"],
        badge: "Exclusive"
    },
    {
        id: 7,
        name: "Fusion Kurta",
        category: "fusion",
        price: 1999,
        emoji: "👔",
        rating: 4.5,
        reviews: 67,
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "Sale"
    },
    {
        id: 8,
        name: "Golden Bangles Set",
        category: "accessories",
        price: 899,
        emoji: "💍",
        rating: 4.7,
        reviews: 45,
        sizes: ["One Size"],
        badge: ""
    },
    {
        id: 9,
        name: "Banarasi Silk Saree",
        category: "sarees",
        price: 6999,
        emoji: "👗",
        rating: 4.9,
        reviews: 201,
        sizes: ["S", "M", "L", "XL"],
        badge: "Premium"
    },
    {
        id: 10,
        name: "Festive Salwar Kameez",
        category: "salwar-kameez",
        price: 4499,
        emoji: "👔",
        rating: 4.8,
        reviews: 118,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        badge: "New"
    },
    {
        id: 11,
        name: "Bridal Lehenga",
        category: "lehengas",
        price: 15999,
        emoji: "💃",
        rating: 5.0,
        reviews: 89,
        sizes: ["XS", "S", "M", "L"],
        badge: "Exclusive"
    },
    {
        id: 12,
        name: "Silk Dupatta",
        category: "accessories",
        price: 1499,
        emoji: "🎀",
        rating: 4.6,
        reviews: 72,
        sizes: ["One Size"],
        badge: ""
    }
];

// Display products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
});

function displayProducts(productsToDisplay) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-image">
                    ${product.emoji}
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category.replace('-', ' ')}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        ⭐ ${product.rating} (${product.reviews} reviews)
                    </div>
                    <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <div class="product-sizes">
                        ${product.sizes.map(size => `<span class="size">${size}</span>`).join('')}
                    </div>
                    <button class="add-to-cart-btn" onclick="addProductToCart('${product.name}', ${product.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });

    document.getElementById('product-count').textContent = productsToDisplay.length;
}

function addProductToCart(productName, price) {
    alert(`✅ ${productName} added to cart!\nPrice: ₹${price}`);
    updateCartCount();
}

function updateCartCount() {
    const count = document.getElementById('cart-count');
    count.textContent = parseInt(count.textContent) + 1;
}

function setupEventListeners() {
    // Filter by category
    const categoryCheckboxes = document.querySelectorAll('.filter-group:first-child input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Sort products
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter-group:first-child input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    let filtered = products;
    if (selectedCategories.length > 0) {
        filtered = products.filter(p => selectedCategories.includes(p.category));
    }

    displayProducts(filtered);
}

function sortProducts(sortBy) {
    let sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
        default:
            // featured (original order)
            break;
    }

    displayProducts(sorted);
}