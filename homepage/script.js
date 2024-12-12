document.addEventListener('DOMContentLoaded', function() {
    // 获取所有feature-item元素
    const featureItems = document.querySelectorAll('.feature-item');

    // 为每个feature-item添加点击事件
    featureItems.forEach(item => {
        const header = item.querySelector('.feature-header');
        header.addEventListener('click', () => {
            // 切换当前item的active类
            item.classList.toggle('active');
        });
    });

    // 添加商品滚动功能
    const productGrid = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const cardWidth = 400 + 24; // 卡片宽度 + gap

    function scrollProducts(direction) {
        const scrollAmount = cardWidth * 3; // 一次滚动3个卡片的距离
        const currentScroll = productGrid.scrollLeft;
        
        if (direction === 'prev') {
            productGrid.scrollTo({
                left: currentScroll - scrollAmount,
                behavior: 'smooth'
            });
        } else {
            productGrid.scrollTo({
                left: currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // 监听滚动事件来控制按钮显示
    productGrid.addEventListener('scroll', () => {
        const isAtStart = productGrid.scrollLeft === 0;
        const isAtEnd = productGrid.scrollLeft + productGrid.clientWidth >= productGrid.scrollWidth - 1;
        
        prevBtn.style.opacity = isAtStart ? '0' : '1';
        nextBtn.style.opacity = isAtEnd ? '0' : '1';
    });

    // 添加按钮点击事件
    prevBtn.addEventListener('click', () => scrollProducts('prev'));
    nextBtn.addEventListener('click', () => scrollProducts('next'));

    // 初始化按钮状态
    prevBtn.style.opacity = '0';

    // GET IN TOUCH 按钮点击事件
    const getInTouchBtn = document.querySelector('.outline-button');
    getInTouchBtn.addEventListener('click', function() {
        // 滚动到联系部分
        document.querySelector('.contact-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // JOIN US 按钮点击事件
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        const loginModal = document.querySelector('.login-modal');
        loginModal.classList.remove('hidden');
    });

    // 为所有商品卡片添加点击事件
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';  // 添加鼠标指针样式
        card.addEventListener('click', function() {
            window.location.href = '../dronestore/index.html';
        });
    });

    // 聊天机器人功能 (暂时隐藏)
    /*
    const chatBubble = document.querySelector('.chat-bubble');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const sendMessageBtn = document.querySelector('.send-message');
    const messageInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');

    // 切换聊天窗口
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // 发送消息
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // 机器人的回复列表
        const responses = [
            "I'm charging now, will be back soon!",
            "Sorry, I'm helping another pilot with their drone settings. Be right back!",
            "Currently updating my flight knowledge database. Give me a moment!",
            "In the middle of a firmware update. Can we chat in a bit?",
            "Running diagnostics on my circuits. Back in a flash!",
            "Calibrating my navigation sensors. Talk soon!",
            "Processing aerial data from recent flights. One moment please!",
            "My propellers need a quick tune-up. Won't be long!",
            "Analyzing weather patterns for optimal flight conditions. Back shortly!",
            "Just landed from a test flight. Let me catch my breath!"
        ];

        // 添加用户消息
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'message user-message';
        userMessageElement.textContent = message;
        chatMessages.appendChild(userMessageElement);

        // 延迟0.5秒后添加机器人回复
        setTimeout(() => {
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'message bot-message';
            // 随机选择一个回复
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            botMessageElement.textContent = randomResponse;
            chatMessages.appendChild(botMessageElement);
            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);

        // 清空输入框并滚动到底部
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 发送按钮点击事件
    sendMessageBtn.addEventListener('click', sendMessage);

    // 回车发送消息
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    */

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
        // 保存用户名到 localStorage
        localStorage.setItem('username', username);
        // 更新导航栏显示的用户名
        loginLink.innerHTML = `
            <span class="avatar-emoji">☺️</span>
            <span>${username}</span>
        `;
        loginModal.classList.add('hidden');
        // 隐藏 hero section
        const heroSection = document.querySelector('.hero-section');
        heroSection.style.display = 'none';
    });

    // 页面加载时检查是否已登录
    window.addEventListener('load', function() {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            loginLink.innerHTML = `
                <span class="avatar-emoji">☺️</span>
                <span>${savedUsername}</span>
            `;
            // 如果已登录，也隐藏 hero section
            const heroSection = document.querySelector('.hero-section');
            heroSection.style.display = 'none';
        }
    });

    // 点击模态框外部关闭
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });
}); 