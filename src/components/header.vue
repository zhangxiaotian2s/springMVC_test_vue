<template>
  <div class="header">
    <el-menu class="el-menu-demo" 
      :default-active="activeIndex"
       mode="horizontal"
       background-color="#545c64"
      text-color="#fff" 
      :router="true"
       active-text-color="#ffd04b">
      <el-menu-item index="/index">处理中心</el-menu-item>
      <el-menu-item index="/ad" >内容管理</el-menu-item>
     
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: this.$route.fullPath
    };
  },
  mounted() {
    setTimeout(() => {
      if (/^\/ad/i.test(this.$route.fullPath)) {
        this.activeIndex = "/ad";
      }
      console.log(this.$route);
    }, 20);
  },
  methods: {}
};
</script>
<style  scoped>
.header {
  margin-bottom: 10px;
}
</style>
