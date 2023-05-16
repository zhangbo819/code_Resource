<template>
  <div>{{ count }}</div>
  <!-- 不传过去，不会重新渲染  -->
  <TestRender />
  <!-- 传过去就会 -->
  <TestRender :msg="count" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TestRender from "./TestRender.vue";

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
.read-the-docs {
  color: #888;
}
</style>
