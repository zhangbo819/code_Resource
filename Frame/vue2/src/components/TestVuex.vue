<template>
  <div>
    TestVuex
    <div @click="add">{{ count }}</div>
  </div>
</template>

<script lang="ts">
import store from "@/store";

export default {
  name: "TestVuex",
  data() {
    return {};
  },
  computed: {
    count() {
      return store.state.count;
    },
  },
  methods: {
    add() {
      store.dispatch("toggleCount", this.count + 1);
    },
  },
};
</script>

<style lang="less" scoped>
</style>