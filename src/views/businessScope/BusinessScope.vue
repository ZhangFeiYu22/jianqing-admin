<template>
  <div class="container">
    <el-row :gutter="20" class="btnBox">
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addBusiness">添加</el-button>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-table border :data="businessList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="业务名称" width="180"></el-table-column>
      <el-table-column label="业务图片">
        <template slot-scope="scope">
          <img :src="scope.row.file_path" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editBusiness(scope.row)" type="primary" plain size="small">编辑</el-button>
          <el-button @click="delBusiness(scope.row)" type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="业务添加" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="businessForm">
        <el-form-item label="业务名称" :label-width="formLabelWidth">
          <el-input v-model="businessForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务图片" :label-width="formLabelWidth">
          <div class="imgBox" v-if="headImg.length!==0">
              <img :src="this.headImg[0]" alt />
            </div>
          <div class="businessImg">
            <div class="plus">
              <p>+</p>
              <input @change="addImg" type="file" />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBusiness" v-if="post_put == 'post'">添加保存</el-button>
        <el-button type="primary" @click="putBusiness(putId)" v-else>修改保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBusiness,
  saveBusiness,
  putBusiness,
  delBusiness
} from "../../api/apis";
import imgUpload from "../../utils/common";
export default {
  data() {
    return {
      headImg: [],
      post_put: "post",
      putId: '',
      businessList: [],
      dialogFormVisible: false,
      businessForm: {
        title: "",
        file_path: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchBusiness();
  },
  methods: {
    fetchBusiness() {
      getBusiness().then(res => {
        if (res.status == 200) {
          this.businessList = res.data.data;
        }
      });
    },
    addBusiness() {
      this.dialogFormVisible = true;
      this.businessForm = {};
      this.post_put = "post";
      this.headImg = [];
    },
    editBusiness(row) {
      this.dialogFormVisible = true;
      this.post_put = "put";
      this.putId = row.id;
      this.headImg.splice(0, 1, row.file_path);
      this.businessForm.title = row.title;
    },
    delBusiness(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delBusiness(row.id).then(res => {
            console.log(res);
            if (res.status == 200) {
              this.fetchBusiness();
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
    addImg(e) {
      imgUpload.getPicData(e.target.files[0], this.headImg);
    },
    saveBusiness() {
      this.businessForm.file_path = this.headImg[0];
      this.$confirm("确定添加保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          saveBusiness(this.businessForm).then(res => {
            if (res.status == 200) {
              this.dialogFormVisible = false;
              this.fetchBusiness();
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
    },
    putBusiness() {
      this.businessForm.file_path = this.headImg[0];
      console.log(this.businessForm);
      this.$confirm("确定修改保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          putBusiness(this.businessForm, this.putId).then(res => {
            if (res.status == 200) {
              this.dialogFormVisible = false;
              this.fetchBusiness();
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
.businessImg {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: inline-block;
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
</style>
