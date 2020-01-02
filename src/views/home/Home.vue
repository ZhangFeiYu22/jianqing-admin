<template>
  <div class="container">
    <h5 class="titleH5">首页信息:</h5>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="简介标题">
        <el-col :span="11">
          <el-input v-model="form.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="简介内容">
        <el-col :span="11">
          <el-input type="textarea" v-model="form.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="轮播图片">
        <div class="imgShowList">
          <div class="imgList">
            <div class="imgBox">
              <img src="../../assets/images/logo.jpg" alt />
            </div>
            <div class="imgBox">
              <img src="../../assets/images/logoName.png" alt />
            </div>
            <div class="imgBox">
              <img src="../../assets/images/logoName.png" alt />
            </div>
          </div>
          <div class="imgUpload">
            <div class="plus">
              <p>+</p>
              <input type="file" />
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
export default {
  data() {
    return {
      form: {
        address: "",
        phone: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$confirm("是否确认保存？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
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
      margin-right: 10px;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
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