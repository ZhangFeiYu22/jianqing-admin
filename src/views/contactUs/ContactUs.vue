<template>
  <div class="container">
    <h5 class="titleH5">联系我们:</h5>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="地址">
        <el-col :span="11">
          <el-input v-model="form.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话">
        <el-col :span="11">
          <el-input v-model="form.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="时间">
        <el-col :span="5">
          <el-time-select
            placeholder="起始时间"
            v-model="form.start"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
          ></el-time-select>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="5">
          <el-time-select
            placeholder="结束时间"
            v-model="form.end"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: form.startTime
    }"
          ></el-time-select>
        </el-col>
      </el-form-item>
      <el-form-item label="轮播图片">
        <div class="imgShowList">
          <div class="imgList" v-if="form.file_path.length!==0">
            <div class="imgBox" v-for="(item,index) in form.file_path" :key="index">
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
import { postContacUs, getContacUs } from "../../api/apis";
import imgUpload from "../../utils/common";
export default {
  data() {
    return {
      form: {
        address: "",
        phone: "",
        start: "",
        end: "",
        file_path: []
      }
    };
  },
  created() {
    this.fetchContacUs();
  },
  methods: {
    fetchContacUs() {
      getContacUs().then(res => {
        console.log(res);
        if(res.status == 200){
          if(res.data.length !== 0 || res.data !== ''){
            this.form = res.data
          }
        }
      });
    },
    getImage(e) {
      imgUpload.getPicDataArray(e.target.files[0], this.form.file_path);
    },
    delImg(index){
      console.log(index)
      this.form.file_path.splice(index, 1);
    },
    onSubmit() {
      console.log(this.form);
      this.$confirm("是否确认保存？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postContacUs(this.form).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
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