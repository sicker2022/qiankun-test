import { registerMicroApps, start } from 'qiankun';

// 注册子应用
const apps = [
  {
    name: 'sub-app', // 子应用名称
    entry: '//localhost:8081', // 子应用入口地址
    container: '#subapp-container', // 容器
    activeRule: '/sub-app', // 激活规则
    props: {
      data: '来自主应用的数据'
    }
  }
];

// 注册子应用
registerMicroApps(apps, {
  beforeLoad: [
    app => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      return Promise.resolve();
    },
  ],
});

// 启动 qiankun
start({
  prefetch: true, // 启用预加载
  sandbox: {
    strictStyleIsolation: false, // 不使用严格样式隔离
    experimentalStyleIsolation: true // 使用实验性样式隔离
  }
});

console.log('所有子应用已加载完成');

// 显示首页内容
function showHomePage() {
  const container = document.getElementById('subapp-container');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2 style="font-size: 24px; margin-bottom: 16px; color: #333;">欢迎使用 Qiankun 微前端</h2>
        <p style="color: #666; line-height: 1.8;">
          这是一个基于 Vite + Qiankun 的微前端示例项目。<br>
          点击导航栏的"子应用"按钮即可加载子应用。
        </p>
      </div>
    `;
  }
}

// 路由处理函数
function handleRouting() {
  const pathname = window.location.pathname;
  
  console.log('当前路径:', pathname);
  
  if (pathname === '/' || pathname === '/index.html') {
    showHomePage();
  }
  // /sub-app 路径由 qiankun 自动处理
}

// 监听 popstate 事件（浏览器前进/后退）
window.addEventListener('popstate', () => {
  setTimeout(() => {
    handleRouting();
  }, 50);
});

// 监听自定义路由切换事件
window.addEventListener('route-change', () => {
  setTimeout(() => {
    handleRouting();
  }, 50);
});

// 页面加载时初始化
window.addEventListener('load', () => {
  console.log('主应用已启动');
  handleRouting();
});
