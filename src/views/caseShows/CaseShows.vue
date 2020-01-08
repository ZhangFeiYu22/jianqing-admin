<template>
  <div class="container">
    <el-row :gutter="20" class="btnBox">
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addCase">添加</el-button>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-table border :data="caseList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="案例名字" width="180"></el-table-column>
      <el-table-column prop="status" label="手否展示" width="180" :formatter="isShowFormatter"></el-table-column>
      <el-table-column label="业务图片">
        <template slot-scope="scope">
          <img :src="scope.row.file_path" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editCase(scope.row)" type="primary" plain size="small">编辑</el-button>
          <el-button @click="delCase(scope.row)" type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="案例添加" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="caseForm">
        <el-form-item label="案例名称" :label-width="formLabelWidth">
          <el-input v-model="caseForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否展示" :label-width="formLabelWidth">
          <el-select v-model="caseForm.status" placeholder="请选择">
            <el-option label="否" :value="false"></el-option>
            <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案例图片" :label-width="formLabelWidth">
          <div class="imgShowList">
            <!-- <div class="imgList" v-if="caseForm.file_path.length!==0">
              <div class="imgBox" v-for="(item,index) in caseForm.file_path" :key="index">
                <img :src="item" alt />
              </div>
            </div>-->
            <div class="imgBox" v-if="picImg.length!==0">
              <img :src="this.picImg[0]" alt />
            </div>
            <div class="imgUpload">
              <div class="plus">
                <p>+</p>
                <input type="file" @change="getImage" />
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="caseSave" v-if="post_put == 'post'">添加保存</el-button>
        <el-button type="primary" @click="putCaseSave" v-else>修改保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCase, saveCase, putCase, delCase } from "../../api/apis";
import imgUpload from "../../utils/common";
export default {
  data() {
    return {
      caseList: [],
      dialogFormVisible: false,
      picImg: [],
      post_put: "post",
      putId: "",
      caseForm: {
        name: "",
        status: "",
        file_path: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getCase().then(res => {
        console.log(res);
        if (res.status == 200) {
          this.caseList = res.data.data;
        }
      });
    },
    addCase() {
      this.dialogFormVisible = true;
      this.picImg = [];
      this.post_put = "post";
      this.caseForm = {
        name: "",
        status: "",
        file_path: ""
      };
    },
    editCase(row) {
      this.dialogFormVisible = true;
      this.caseForm.name = row.name;
      this.caseForm.status = row.status;
      this.post_put = "put";
      this.putId = row.id;
      this.picImg.splice(0, 1, row.file_path);
      console.log(row);
    },
    caseSave() {
      this.caseForm.file_path = this.picImg[0];
      console.log(this.caseForm);
      this.$confirm("确认保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          saveCase(this.caseForm).then(res => {
            if (res.status == 200) {
              this.fetchData();
              this.dialogFormVisible = false;
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
            message: "已取消"
          });
        });
    },
    putCaseSave() {
      this.caseForm.file_path = this.picImg[0];
      console.log(this.caseForm);
      this.$confirm("确定修改保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          putCase(this.caseForm, this.putId).then(res => {
            if (res.status == 200) {
              this.dialogFormVisible = false;
              this.fetchData();
              this.$message({
                type: "success",
                message: "修改成功!"
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
    delCase(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCase(row.id).then(res => {
            if (res.status == 200) {
              this.fetchData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    isShowFormatter(row, column, cellValue) {
      return row.status == true ? "是" : "否";
    },
    getImage(e) {
      imgUpload.getPicData(e.target.files[0], this.picImg);
    }
  }
};
</script>

<style lang="less" scoped>
.btnBox {
  margin: 0 0 20px 0;
}
.imgBox {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
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
