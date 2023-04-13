<template>
  <!-- 穿过去即使不使用，也会重新渲染 -->
  <!-- TODO 为什么 Vue2 就不会呢，Vue3 为什么会这样，有什么方法能避免 -->
  <!-- <h1>{{ msg }}</h1> -->

  <div class="card">
    <!-- <button type="button" @click="count++">count is {{ count }}</button> -->
  </div>

  <!-- Date.now() 用来检测是否重新 render -->
  {{ Date.now() }}
</template>

<script setup lang="ts">
import { watch } from "vue";

const props = defineProps<{ msg?: number }>();

// const count = ref(0);

// watch(() => props.msg, (val) => {
//   console.log("watch props", val);
// });
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
