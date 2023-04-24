<template>
  <div>
    <p>TestModal</p>
    {{ data }}
    {{ list }}
    <ChildrenComp v-model="data" :list.sync="list"></ChildrenComp>
  </div>
</template>

<script>
import ChildrenComp from "./ChildrenComp.vue";
export default {
  name: "TestModal",
  components: { ChildrenComp },
  data() {
    return {
      data: [1, 2, 3],
      list: ['a', 'b', 'c'],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>