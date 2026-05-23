# 最新修复 - 子应用重复加载问题

## 🔧 问题描述

**症状**：
- 第一次点击"子应用"能正常渲染
- 点回首页后再点击"子应用"无法渲染
- 控制台报错：`single-spa minified message #31: bootstrap timeout`

**错误原因**：
1. **unmount 清理不彻底**：子应用卸载时没有完全清理 DOM 和状态
2. **生命周期函数未返回 Promise**：qiankun 要求生命周期函数必须返回 Promise
3. **容器状态冲突**：再次加载时容器状态不正确

## ✅ 解决方案

### 1. 修复子应用生命周期函数

在 `sub-app/main.js` 中：

```javascript
// ✅ 确保所有生命周期函数都返回 Promise
export async function bootstrap() {
  console.log('[子应用] bootstrap 已执行');
  return Promise.resolve(); // 关键：必须返回 Promise
}

export async function mount(props) {
  console.log('[子应用] mount 已执行', props);
  
  // 使用 setTimeout 确保容器可用
  setTimeout(() => {
    render(props);
    app = { status: 'mounted', ...props };
    console.log('[子应用] 挂载完成');
  }, 0);
  
  return Promise.resolve(); // 关键：必须返回 Promise
}

export async function unmount() {
  console.log('[子应用] unmount 已执行');
  
  try {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = ''; // 彻底清理 DOM
    }
    app = null; // 清理状态
    console.log('[子应用] 卸载完成');
  } catch (error) {
    console.error('[子应用] 卸载出错:', error);
  }
  
  return Promise.resolve(); // 关键：必须返回 Promise
}
```

### 2. 关键改进点

#### ✅ 返回 Promise
所有生命周期函数都必须返回 Promise：
```javascript
return Promise.resolve();
```

#### ✅ 使用 setTimeout
在 mount 中使用 setTimeout 确保容器元素可用：
```javascript
setTimeout(() => {
  render(props);
}, 0);
```

#### ✅ 彻底的清理
unmount 时彻底清理 DOM 和状态：
```javascript
if (root) {
  root.innerHTML = '';
}
app = null;
```

#### ✅ 错误处理
添加 try-catch 捕获卸载错误：
```javascript
try {
  // 清理逻辑
} catch (error) {
  console.error('[子应用] 卸载出错:', error);
}
```

## 🎯 测试步骤

1. **刷新浏览器**（Ctrl+Shift+R）
2. **访问主应用**：http://localhost:8080/
3. **测试循环切换**：
   - 点击"子应用" → 应该正常加载 ✅
   - 点击"首页" → 应该返回首页 ✅
   - 再次点击"子应用" → 应该再次加载 ✅
   - 重复多次测试 → 都应该正常工作 ✅

## 📋 预期控制台输出

### 首次加载子应用
```
[LifeCycle] before load sub-app
[LifeCycle] before mount sub-app
[子应用] bootstrap 已执行
[子应用] mount 已执行 {data: "来自主应用的数据"}
[子应用] 挂载完成
```

### 切换到首页
```
[子应用] unmount 已执行
[子应用] 卸载完成
[LifeCycle] after unmount sub-app
当前路径: /
```

### 再次加载子应用
```
[LifeCycle] before load sub-app
[LifeCycle] before mount sub-app
[子应用] mount 已执行 {data: "来自主应用的数据"}
[子应用] 挂载完成
```

注意：bootstrap 只在第一次执行，后续只执行 mount/unmount

## 🔍 关键知识点

### qiankun 生命周期执行顺序

1. **bootstrap** - 只执行一次（首次加载时）
2. **mount** - 每次进入时执行
3. **unmount** - 每次离开时执行

### 为什么需要返回 Promise？

qiankun 基于 single-spa，需要等待异步操作完成：
- 如果不返回 Promise，qiankun 不知道何时完成
- 导致超时错误（message #31）
- 影响后续的挂载操作

### 为什么使用 setTimeout？

```javascript
setTimeout(() => {
  render(props);
}, 0);
```

这确保了：
- DOM 更新在当前事件循环之后执行
- 容器元素已经完全准备好
- 避免时序问题导致的渲染失败

## ⚠️ 常见问题

### 问题 1：仍然出现 bootstrap 超时
**解决**：
- 确认 vite-plugin-qiankun 已正确安装
- 重启两个应用的开发服务器
- 清除浏览器缓存

### 问题 2：第二次加载时容器为空
**解决**：
- 检查 HTML 中是否有 `<div id="subapp-container"></div>`
- 确认主应用的 activeRule 配置正确

### 问题 3：样式或事件冲突
**解决**：
- 启用实验性样式隔离
- 确保事件监听器正确移除

## 🚀 现在应该可以了

请刷新浏览器并测试多次切换。如果还有问题，请告诉我：
1. 控制台的完整错误信息
2. Network 面板中的请求状态
3. 具体在哪一步出现问题
