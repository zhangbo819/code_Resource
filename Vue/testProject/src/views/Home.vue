<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <router-view></router-view> -->
    <VuexTest></VuexTest>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "@/utils/axios";
import HelloWorld from "@/components/HelloWorld.vue";
import VuexTest from "@/components/vuex";

export default {
  name: "home",
  components: {
    HelloWorld,
    VuexTest,
  },
  created() {
    // axios
    console.log("axios", axios);
    // axios
    //   .get(
    //     "https://api.juejin.cn/tag_api/v1/query_category_briefs?aid=2608&uuid=7008360175187232269"
    //   )
    //   .then((res) => {
    //     console.log("res", res);
    //   });

  },
  methods: {
    
  },
};
</script>
