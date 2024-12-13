document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.querySelector('.game-area');
    const ufo = document.getElementById('ufo');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('startGame');
    
    let score = 0;
    let gameInterval;
    let isGameRunning = false;
    
    // UFO 位置和速度
    const ufoState = {
        x: 300,
        y: 200,
        speed: 0.5,
        velocityX: 0,
        velocityY: 0,
        maxSpeed: 8,
        acceleration: 0.5,
        friction: 0.98
    };
    
    // 初始化 UFO 位置
    function initUFO() {
        ufoState.x = gameArea.offsetWidth / 2;
        ufoState.y = gameArea.offsetHeight / 2;
        updateUFOPosition();
    }
    
    // 更新 UFO 位置
    function updateUFOPosition() {
        ufo.style.left = `${ufoState.x}px`;
        ufo.style.top = `${ufoState.y}px`;
    }
    
    // 创建豆子
    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${Math.random() * (gameArea.offsetWidth - 10)}px`;
        dot.style.top = `${Math.random() * (gameArea.offsetHeight - 10)}px`;
        gameArea.appendChild(dot);
    }
    
    // 检查碰撞
    function checkCollision() {
        const dots = document.querySelectorAll('.dot');
        const ufoRect = ufo.getBoundingClientRect();
        
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            if (!(ufoRect.right < dotRect.left || 
                ufoRect.left > dotRect.right || 
                ufoRect.bottom < dotRect.top || 
                ufoRect.top > dotRect.bottom)) {
                dot.remove();
                score += 10;
                scoreElement.textContent = score;
                createDot();
            }
        });
    }
    
    // 游戏循环
    function gameLoop() {
        if (!isGameRunning) return;
        
        // 应用摩擦力
        ufoState.velocityX *= ufoState.friction;
        ufoState.velocityY *= ufoState.friction;
        
        // 更新位置
        ufoState.x += ufoState.velocityX;
        ufoState.y += ufoState.velocityY;
        
        // 边界检查
        if (ufoState.x < 0) {
            ufoState.x = 0;
            ufoState.velocityX = 0;
        }
        if (ufoState.x > gameArea.offsetWidth - 30) {
            ufoState.x = gameArea.offsetWidth - 30;
            ufoState.velocityX = 0;
        }
        if (ufoState.y < 0) {
            ufoState.y = 0;
            ufoState.velocityY = 0;
        }
        if (ufoState.y > gameArea.offsetHeight - 30) {
            ufoState.y = gameArea.offsetHeight - 30;
            ufoState.velocityY = 0;
        }
        
        updateUFOPosition();
        checkCollision();
        requestAnimationFrame(gameLoop);
    }
    
    // 按键状态
    const keys = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false
    };
    
    // 移动 UFO
    function moveUFO(e) {
        if (!isGameRunning) return;
        
        if (e.type === 'keydown' && !e.repeat) {
            if (e.key in keys) {
                keys[e.key] = true;
            }
        } else if (e.type === 'keyup') {
            if (e.key in keys) {
                keys[e.key] = false;
            }
        }
        
        // 根据按键状态更新速度
        if (keys.ArrowLeft) {
            ufoState.velocityX = Math.max(ufoState.velocityX - ufoState.acceleration, -ufoState.maxSpeed);
        }
        if (keys.ArrowRight) {
            ufoState.velocityX = Math.min(ufoState.velocityX + ufoState.acceleration, ufoState.maxSpeed);
        }
        if (keys.ArrowUp) {
            ufoState.velocityY = Math.max(ufoState.velocityY - ufoState.acceleration, -ufoState.maxSpeed);
        }
        if (keys.ArrowDown) {
            ufoState.velocityY = Math.min(ufoState.velocityY + ufoState.acceleration, ufoState.maxSpeed);
        }
    }
    
    // 开始游戏
    function startGame() {
        if (isGameRunning) return;
        
        // 重置游戏状态
        score = 0;
        ufoState.velocityX = 0;
        ufoState.velocityY = 0;
        scoreElement.textContent = score;
        gameArea.innerHTML = '';
        gameArea.appendChild(ufo);
        
        // 初始化 UFO 和豆子
        initUFO();
        for (let i = 0; i < 5; i++) {
            createDot();
        }
        
        isGameRunning = true;
        startButton.textContent = 'Game Running';
        requestAnimationFrame(gameLoop);
    }
    
    // 事件监听
    document.addEventListener('keydown', moveUFO);
    document.addEventListener('keyup', moveUFO);
    startButton.addEventListener('click', startGame);
    
    // 初始化游戏
    initUFO();
}); 