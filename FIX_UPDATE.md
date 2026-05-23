# 最新修复 - ES6 模块问题

## 🔧 问题描述

之前遇到的错误：
```
Uncaught SyntaxError: Cannot use import statement outside a module
Uncaught SyntaxError: application 'sub-app' died in status LOADING_SOURCE_CODE: Unexpected token 'export'
```

**原因**: Vite 开发模式使用 ES6 模块系统，而 qiankun 在加载子应用时无法直接处理 ES6 的 `import/export` 语法。

## ✅ 解决方案

### 1. 安装 vite-plugin-qiankun
```bash
cd sub-app
npm install vite-plugin-qiankun --save-dev
```

### 2. 更新 vite.config.js
```javascript
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  // ... 其他配置
  plugins: [
    qiankun('sub-app', {
      useDevMode: true // 启用开发模式
    })
  ]
})
```

### 3. 确保导出生命周期函数
在 `sub-app/main.js` 中必须导出三个生命周期函数：
```javascript
export async function bootstrap() { }
export async function mount(props) { }
export async function unmount() { }
```

## 🎯 当前状态

- ✅ 主应用运行在: http://localhost:8080/
- ✅ 子应用运行在: http://localhost:8081/
- ✅ 已安装并配置 vite-plugin-qiankun
- ✅ 支持开发模式下的 ES6 模块

## 📋 测试步骤

1. **访问主应用**: http://localhost:8080/
2. **点击"子应用"按钮**
3. **预期结果**: 
   - 子应用正常加载
   - 控制台无语法错误
   - 看到子应用内容

## 🔍 控制台预期输出

```
[LifeCycle] before load sub-app
[LifeCycle] before mount sub-app
[子应用] bootstrap 已执行
[子应用] mount 已执行 {data: "来自主应用的数据"}
所有子应用已加载完成
```

## ⚠️ 注意事项

1. **必须先启动子应用**，再启动主应用
2. **端口必须一致**：主应用配置的 entry 端口要与子应用实际运行端口一致
3. **CORS 配置**：子应用必须允许跨域访问
4. **生命周期函数**：必须导出 bootstrap、mount、unmount 三个函数

## 🚀 如果还有问题

如果仍然无法正常加载，请检查：
1. 浏览器控制台是否有其他错误
2. Network 面板确认子应用资源是否正确加载
3. 确认两个应用都在正常运行
4. 尝试清除浏览器缓存（Ctrl+Shift+R）
