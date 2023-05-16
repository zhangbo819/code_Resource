<template>
  <h1>fater</h1>
  <!-- {{ data.a }} -->
  <Son v-model="data.a"></Son>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Son from "./Son.vue";

const data = ref({
  a: { b: '父组件初始的' },
});

// watch(() => props.msg, (val) => {
//   console.log("watch props", val);
// });
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
