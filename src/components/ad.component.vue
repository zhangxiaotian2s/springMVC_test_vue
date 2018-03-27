<template>
 <div :visible.sync="boolShow">
	<!-- 面包屑 -->
	  <el-dialog title="收货地址" :visible.sync="adboolShow" @close="closeDialog">
        <div class="ad-box" >
            <div class="input-box">
                <el-input placeholder="请输入标题"  v-model="adtitle" clearable>
                </el-input>
            </div>
            <div class="input-box">
                <el-input placeholder="地址" v-model="adlink">
                    <template slot="prepend">
                        Http://
                    </template>
                </el-input>
            </div>
            <div class="input-box">
                <el-input placeholder="权重分配" v-model="adweight">
                    <template slot="prepend">
                        权重
                    </template>
                </el-input>
            </div>
            <div class="input-box">
                <el-upload class="upload-demo" action="/api/common/uploadImage.do" 
                :on-remove="handleRemove" :file-list="fileList" :multiple="false" :on-success="uploadSuccess"
                list-type="picture">
                    <el-button size="small" type="primary">
                        点击上传
                    </el-button>
                    <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </el-upload>
            </div>
            <div class="input-btn">
                <el-button type="info" @click="adAdd" v-if="type==0">新增广告</el-button>
                <el-button type="info" @click="adUpdate" v-if="type==1">确认修改</el-button>
            </div>
        </div>
	  </el-dialog>
</div>
</template>
<script>
import BreadCrumb from "@/components/breadcrumb.components";
export default {
  data() {
    return {
      fileList: [],

      adType: this.type,
      adboolShow: this.boolShow,
      adtitle: this.title,
      adlink: this.link,
      adweight: this.weight,
      adimgFileName: this.imgFileName,
      adimgUrl: this.imgUrl
    };
  },
  props: {
    type: 0, //0 是新增 1 是修改,
    id: 0,
    boolShow: false,
    title: "",
    link: "",
    weight: 0,
    imgFileName: "",
    imgUrl: ""
  },
  components: {
    BreadCrumb
  },
  created() {
    this.initImgFileList();
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    initImgFileList() {
      if (this.imgFileName != "" || this.imgUrl != "") {
        this.fileList.push({
          name: this.adimgFileName,
          url: this.adimgUrl
        });
      }
    },

    // 图片上传
    handleChange(value) {
      console.log(value);
    },
    uploadSuccess(res) {
      console.log(res);
      if (res.success == 1) {
        var _img = {
          name: res.data.imgName,
          url: res.data.imgUrl
        };
        this.adimgFileName = res.data.imgName;
        this.fileList = [];
        this.fileList.push(_img);
      } else {
        console.log(res.error.message);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 广告添加
    adAdd() {
      let _this = this;
      this.$ajax({
        url: "/api/ad/adAdd.do",
        params: {
          title: _this.adtitle,
          link: _this.adlink,
          weight: _this.adweight,
          imgFileName: _this.adimgFileName
        },
        method: "post"
      })
        .then(res => {
          if (res.data.success == 1) {
            this.$confirm("添加成功", "温馨提示", {
              showCancelButton: false,
              callback: (confirm, instance) => {
                this.adtitle = "";
                this.adlink = "";
                this.adweight = 0;
                this.adimgFileName = "";
                this.fileList = [];
              }
            });
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 广告修改
    adUpdate() {
      let _this = this;
      this.$ajax({
        url: "/api/ad/adUpdate.do",
        params: {
          id: _this.id,
          title: _this.adtitle,
          link: _this.adlink,
          weight: _this.adweight,
          imgFileName: _this.adimgFileName
        },
        method: "post"
      })
        .then(res => {
          if (res.data.success == 1) {
            this.$confirm("修改成", "温馨提示", {
              showCancelButton: false,
              callback: (confirm, instance) => {
                this.closeDialog();
                this.$emit("callBack");
              }
            });
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.ad-box {
  margin: 20px 0;
  .input-box {
    margin: 10px 0px;
    .el-input-number {
      float: left;
    }
  }
  .input-btn {
    .el-button {
      width: 80%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
