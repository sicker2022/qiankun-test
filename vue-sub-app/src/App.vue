<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  data: {
    type: String,
    default: 'No host data'
  },
  mode: {
    type: String,
    default: 'qiankun'
  }
});

const count = ref(0);

const cards = computed(() => [
  { label: 'Framework', value: 'Vue 3 + Vite' },
  { label: 'Runtime', value: props.mode === 'qiankun' ? 'Mounted by qiankun' : 'Standalone' },
  { label: 'Port', value: '8083' }
]);
</script>

<template>
  <main class="vue-micro">
    <section class="vue-micro__hero">
      <div>
        <p class="vue-micro__eyebrow">Vue Micro App</p>
        <h2>Vue 3 micro frontend is online</h2>
        <p class="vue-micro__copy">
          This view is rendered by a Vue 3 application and can run inside the qiankun host or by itself.
        </p>
      </div>
      <button class="vue-micro__button" type="button" @click="count += 1">
        Clicked {{ count }} times
      </button>
    </section>

    <section class="vue-micro__grid">
      <article v-for="card in cards" :key="card.label" class="vue-micro__card">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </article>
    </section>

    <section class="vue-micro__host">
      <span>Host props</span>
      <strong>{{ data }}</strong>
    </section>
  </main>
</template>
