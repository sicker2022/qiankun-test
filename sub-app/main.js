/**
 * 子应用入口文件
 * 需要导出三个生命周期函数：bootstrap、mount、unmount
 */

let app = null;

// 渲染函数
function render(props = {}) {
  const { container } = props;
  const root = container ? container.querySelector('#app') : document.getElementById('app');
  
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px;">
        <h2 style="color: #1890ff; margin-bottom: 20px;">🎉 子应用已成功加载</h2>
        <p style="color: #666; line-height: 1.8; margin-bottom: 12px;">
          <strong>应用名称：</strong>sub-app (Vite)
        </p>
        <p style="color: #666; line-height: 1.8; margin-bottom: 12px;">
          <strong>运行端口：</strong>8081
        </p>
        <p style="color: #666; line-height: 1.8; margin-bottom: 20px;">
          <strong>主应用数据：</strong>${props.data || '无'}
        </p>
        <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 4px;">
          <h3 style="margin-bottom: 12px; color: #333;">功能特性</h3>
          <ul style="color: #666; line-height: 2; padding-left: 20px;">
            <li>✅ Vite 快速构建</li>
            <li>✅ Qiankun 微前端集成</li>
            <li>✅ 独立开发和部署</li>
            <li>✅ 样式隔离</li>
            <li>✅ JS 沙箱机制</li>
          </ul>
        </div>
        <button 
          id="test-btn"
          style="
            margin-top: 20px;
            padding: 10px 24px;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          "
        >
          测试交互按钮
        </button>
        <div id="message" style="margin-top: 12px; color: #52c41a;"></div>
      </div>
    `;

    // 添加交互事件
    const testBtn = root.querySelector('#test-btn');
    const messageDiv = root.querySelector('#message');
    let clickCount = 0;
    
    if (testBtn && messageDiv) {
      testBtn.addEventListener('click', () => {
        clickCount++;
        messageDiv.textContent = `按钮被点击了 ${clickCount} 次`;
      });
    }
  }
}

// bootstrap 生命周期 - 应用启动时调用（只执行一次）
export async function bootstrap() {
  console.log('[子应用] bootstrap 已执行');
  return Promise.resolve();
}

// mount 生命周期 - 应用挂载时调用（每次进入都会执行）
export async function mount(props) {
  console.log('[子应用] mount 已执行', props);
  
  // 确保容器存在
  setTimeout(() => {
    render(props);
    
    app = {
      status: 'mounted',
      ...props
    };
    
    console.log('[子应用] 挂载完成');
  }, 0);
  
  return Promise.resolve();
}

// unmount 生命周期 - 应用卸载时调用（每次离开都会执行）
export async function unmount() {
  console.log('[子应用] unmount 已执行');
  
  // 彻底清理工作
  try {
    const root = document.getElementById('app');
    if (root) {
      root.innerHTML = '';
    }
    
    // 清理事件监听器
    app = null;
    
    console.log('[子应用] 卸载完成');
  } catch (error) {
    console.error('[子应用] 卸载出错:', error);
  }
  
  return Promise.resolve();
}

// 可选的 update 生命周期 - 应用更新时调用
export async function update(props) {
  console.log('[子应用] update 已执行', props);
  render(props);
}

// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('[子应用] 独立运行模式');
  render();
}
