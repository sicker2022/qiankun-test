import React from 'react';
import { createRoot } from 'react-dom/client';
import MicroApp from './MicroApp';
import '../styles/globals.css';

let root = null;

function getContainer(props = {}) {
  return props.container || document;
}

async function bootstrap() {
  console.log('[next-sub-app] bootstrap');
}

async function mount(props = {}) {
  console.log('[next-sub-app] mount', props);
  const container = getContainer(props);
  const el = container.querySelector('#next-sub-app-root');

  if (!el) {
    throw new Error('[next-sub-app] #next-sub-app-root not found');
  }

  root = createRoot(el);
  root.render(<MicroApp mode="qiankun" data={props.data} />);
}

async function unmount(props = {}) {
  console.log('[next-sub-app] unmount', props);

  if (root) {
    root.unmount();
    root = null;
  }
}

window['next-sub-app'] = {
  bootstrap,
  mount,
  unmount
};
