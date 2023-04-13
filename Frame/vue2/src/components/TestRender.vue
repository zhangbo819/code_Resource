<template>
  <div class="hello">
    <!-- 和 Vue3 不同 传过去如果不用，那么就不会变 -->
    <!-- <p>TestRender</p> -->
    <!-- <p>TestRender {{ count }}</p> -->
    {{ self }}

    {{ Date.now() }}
  </div>
</template>

<script>
export default {
  name: "TestRender",
  props: {
    count: Number,
  },
  data() {
    return {
      self: 1,
    };
  },
  watch: {
    count() {
      // 这里能够打印，但页面不会重新渲染
      console.log("count", this.count);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
