# 贡献指南 Contributing Guide

感谢你对"你画我猜"游戏项目的兴趣！我们欢迎各种形式的贡献。

## 🤝 如何贡献

### 报告问题 Bug Reports

如果你发现了bug，请：

1. 检查 [Issues](https://github.com/crazy-dking/bpit/issues) 确认问题尚未被报告
2. 创建新的 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 期望的行为
   - 实际的行为
   - 浏览器和设备信息
   - 截图（如果适用）

### 功能请求 Feature Requests

对于新功能建议：

1. 在 Issues 中搜索是否已有类似建议
2. 创建新的 Issue，标记为 "enhancement"
3. 详细描述功能需求和使用场景

### 代码贡献 Code Contributions

#### 开发环境设置

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/your-username/bpit.git
cd bpit

# 2. 创建功能分支
git checkout -b feature/your-feature-name

# 3. 开始开发
# 直接用浏览器打开 index.html 或运行本地服务器
python3 -m http.server 8000
```

#### 代码规范

- **HTML**: 使用语义化标签，保持良好的缩进
- **CSS**: 使用BEM命名规范，组织好样式结构
- **JavaScript**: 
  - 使用ES6+语法
  - 保持函数简洁，单一职责
  - 添加适当的注释
  - 使用驼峰命名法

#### 提交规范

使用约定式提交格式：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

类型 Types:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat(canvas): add eraser tool functionality
fix(recognition): improve shape detection algorithm
docs(readme): update installation instructions
```

#### Pull Request 流程

1. 确保你的代码遵循项目的代码规范
2. 测试你的更改在不同浏览器中都能正常工作
3. 更新相关文档
4. 创建 Pull Request，包含：
   - 清晰的标题和描述
   - 更改的详细说明
   - 相关 Issue 的链接
   - 测试说明

## 🎨 开发指南

### 项目结构

```
bpit/
├── index.html          # 主页面
├── style.css          # 样式文件
├── script.js          # 主要逻辑
├── README.md          # 项目说明
├── LICENSE            # 许可证
├── CONTRIBUTING.md    # 本文件
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages 部署
```

### 核心组件

1. **DrawAndGuessGame 类**: 主游戏逻辑
2. **Canvas 绘画**: HTML5 Canvas API
3. **AI 识别算法**: 基于图像特征的简单识别
4. **UI 交互**: 响应式界面和事件处理

### 可改进的地方

- 🤖 更智能的AI识别算法
- 🎨 更多绘画工具（橡皮擦、填充、图形工具）
- 💾 保存和分享功能
- 🎮 多人游戏模式
- 📊 更详细的统计功能
- 🌐 国际化支持
- ♿ 无障碍功能改进

## 📝 许可证

通过贡献代码，你同意你的贡献将在 [MIT License](LICENSE) 下许可。

## 💬 联系方式

如果有任何问题，请通过以下方式联系：

- 创建 [GitHub Issue](https://github.com/crazy-dking/bpit/issues)
- 在 Pull Request 中讨论

感谢你的贡献！🎉