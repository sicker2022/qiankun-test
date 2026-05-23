# Qiankun + Vite 微前端示例项目

这是一个基于 Vite 和 Qiankun 构建的微前端示例项目，包含一个主应用和一个子应用。

## 项目结构

```
qiankun-test/
├── main-app/          # 主应用（端口：8080）
│   ├── index.html
│   ├── main.js        # qiankun 配置和入口
│   ├── vite.config.js
│   └── package.json
└── sub-app/           # 子应用（端口：8081）
    ├── index.html
    ├── main.js        # 子应用生命周期函数
    ├── vite.config.js
    └── package.json
```

## 快速开始

### 1. 安装依赖

#### 安装主应用依赖
```bash
cd main-app
npm install
```

#### 安装子应用依赖
```bash
cd sub-app
npm install
```

### 2. 启动应用

**注意：需要先启动子应用，再启动主应用**

#### 启动子应用（终端 1）
```bash
cd sub-app
npm run dev
```

#### 启动主应用（终端 2）
```bash
cd main-app
npm run dev
```

### 3. 访问应用

主应用将在 `http://localhost:8080` 启动，浏览器会自动打开。

- **首页**：`http://localhost:8080/` - 显示欢迎信息
- **子应用**：`http://localhost:8080/sub-app` - 加载子应用内容

## 技术栈

- **Vite 5.x** - 快速的前端构建工具
- **Qiankun 2.x** - 蚂蚁金服开源的微前端框架
- **原生 JavaScript** - 无框架依赖

## 核心功能

### 主应用 (main-app)

- ✅ 使用 qiankun 注册和加载子应用
- ✅ 路由管理和导航
- ✅ 生命周期钩子（beforeLoad、beforeMount、afterUnmount）
- ✅ 预加载优化
- ✅ 样式隔离

### 子应用 (sub-app)

- ✅ 导出 qiankun 生命周期函数（bootstrap、mount、unmount）
- ✅ 支持独立运行和微前端模式
- ✅ 接收主应用传递的 props
- ✅ 交互式功能演示

## 关键配置说明

### 主应用配置

在 `main-app/main.js` 中配置子应用：

```javascript
const apps = [
  {
    name: 'sub-app',
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/sub-app',
    props: { data: '来自主应用的数据' }
  }
];
```

### 子应用配置

在 `sub-app/main.js` 中导出生命周期函数：

```javascript
export async function bootstrap() { }
export async function mount(props) { }
export async function unmount() { }
```

### Vite 配置要点

**子应用需要配置 CORS：**
```javascript
server: {
  port: 8081,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
```

## 常见问题

### 1. 子应用加载失败？
- 确保子应用已启动（端口 8081）
- 检查浏览器控制台是否有 CORS 错误
- 确认主应用配置的 entry 地址正确

### 2. 样式冲突？
- qiankun 提供了实验性样式隔离
- 在主应用中配置：`sandbox: { experimentalStyleIsolation: true }`

### 3. 如何添加更多子应用？
在主应用的 `main.js` 中的 `apps` 数组中添加新的配置即可。

## 开发建议

1. **先启动子应用，再启动主应用**
2. 使用浏览器的开发者工具查看控制台日志
3. 修改代码后 Vite 会自动热更新
4. 可以通过 Network 面板观察子应用的加载过程

## 更多信息

- [Qiankun 官方文档](https://qiankun.umijs.org/)
- [Vite 官方文档](https://vitejs.dev/)
