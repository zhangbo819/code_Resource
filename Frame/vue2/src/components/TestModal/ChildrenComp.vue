<template>
  <div>
    <p>ChildrenComp</p>

    <div>
      {{ value }}
      <button @click="updateValue">更新 value</button>
    </div>

    <div>
      {{ list }}
      <button @click="updateList">更新 list</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChildrenComp",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    updateValue() {
      const newValue = this._getNewValue();
      this.$emit("input", newValue);
    },
    updateList() {
      const newValue = this._getNewValue();
      this.$emit("update:list", newValue);
    },

    _getNewValue(length = 3) {
      return new Array(length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
    },
  },
};
</script>

<style lang="less" scoped>
</style>