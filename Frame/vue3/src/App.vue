<template>
  <div>{{ count }}</div>
  <!-- 不传过去，不会重新渲染  -->
  <!-- <TestRender /> -->
  <!-- 传过去就会 -->
  <!-- <TestRender :msg="count" /> -->

  <TestDrag />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TestRender from "./components/TestRender.vue";
import TestDrag from "./components/TestDrag.vue";

const count = ref(0);
let timer: any;

onMounted(() => {
  timer = setInterval(() => {
    count.value++;
    // debugger;
  }, 1000);
});

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
