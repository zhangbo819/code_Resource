<template>
  <!-- <TestRender /> -->

  <!-- <TestDrag /> -->

  <!-- <TestProps /> -->
  
  <TestForm />
</template>

<script setup lang="ts">
import TestRender from "./components/TestRender/index.vue";
import TestDrag from "./components/TestDrag.vue";
import TestProps from "./components/TestProps/index.vue";
import TestForm from "./components/TestForm/index.vue";
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
