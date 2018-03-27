<template>
  <div>
    <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.id" :to="{ path: item.path }" >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>    
  </div>
  </div>
</template>
<script>
export default {
  props: {
    breadCrumbList: {
      type: Array,
      default: []
    }
  }
};
</script>
<style  scoped>
.bread-crumb {
  padding: 10px;

  border: #e0e0e0 solid 1px;
}
</style>
