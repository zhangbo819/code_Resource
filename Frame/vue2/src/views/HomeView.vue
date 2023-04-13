<template>
  <div class="home">
    父组件 {{ count }}
    <!-- 和 Vue3 相同 不传过去不变 -->
    <!-- <TestRender /> -->
    <!-- 和 Vue3 不同 传过去如果不用，那么就不会变 -->
    <TestRender :count="count" />
  </div>
</template>

<script>
// @ is an alias to /src
import TestRender from "@/components/TestRender.vue";

export default {
  name: "HomeView",
  components: {
    TestRender,
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
