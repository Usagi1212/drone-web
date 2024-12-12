document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已登录
    const loginLink = document.querySelector('.login-link');
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        loginLink.innerHTML = `
            <span class="avatar-emoji">☺️</span>
            <span>${savedUsername}</span>
        `;
    }

    // 帖子数据
    const posts = [
        {
            votes: 42,
            title: "Best settings for night photography with Mavic 3",
            preview: "I've been trying to capture the city lights but having trouble with the exposure settings. Here's what I've tried so far...",
            author: "DroneEnthusiast",
            time: "2 hours ago",
            comments: 24,
            tags: ["Photography", "Mavic 3", "Night Shots"]
        },
        {
            votes: 38,
            title: "New DJI Mini 4 Pro Review - Worth the Upgrade?",
            preview: "After flying the Mini 4 Pro for a week, here are my thoughts on the improvements and whether it's worth upgrading...",
            author: "DronePilot",
            time: "3 hours ago",
            comments: 31,
            tags: ["Review", "DJI Mini 4", "Comparison"]
        },
        {
            votes: 56,
            title: "Tips for Smooth Cinematic Movements",
            preview: "Here's how I achieve those butter-smooth shots in my drone videos. The key is in the controller settings...",
            author: "CineDrone",
            time: "4 hours ago",
            comments: 45,
            tags: ["Cinematography", "Tips", "Flying Skills"]
        },
        {
            votes: 29,
            title: "Drone Racing League 2024 - New Rules Discussion",
            preview: "The DRL just announced new regulations for 2024. Let's discuss how these changes will affect the competition...",
            author: "RacingPro",
            time: "5 hours ago",
            comments: 67,
            tags: ["Racing", "DRL", "Competition"]
        }
    ];

    // 清空现有帖子列表
    const postsList = document.querySelector('.posts-list');
    postsList.innerHTML = '';

    // 创建帖子 HTML
    function createPostHTML(post) {
        return `
            <div class="post-card" style="opacity: 0; transform: translateY(-20px);">
                <div class="post-votes">
                    <button class="vote-btn">▲</button>
                    <span>${post.votes}</span>
                    <button class="vote-btn">▼</button>
                </div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p>${post.preview}</p>
                    <div class="post-meta">
                        <span class="author">Posted by ${post.author}</span>
                        <span class="time">${post.time}</span>
                        <span class="comments">${post.comments} comments</span>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // 添加新帖子的动画
    function addNewPost() {
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        const postElement = document.createElement('div');
        postElement.innerHTML = createPostHTML(randomPost);
        
        // 插入到列表开头
        postsList.insertBefore(postElement.firstElementChild, postsList.firstChild);
        
        // 触发动画
        setTimeout(() => {
            const newPost = postsList.firstElementChild;
            newPost.style.opacity = '1';
            newPost.style.transform = 'translateY(0)';
        }, 50);
        
        // 移除最后一个帖子
        const allPosts = postsList.querySelectorAll('.post-card');
        if (allPosts.length > 5) {
            const lastPost = allPosts[allPosts.length - 1];
            lastPost.style.opacity = '0';
            lastPost.style.transform = 'translateY(20px)';
            setTimeout(() => lastPost.remove(), 300);
        }
    }

    // 初始添加一个帖子
    addNewPost();

    // 每2秒添加一个新帖子
    setInterval(addNewPost, 2000);

    // 投票功���
    const voteBtns = document.querySelectorAll('.vote-btn');
    voteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const voteCount = this.parentElement.querySelector('span');
            const currentVotes = parseInt(voteCount.textContent);
            if (this.textContent === '▲') {
                voteCount.textContent = currentVotes + 1;
            } else {
                voteCount.textContent = currentVotes - 1;
            }
        });
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // 实现搜索逻辑
            console.log('Searching for:', searchTerm);
        }
    });

    // 新建帖子按钮
    const newPostBtn = document.querySelector('.new-post-btn');
    newPostBtn.addEventListener('click', function() {
        // 实现新建帖子逻辑
        console.log('Creating new post');
    });

    // 添加图片画廊数据
    const galleryImages = Array(12).fill('../homepage/img/img1.jpg');

    // 创建画廊 HTML
    function createGalleryHTML() {
        return `
            <div class="gallery-container">
                <div class="gallery-header">
                    <h1>Drone Photography</h1>
                    <p>A collection of amazing aerial shots from our community</p>
                </div>
                <div class="gallery-grid">
                    ${galleryImages.map((img, index) => `
                        <div class="gallery-item item-${index + 1}">
                            <img src="${img}" alt="Drone Photo">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 处理分类点击
    // 找到文本内容为 "Drone Photography" 的链接
    const photographyLink = Array.from(document.querySelectorAll('.category-nav a')).find(
        link => link.textContent === 'Drone Photography'
    );
    
    if (photographyLink) {
        photographyLink.addEventListener('click', function(e) {
            e.preventDefault();
            const postsContainer = document.querySelector('.posts-container');
            postsContainer.innerHTML = createGalleryHTML();
            
            // 移除其他链接的 active 类
            document.querySelectorAll('.category-nav a').forEach(link => {
                link.classList.remove('active');
            });
            // 添加 active 类到当前点击的链��
            this.classList.add('active');
        });
    }
}); 