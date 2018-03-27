<template>
  <div class="ad-wrap">
  <div class="left">
 <el-menu
     
      class="el-menu-vertical-demo"
      :default-active="activeIndex"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
       :router="true"
      >
       <el-submenu index="/ad/adList">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/ad/adList"> <i class="el-icon-caret-right"></i>广告列表</el-menu-item>
          <el-menu-item index="/ad/adAdd"><i class="el-icon-caret-right"></i>广告添加</el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
     
      
    </el-menu>
  </div>
  <div class="right">
      <router-view/>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: this.$route.fullPath
    };
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.fullPath;
    }
  }
};
</script>
<style lang="scss" scoped>
.ad-wrap {
  display: flex;
  .left {
    width: 250px;

    .el-menu-vertical-demo {
      li {
        text-align: left;
      }
    }
  }
  .right {
    flex: 1;
    padding-left: 10px;
  }
}
</style>


