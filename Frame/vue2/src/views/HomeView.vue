<template>
  <div class="home">
    <!-- 父组件 {{ count }} -->
    <!-- 和 Vue3 相同 不传过去不变 -->
    <TestRender />
    <!-- 和 Vue3 不同 传过去如果不用，那么就不会变 -->
    <!-- <TestRender :count="count" /> -->

    <!-- 测试 一个包含 Vuex 的状态组件变化时，另外一个 TestRender 会不会重新渲染，结论是：不会，和 React 不同 -->
    <TestVuex></TestVuex>
  </div>
</template>

<script>
// @ is an alias to /src
import TestRender from "@/components/TestRender.vue";
import TestVuex from "@/components/TestVuex.vue";

export default {
  name: "HomeView",
  components: {
    TestRender,
    TestVuex
  },
  data() {
    return {
      count: 1,
    };
  },
  created() {
    setInterval(() => {
      // debugger
      this.count++;
    }, 2000);
  },
};
</script>
