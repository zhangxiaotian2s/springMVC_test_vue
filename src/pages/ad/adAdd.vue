<template>
 <div>
	<!-- 面包屑 -->
	<bread-crumb :breadCrumbList="breadCrumbList">
	</bread-crumb>
	<div class="ad-box">
		<div class="input-box">
			<el-input placeholder="请输入标题" v-model="title" clearable>
			</el-input>
		</div>
		<div class="input-box">
			<el-input placeholder="地址" v-model="link">
				<template slot="prepend">
					Http://
				</template>
			</el-input>
		</div>
		<div class="input-box">
			<el-input placeholder="权重分配" v-model="weight">
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
	   	<el-button type="info" @click="adAdd">新增广告</el-button>
		</div>
	</div>
</div>
</template>
<script>
import BreadCrumb from "@/components/breadcrumb.components";
export default {
  data() {
    return {
      //面包屑配置
      breadCrumbList: [
        {
          title: "内容管理",
          path: ""
        },
        {
          title: "广告管理",
          path: "/ad/adList"
        },
        {
          title: "广告添加",
          path: "/ad/adAdd"
        }
      ],
      title: "",
      link: "",
      weight: 0,
      imgFileName: "",
      fileList: []
    };
  },
  components: {
    BreadCrumb
  },

  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
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
        this.imgFileName = res.data.imgName;
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
    adAdd() {
      let _this = this;
      this.$ajax({
        url: "/api/ad/adAdd.do",
        params: {
          title: _this.title,
          link: _this.link,
          weight: _this.weight,
          imgFileName: _this.imgFileName
        },
        method: "post"
      })
        .then(res => {
          if (res.data.success == 1) {
            this.$confirm("添加成功", "温馨提示", {
              showCancelButton: false,
              callback: (confirm, instance) => {
                this.title = "";
                this.link = "";
                this.weight = 0;
                this.imgFileName = "";
                this.fileList = [];
              }
            });
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
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
