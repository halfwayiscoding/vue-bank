#!/bin/bash

# Vue Bank App - Vercel 部署脚本

echo "🏦 Vue Bank App - 开始部署到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "请运行: npm install -g vercel"
    exit 1
fi

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf dist

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功!"
    
    # 部署到 Vercel
    echo "🚀 部署到 Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 部署成功!"
        echo "您的应用已成功部署到 Vercel!"
    else
        echo "❌ 部署失败"
        exit 1
    fi
else
    echo "❌ 构建失败"
    exit 1
fi