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
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="业务名称" width="180"></el-table-column>
      <el-table-column prop="imgurl" label="业务图片"></el-table-column>
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
          <el-input v-model="businessForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务图片" :label-width="formLabelWidth">
          <div class="imgBox">
            <img src="../../assets/images/login.jpg" alt />
          </div>
          <div class="businessImg">
            <div class="plus">
              <p>+</p>
              <input type="file" />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          imgurl: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          imgurl: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          imgurl: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          imgurl: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogFormVisible: false,
      businessForm: {
        name: "",
        url: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {},
  methods: {
    addBusiness() {
      this.dialogFormVisible = true;
    },
    editBusiness(row) {
      this.dialogFormVisible = true;
      console.log(row);
    },
    delBusiness() {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
