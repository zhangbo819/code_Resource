<template>
  <div class="home">
    <template v-if="false">
      <!-- 父组件 {{ count }} -->
      <!-- 和 Vue3 相同 不传过去不变 -->
      <TestRender />
      <!-- 和 Vue3 不同 传过去如果不用，那么就不会变 -->
      <!-- <TestRender :count="count" /> -->
  
      <!-- 测试 一个包含 Vuex 的状态组件变化时，另外一个 TestRender 会不会重新渲染，结论是：不会，和 React 不同 -->
      <TestVuex />
    </template>

    <!-- 测试 .asyc v-modal 自定义 -->
    <TestModal />
  </div>
</template>

<script>
// @ is an alias to /src
import TestRender from "@/components/TestRender.vue";
import TestVuex from "@/components/TestVuex.vue";
import TestModal from "@/components/TestModal";

export default {
  name: "HomeView",
  components: {
    TestRender,
    TestVuex,
    TestModal,
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
