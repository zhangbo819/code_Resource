<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <router-view></router-view> -->
    <VuexTest></VuexTest>
    <button @click="handleAxios">发起一个请求</button>
    {{ cancel }}
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import axios from "@/utils/axios";
import HelloWorld from "@/components/HelloWorld.vue";
import VuexTest from "@/components/vuex";

export default {
  name: "home",
  components: {
    HelloWorld,
    VuexTest,
  },
  computed: {
    ...mapState(["cancel"]),
  },
  created() {
    // axios
    // console.log("axios", axios);
  },
  methods: {
    handleAxios() {
      axios
        .get("http://localhost:8081", {
          params: {
            cancelToken: "aaasss",
          },
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>
