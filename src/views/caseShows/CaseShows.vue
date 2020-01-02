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
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="案例名字" width="180"></el-table-column>
      <el-table-column prop="isShow" label="手否展示" width="180" :formatter="isShowFormatter"></el-table-column>
      <el-table-column prop="imgurl" label="案例图片"></el-table-column>
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
          <el-select v-model="caseForm.isShow" placeholder="请选择">
            <el-option label="否" :value="0"></el-option>
            <el-option label="是" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案例图片" :label-width="formLabelWidth">
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
          isShow: 1,
          imgurl: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          isShow: 1,
          imgurl: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          isShow: 0,
          imgurl: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          isShow: 1,
          imgurl: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogFormVisible: false,
      caseForm: {
        name: "",
        url: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {},
  methods: {
    addCase() {
      this.dialogFormVisible = true;
    },
    editCase(row) {
      this.dialogFormVisible = true;
      console.log(row);
    },
    delCase() {
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
    },
    isShowFormatter(row, column, cellValue) {
      return row.isShow == 0 ? "否" : "是";
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
