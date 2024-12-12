document.addEventListener('DOMContentLoaded', function() {
    // 商品数据
    const products = [
        {
            id: 1,
            name: "Avata 2",
            price: 999.99,
            description: "Avata 2 is a compact FPV drone offering immersive flight, stabilized 4K footage, and precision control for aerial enthusiasts.",
            image: "https://se-cdn.djiits.com/stormsend/uploads/971afecc95d62abfdbed881c255ab612.png?h=576&thumb=FAiCBQA0eXdrhmgHeQt1tlB4VXiHh6CJtw%3D%3D&w=576"
        },
        {
            id: 2,
            name: "Mini 4 Pro",
            price: 759.99,
            description: "The Mini 4 Pro combines powerful features with a compact, sub-249g design, offering 4K/60fps HDR video and omnidirectional obstacle sensing.",
            image: "https://se-cdn.djiits.com/stormsend/uploads/f88bc371e0b5cb27728cbcc3f4749462.png"
        },
        {
            id: 3,
            name: "Mavic 3 Pro",
            price: 1599.99,
            description: "The Mavic 3 Pro features a triple-camera system with Hasselblad quality, offering unprecedented versatility for aerial photography and videography.",
            image: "https://se-cdn.djiits.com/stormsend/uploads/97fc7133959d5a5de567aa28545521e0.png"
        },
        {
            id: 4,
            name: "SDR Transmission",
            price: 499.99,
            description: "The DJI SDR Transmission system delivers ultra-low latency video transmission and precise control for professional drone operations.",
            image: "https://se-cdn.djiits.com/stormsend/uploads/eae865c6917daa0d8ed14e471ed9781c.png?h=576&thumb=1feBBQAic3%2BHaLaZxijPD3OLaCh3eHCZqA%3D%3D&w=576"
        },
        {
            id: 5,
            name: "Portable Power Station",
            price: 299.99,
            description: "A versatile portable power solution providing reliable outdoor power supply for your drones and other devices.",
            image: "https://se-cdn.djiits.com/stormsend/uploads/ac2acd7abc17388d4bff15091c995c0f.png?h=576&thumb=FAiCBQBG2UiZeWySBC%2Bb9JQ5V2iIeHB5hw%3D%3D&w=576"
        },
        {
            id: 6,
            name: "Drone Care Plan",
            price: 199.99,
            description: "One-year accidental damage insurance coverage for your drone investment.",
            image: "https://se-cdn.djiits.com/stormsend/uploads/ab49c9473e702d17dacf9ed9e8fd143b.png?h=576&thumb=6PeFBQAkuwWNaJkEiWBRAiYlZGend6C5lQ%3D%3D&w=576"
        }
    ];

    // 渲染商品列表
    function renderProducts(products) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="buy-button">ADD TO CART</button>
                </div>
            </div>
        `).join('');

        // 添加购买按钮点击事件
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Product added to cart!');
            });
        });
    }

    // 初始化显示商品
    renderProducts(products);

    // 排序功能
    const sortSelect = document.querySelector('.filters select');
    sortSelect.addEventListener('change', function(e) {
        let sortedProducts = [...products];
        switch(e.target.value) {
            case 'Price: Low to High':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Newest First':
                sortedProducts.reverse();
                break;
            default:
                sortedProducts = [...products];
        }
        renderProducts(sortedProducts);
    });

    // 登录功能
    const loginLink = document.querySelector('.login-link');
    const loginModal = document.querySelector('.login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.querySelector('#loginForm');

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', function() {
        loginModal.classList.add('hidden');
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.querySelector('#username').value;
        // 更新导航栏显示的用户名
        loginLink.innerHTML = `
            <span class="avatar-emoji">☺️</span>
            <span>${username}</span>
        `;
        loginModal.classList.add('hidden');
    });

    // 点击模态框外部关闭
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });

    // 分类导航功能
    const categoryLinks = document.querySelectorAll('.category-nav a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 移除其他链接的active类
            categoryLinks.forEach(l => l.classList.remove('active'));
            // 添加active类到当前点击的链接
            this.classList.add('active');
        });
    });

    // 检查是否已登录
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        loginLink.innerHTML = `
            <span class="avatar-emoji">☺️</span>
            <span>${savedUsername}</span>
        `;
    }
}); 