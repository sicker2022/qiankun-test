import { createApp } from 'vue';
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper';
import App from './App.vue';
import './style.css';

let app = null;

function render(props = {}) {
  const { container, data, mode } = props;
  const root = container ? container.querySelector('#app') : document.getElementById('app');

  if (!root) {
    throw new Error('[vue-sub-app] #app not found');
  }

  app = createApp(App, {
    data,
    mode: mode || (qiankunWindow.__POWERED_BY_QIANKUN__ ? 'qiankun' : 'standalone')
  });
  app.mount(root);
}

export async function bootstrap() {
  console.log('[vue-sub-app] bootstrap');
}

export async function mount(props) {
  console.log('[vue-sub-app] mount', props);
  render(props);
}

export async function unmount() {
  console.log('[vue-sub-app] unmount');

  if (app) {
    app.unmount();
    app = null;
  }
}

export async function update(props) {
  console.log('[vue-sub-app] update', props);

  if (app) {
    app.unmount();
    app = null;
  }

  render(props);
}

renderWithQiankun({
  bootstrap,
  mount,
  unmount,
  update
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('[vue-sub-app] standalone mode');
  render();
}
