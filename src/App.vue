<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
@import "element-ui/lib/theme-chalk/index.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px auto 0;
  width: 1360px;
}
</style>
