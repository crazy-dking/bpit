#!/bin/bash

# 你画我猜游戏启动脚本
echo "🎨 启动你画我猜游戏服务器..."
echo "📁 当前目录: $(pwd)"
echo ""

# 检查是否有Python3
if command -v python3 &> /dev/null; then
    echo "✅ 找到Python3"
    # 查找可用端口
    for port in 8000 8001 8002 8003 8004; do
        if ! lsof -i :$port > /dev/null 2>&1; then
            echo "🚀 在端口 $port 启动服务器..."
            echo "🌐 请在浏览器中访问: http://localhost:$port"
            echo ""
            echo "💡 游戏说明:"
            echo "   1. 在左侧画板上绘画"
            echo "   2. 点击'开始猜测'按钮"
            echo "   3. 查看右侧AI的猜测结果"
            echo ""
            echo "⏹️  按 Ctrl+C 停止服务器"
            echo "----------------------------------------"
            python3 -m http.server $port
            exit 0
        fi
    done
    echo "❌ 端口8000-8004都被占用，请手动指定端口"
    echo "   使用命令: python3 -m http.server [端口号]"
elif command -v python &> /dev/null; then
    echo "✅ 找到Python2"
    python -m SimpleHTTPServer 8000
else
    echo "❌ 未找到Python，请直接用浏览器打开 index.html 文件"
    echo "   或者安装Python后重新运行此脚本"
fi