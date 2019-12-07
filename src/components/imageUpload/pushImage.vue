<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showUploadImg">上传图片</el-button>
    <el-dialog class="min-width" title="选择图片" :visible.sync="hideUploadImg" v-loading="loading" element-loading-text="图片上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="clearfix">
        <!--图片上传-->
        <el-upload :action="url" :before-upload="beforeAvatarUpload" accept=".jpg,.gif,.png" :data="upLoadData" :onSuccess="handleAvatarSuccess" :show-file-list=false class="pull-left">
          <!--hover提示-->
          <el-tooltip class="item" effect="dark" content="只能上传jpg/gif/png文件，且不超过2M" placement="top">
            <el-button icon="el-icon-upload" type="primary" class="pull-left">点击上传</el-button>
          </el-tooltip>
        </el-upload>
        <!--图片查询-->
        <el-input v-model="searchName" placeholder="请输入内容" class="pull-right" style="width: 200px">
          <el-button slot="append" icon="el-icon-search" @click="fetchData('return')"></el-button>
        </el-input>
      </div>
      <!--图片查看及分组-->
      <div style="margin: 0 auto;">
        <el-tabs v-model="activeName" type="border-card" tab-position="left" @tab-click="fetchData('return')" style="height: 420px;">
          <!--分组渲染-->
          <el-tab-pane :label="group.name" v-for="(group,index) in groups" :key="index" :name="group.catid+''">
            <!--图片渲染-->
            <div class="img-box" v-for="(list,index) in lists" :key="index" :class="{ isSelected: selectedImgNum.indexOf(index) != -1 }" @click="select(index)">
              <i class="el-icon-success" v-if="selectedImgNum.indexOf(index) != -1"></i>
              <a href="javascript:;">
                <img :src="list.img" style="width: 100px;height: 100px" />
                <span>{{ list.filename }}</span>
              </a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--底部按钮-->
      <div slot="footer" class="dialog-footer">
        <!--分页-->
        <el-pagination style="display: inline-block;" background layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="page.current_page" :page-size="18" :total="page.total_num" v-if="page != undefined">
        </el-pagination>
        <el-button type="primary" size="mini" @click="confirm" style="margin-top: -8px;">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken, getSite } from "@/utils/auth";
import { getImage, getGroup, getImageByGroup } from "@/api/mallCenter";

export default {
  name: "PushImage",
  props: ["imageList", "imageNumber"], //获取父组件传参：更改后的图片列表，上传图片限制数量
  data() {
    return {
      searchName: "",
      activeName: "0",
      currentPage: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      hideUploadImg: false,
      upLoadData: {
        access_token: getToken(),
        catid: 0,
        site_id: getSite() //店铺ID，测试传1
      },
      lists: [],
      page: {},
      selectedImgNum: [], //当前选中图片序号
      groups: [],
      loading: false
    };
  },
  computed: {
    url() {
      return process.env.BASE_API + "/attachment/upload/uploadimage";
    }
  },
  created() {
    getGroup().then(res => {
      this.groups = res.data.data;
      this.fetchData();
    });
  },
  methods: {
    //	更新数据
    fetchData(arg) {
      if (arg == "return") {
        this.currentPage = 1;
        this.upLoadData.catid = this.activeName;
      }
      getImageByGroup(
        this.activeName,
        15,
        this.currentPage,
        this.searchName
      ).then(res => {
        this.lists = res.data.data;
        this.page = res.data.page_info;
        for (let i = 0; i < this.lists.length; i++) {
          this.lists[i].img =
            process.env.IMG_API +
            this.lists[i].filepath +
            "&oss-process=h_100,w_100";
          if (this.lists[i].filename.length > 10) {
            this.lists[i].filename =
              this.lists[i].filename.slice(0, 10) + "...";
          }
          this.lists[i].index = i;
        }
      });
    },
    showUploadImg() {
      this.hideUploadImg = true;
      this.fetchData();
      //更新被父级修改后的选中图片 index
      this.selectedImgNum = [];
      if (this.imageList != undefined) {
        this.imageList.map(list => {
          this.selectedImgNum.push(list.index);
        });
      }
    },
    //上传成功刷新并通知父组件
    handleAvatarSuccess(res, file) {
      //已选中图片的 index 加 1
      for (let i = 0; i < this.selectedImgNum.length; i++) {
        this.selectedImgNum[i]++;
      }
      this.loading = false;
      this.fetchData();
      this.$emit("onSuccess");
      this.$message({
        message: "图片上传成功",
        type: "success"
      });
    },
    //图片上传前格式和大小检测
    beforeAvatarUpload(file) {
      const isImg =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error("上传图片只能是 jpg/gif/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      if (isImg && isLt2M) {
        this.loading = true;
      }
      return isImg && isLt2M;
    },
    //选择图片及取消选择
    select(index) {
      if (this.selectedImgNum.indexOf(index) == -1) {
        if (this.selectedImgNum.length >= Number(this.imageNumber)) {
          this.$message.error("最多选择 " + this.imageNumber + " 张图片!");
          return;
        }
        this.selectedImgNum.push(index);
      } else {
        this.selectedImgNum.splice(this.selectedImgNum.indexOf(index), 1);
      }
    },
    //分页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.fetchData();
    },
    //通知父组件选中的图片
    confirm() {
      this.hideUploadImg = false;
      this.$emit("selected", this.imageInfo());
    },
    //选中图片的信息
    imageInfo() {
      let selectedImage = [];
      for (let i = 0; i < this.selectedImgNum.length; i++) {
        selectedImage.push(this.lists[Number(this.selectedImgNum[i])]);
      }
      return selectedImage;
    }
  }
};
</script>

<style scoped>
.min-width .el-dialog {
  min-width: 840px;
}
.min-width .el-dialog__body {
  padding: 10px 15px 0;
  border-top: 1px solid #ccc;
}
.img-box {
  float: left;
  margin: 11px;
  padding: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
}
.img-box i {
  position: absolute;
  right: -5px;
  top: -5px;
  color: #409eff;
}
.img-box a {
  display: block;
  position: relative;
}
.img-box a span {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
.img-box .el-icon-success {
  overflow: hidden;
  border-radius: 50%;
  transform: translate(5px, 0);
  background-color: #fff;
}
.isSelected {
  margin: 10px;
  border-color: #409eff;
  border-width: 2px;
}
</style>
