class DrawAndGuessGame {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.currentColor = '#000000';
        this.currentSize = 3;
        this.totalGuesses = 0;
        this.history = [];
        
        // 预定义的物体识别库
        this.recognitionPatterns = {
            house: ['房子', '房屋', '建筑', '家'],
            tree: ['树', '树木', '植物', '大树'],
            car: ['车', '汽车', '轿车', '交通工具'],
            sun: ['太阳', '日', '阳光', '太阳公公'],
            flower: ['花', '花朵', '鲜花', '花卉'],
            cat: ['猫', '小猫', '猫咪', '喵'],
            dog: ['狗', '小狗', '狗狗', '犬'],
            bird: ['鸟', '小鸟', '鸟儿', '飞鸟'],
            fish: ['鱼', '小鱼', '鱼儿', '金鱼'],
            star: ['星星', '星', '五角星', '星形'],
            heart: ['心', '心形', '爱心', '心脏'],
            circle: ['圆', '圆形', '圈', '球'],
            square: ['方', '正方形', '方块', '四边形'],
            triangle: ['三角形', '三角', '锥形'],
            person: ['人', '人物', '小人', '人形'],
            smile: ['笑脸', '表情', '微笑', '开心'],
            apple: ['苹果', '水果', '红苹果'],
            book: ['书', '书本', '图书', '书籍'],
            cup: ['杯子', '水杯', '茶杯', '杯'],
            phone: ['手机', '电话', '移动电话']
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.updateBrushDisplay();
    }
    
    setupCanvas() {
        // 设置画布背景
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 设置画笔属性
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }
    
    setupEventListeners() {
        // 画布事件
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        
        // 触摸事件支持
        this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
        
        // 按钮事件
        document.getElementById('clearBtn').addEventListener('click', this.clearCanvas.bind(this));
        document.getElementById('guessBtn').addEventListener('click', this.guessDrawing.bind(this));
        
        // 工具事件
        document.getElementById('brushSize').addEventListener('input', this.updateBrushSize.bind(this));
        
        // 颜色选择
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', this.selectColor.bind(this));
        });
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.ctx.lineWidth = this.currentSize;
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
    
    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }
    
    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                        e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.canvas.dispatchEvent(mouseEvent);
    }
    
    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 清空猜测结果
        const guessResult = document.getElementById('guessResult');
        guessResult.innerHTML = `
            <div class="waiting-state">
                <div class="robot-icon">🤖</div>
                <p>画布已清空，请开始新的创作！</p>
            </div>
        `;
    }
    
    updateBrushSize(e) {
        this.currentSize = e.target.value;
        document.getElementById('brushSizeValue').textContent = this.currentSize;
        this.updateBrushDisplay();
    }
    
    selectColor(e) {
        // 移除之前的活跃状态
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // 设置新的活跃状态
        e.target.classList.add('active');
        this.currentColor = e.target.dataset.color;
        this.updateBrushDisplay();
    }
    
    updateBrushDisplay() {
        const colorNames = {
            '#000000': '黑色',
            '#FF0000': '红色',
            '#00FF00': '绿色',
            '#0000FF': '蓝色',
            '#FFFF00': '黄色',
            '#FF00FF': '紫色',
            '#00FFFF': '青色',
            '#FFA500': '橙色'
        };
        
        const colorName = colorNames[this.currentColor] || '自定义';
        document.getElementById('currentBrush').textContent = `${colorName} ${this.currentSize}px`;
    }
    
    async guessDrawing() {
        const guessBtn = document.getElementById('guessBtn');
        const loadingModal = document.getElementById('loadingModal');
        
        // 显示加载状态
        guessBtn.disabled = true;
        loadingModal.style.display = 'block';
        
        try {
            // 分析画布内容
            const imageData = this.analyzeCanvas();
            const guesses = this.performRecognition(imageData);
            
            // 模拟AI处理时间
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.displayGuesses(guesses);
            this.updateHistory(guesses);
            this.totalGuesses++;
            document.getElementById('totalGuesses').textContent = this.totalGuesses;
            
        } catch (error) {
            console.error('猜测过程中出现错误:', error);
            this.displayError();
        } finally {
            // 隐藏加载状态
            guessBtn.disabled = false;
            loadingModal.style.display = 'none';
        }
    }
    
    analyzeCanvas() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        // 计算画布的基本特征
        let nonWhitePixels = 0;
        let totalPixels = data.length / 4;
        let hasCircularShapes = false;
        let hasAngularShapes = false;
        let colorVariety = new Set();
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // 检查非白色像素
            if (r < 250 || g < 250 || b < 250) {
                nonWhitePixels++;
                colorVariety.add(`${r},${g},${b}`);
            }
        }
        
        const coverage = nonWhitePixels / totalPixels;
        
        // 简单的形状识别
        hasCircularShapes = this.detectCircularShapes();
        hasAngularShapes = this.detectAngularShapes();
        
        return {
            coverage,
            colorVariety: colorVariety.size,
            hasCircularShapes,
            hasAngularShapes,
            complexity: coverage * colorVariety.size
        };
    }
    
    detectCircularShapes() {
        // 简单的圆形检测逻辑
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        // 这里可以实现更复杂的形状检测算法
        // 目前返回随机结果作为示例
        return Math.random() > 0.6;
    }
    
    detectAngularShapes() {
        // 简单的角形检测逻辑
        return Math.random() > 0.5;
    }
    
    performRecognition(imageData) {
        const { coverage, colorVariety, hasCircularShapes, hasAngularShapes, complexity } = imageData;
        
        let possibleObjects = [];
        
        // 基于特征进行简单的识别
        if (coverage < 0.1) {
            // 画得很少
            possibleObjects = [
                { label: '线条', confidence: 0.8 },
                { label: '简单图形', confidence: 0.6 },
                { label: '草图', confidence: 0.5 }
            ];
        } else if (hasCircularShapes && !hasAngularShapes) {
            // 主要是圆形
            possibleObjects = [
                { label: '太阳', confidence: 0.85 },
                { label: '球', confidence: 0.75 },
                { label: '脸', confidence: 0.7 },
                { label: '花', confidence: 0.65 },
                { label: '苹果', confidence: 0.6 }
            ];
        } else if (hasAngularShapes && !hasCircularShapes) {
            // 主要是角形
            possibleObjects = [
                { label: '房子', confidence: 0.8 },
                { label: '树', confidence: 0.75 },
                { label: '车', confidence: 0.7 },
                { label: '书', confidence: 0.65 },
                { label: '手机', confidence: 0.6 }
            ];
        } else if (hasCircularShapes && hasAngularShapes) {
            // 混合形状
            possibleObjects = [
                { label: '人', confidence: 0.8 },
                { label: '动物', confidence: 0.75 },
                { label: '车', confidence: 0.7 },
                { label: '房子', confidence: 0.65 },
                { label: '花', confidence: 0.6 }
            ];
        } else {
            // 复杂图形
            const allObjects = Object.keys(this.recognitionPatterns);
            possibleObjects = allObjects.slice(0, 5).map((obj, index) => ({
                label: this.recognitionPatterns[obj][0],
                confidence: 0.9 - (index * 0.1)
            }));
        }
        
        // 添加一些随机性
        possibleObjects.forEach(obj => {
            obj.confidence += (Math.random() - 0.5) * 0.2;
            obj.confidence = Math.max(0.1, Math.min(0.95, obj.confidence));
        });
        
        // 按置信度排序
        possibleObjects.sort((a, b) => b.confidence - a.confidence);
        
        return possibleObjects.slice(0, 3); // 返回前3个猜测
    }
    
    displayGuesses(guesses) {
        const guessResult = document.getElementById('guessResult');
        
        if (guesses.length === 0) {
            guessResult.innerHTML = `
                <div class="waiting-state">
                    <div class="robot-icon">😕</div>
                    <p>抱歉，我看不出你画的是什么。试试画得更清楚一些？</p>
                </div>
            `;
            return;
        }
        
        const guessList = guesses.map((guess, index) => {
            const emoji = index === 0 ? '🎯' : index === 1 ? '🤔' : '💭';
            const confidencePercent = Math.round(guess.confidence * 100);
            
            return `
                <div class="guess-item">
                    <div class="label">${emoji} ${guess.label}</div>
                    <div class="confidence">置信度: ${confidencePercent}%</div>
                </div>
            `;
        }).join('');
        
        guessResult.innerHTML = `
            <div>
                <h4 style="margin-bottom: 15px; color: #4a5568;">🤖 我觉得你画的是：</h4>
                ${guessList}
            </div>
        `;
    }
    
    displayError() {
        const guessResult = document.getElementById('guessResult');
        guessResult.innerHTML = `
            <div class="waiting-state">
                <div class="robot-icon">❌</div>
                <p>分析过程中出现错误，请重试。</p>
            </div>
        `;
    }
    
    updateHistory(guesses) {
        const historyList = document.getElementById('historyList');
        const timestamp = new Date().toLocaleTimeString();
        
        if (guesses.length > 0) {
            const bestGuess = guesses[0];
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <strong>${bestGuess.label}</strong> 
                (${Math.round(bestGuess.confidence * 100)}%) 
                - ${timestamp}
            `;
            
            // 移除"无历史记录"提示
            const noHistory = historyList.querySelector('.no-history');
            if (noHistory) {
                noHistory.remove();
            }
            
            // 添加到历史记录顶部
            historyList.insertBefore(historyItem, historyList.firstChild);
            
            // 保持历史记录数量不超过10条
            const historyItems = historyList.querySelectorAll('.history-item');
            if (historyItems.length > 10) {
                historyItems[historyItems.length - 1].remove();
            }
        }
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new DrawAndGuessGame();
});