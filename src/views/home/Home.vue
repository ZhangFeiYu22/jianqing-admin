<template>
  <div class="container">
    <h5 class="titleH5">首页信息:</h5>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="简介标题">
        <el-col :span="11">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="简介内容">
        <el-col :span="11">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="轮播图片">
        <div class="imgShowList">
          <div class="imgList" v-if="form.picture!==null && form.picture.length!==0">
            <div class="imgBox" v-for="(item,index) in form.picture" :key="index">
              <img :src="item" alt />
              <i @click="delImg(index)" class="delImgIcon">x</i>
            </div>
          </div>
          <div class="imgUpload">
            <div class="plus">
              <p>+</p>
              <input type="file" @change="getImage" />
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { homeSee, homeSave } from "@/api/apis";
import imgUpload from "../../utils/common";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        picture: []
      }
    };
  },
  created() {
    this.fetchHomeData();
  },
  methods: {
    fetchHomeData() {
      homeSee().then(res => {
        console.log(res);
        if (res.status == 200) {
          this.form.title = res.data.title;
          this.form.content = res.data.content;
          if (res.data.picture == null) {
            this.form.picture = [];
          } else {
            this.form.picture = res.data.picture;
          }
        }
      });
    },
    onSubmit() {
      console.log(this.form);
      this.$confirm("是否确认保存？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          homeSave(this.form).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "操作失败，请检查重新操作"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    getImage(e) {
      imgUpload.getPicDataArray(e.target.files[0], this.form.picture);
    },
    delImg(index){
      console.log(index)
      this.form.picture.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.titleH5 {
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #f1f1f1;
  font-size: 18px;
}
.imgShowList {
  .imgList {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    .imgBox {
      margin-right: 15px;
      width: 100px;
      height: 100px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .delImgIcon{
        position: absolute;
        width: 14px;
        height: 14px;
        line-height: 13px;
        text-align: center;
        display: block;
        border: 1px solid #f00;
        border-radius: 50%;
        font-style: normal;
        right: 0px;
        top: 0px;
        color: #f00;
        cursor: pointer;
      }
    }
  }
  .imgUpload {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
    .plus {
      width: 100px;
      height: 100px;
      position: relative;
      p {
        font-size: 30px;
        height: 98px;
        line-height: 98px;
        width: 98px;
        text-align: center;
        color: #999;
        position: absolute;
      }
      input {
        width: 100px;
        height: 100px;
        position: absolute;
        opacity: 0;
      }
    }
  }
}
</style>