<template>
  <div>
    <bread-crumb :breadCrumbList="breadCrumbList"> </bread-crumb>
      
     <div class="list-head">
      <el-row>
        <el-col :span="3"><div class="">商家id</div></el-col>
        <el-col :span="5"><div class="">商品名称</div></el-col>
        <el-col :span="5"><div class="">权重</div></el-col>
        <el-col :span="6"><div class="">链接</div></el-col>
        <el-col :span="5"><div class="">操作</div></el-col>
      </el-row>
     </div>
     
  <div class="ad-list-conent">
     <el-row v-for="item in adList" :key="item.id" >
        <el-col :span="3"><div class="">{{item.id}}</div></el-col>
        <el-col :span="5"><div class="">{{item.title}}</div></el-col>
        <el-col :span="5"><div class="">{{item.weight}}</div></el-col>
        <el-col :span="6"><div class="">{{item.link}}</div></el-col>
        <el-col :span="5"><div class=""><a href="javascript:void(0)" @click="modifyBtnFn(item.id)" >修改</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:void(0)" @click="deleteAdBtnFn(item.id)">删除</a></div></el-col>
      </el-row>
  </div>
  <div class="page-Box">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      @current-change="getAdList"
      :page-count="pageInfo.pageTotal">
    </el-pagination>
  </div>
 <ad-common v-if="boolDelogShow" :boolShow="boolDelogShow"
  :id="adInfo.id"
  :title="adInfo.title" 
  :link="adInfo.link" 
  :weight="adInfo.weight"
  :imgFileName="adInfo.imgFileName"
  :imgUrl="adInfo.imgUrl"
  :type="1"
  @close="adDialogClose"
  @callBack="getAdList"
  ></ad-common>

  </div>
</template>
<script>
import BreadCrumb from "@/components/breadcrumb.components";
import AdCommon from "@/components/ad.component";
export default {
  data() {
    return {
      boolDelogShow: false,
      breadCrumbList: [
        {
          title: "内容管理",
          path: "/ad"
        },
        {
          title: "广告管理",
          path: "/ad"
        },
        {
          title: "广告列表",
          path: "/ad/adList"
        }
      ],
      adList: [],
      pageInfo: {
        pageTotal: 0
      }
    };
  },
  created() {
    this.getAdList(1);
  },
  components: {
    BreadCrumb,
    AdCommon
  },
  methods: {
    getAdList(currentPage = 1) {
      console.log(currentPage);
      this.$ajax({
        method: "post",
        url: "/api/ad/adList.do?currentPage=" + currentPage
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success == 1) {
            this.adList = res.data.data.list;
            console.log(this.adList);
            this.pageInfo.pageTotal = res.data.data.pageInfo.pageTotal;
            this.pageInfo.currentPage = res.data.data.pageInfo.currentPage;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改按钮
    modifyBtnFn(id) {
      this.boolDelogShow = true;
      this.adInfo = this.getAdInfo(id);
      this.adInfo.id = id;
      console.log(this.adInfo);
    },
    //读取单个信息
    getAdInfo(id) {
      let obj = {};
      this.adList.forEach(element => {
        if (element.id == id) {
          obj = element;
        }
      });
      return obj;
    },
    //ad弹出框关闭
    adDialogClose() {
      this.boolDelogShow = false;
    },
    // 删除操作
    deleteAdBtnFn(id) {
      this.$confirm("是否删除", "温馨提示", {
        showCancelButton: true
      }).then(() => {
        this.deleteAdAction(id);
      });

      //
    },
    // 删除广告
    deleteAdAction(id) {
      this.$ajax({
        method: "post",
        url: "/api/ad/adDelete.do",
        params: {
          id: id
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success == 1) {
            this.getAdList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss"  scoped>
.list-head {
  padding: 10px 0px;
  .el-row {
    background: #e0e0e0;
    height: 36px;
    line-height: 36px;
    .el-col {
      text-align: left;
      text-indent: 20px;
    }
  }
}
.ad-list-conent {
  .el-row {
    height: 36px;
    line-height: 36px;
    border-bottom: #e0e0e0 solid 1px;
    .el-col {
      text-align: left;
      text-indent: 20px;
    }
  }
}
.page-Box {
  margin: 20px 0px;
}
.input-box {
  margin: 10px 0px;
}
</style>
