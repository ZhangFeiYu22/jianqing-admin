<template>
  <div class="container">
    <el-row :gutter="20" class="btnBox">
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser">添加</el-button>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-table border :data="userList" style="width: 100%">
      <el-table-column align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" prop="email" label="用户名"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" type="primary" plain size="small">编辑</el-button>
          <el-button @click="delUser(scope.row)" type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户添加" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :rules="rules" :model="userForm" ref="userForm" status-icon>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="userForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="password_confirmation">
          <el-input v-model="userForm.password_confirmation" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave" v-if="post_put == 'post'">添加保存</el-button>
        <el-button type="primary" @click="editSave" v-else>修改保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUser, saveUser, putUser, delUser } from "../../api/apis";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var checkAgainPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请确认输入密码"));
      }
      if (this.userForm.password !== this.userForm.password_confirmation) {
        callback(new Error("密码不一致，请确认并重新输入"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        // mobile: [{ validator: checkMobile, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        password_confirmation: [
          { validator: checkAgainPassword, trigger: "blur" }
        ]
      },
      userList: [],
      post_put: "post",
      putId: "",
      dialogFormVisible: false,
      userForm: {
        email: "",
        password: "",
        password_confirmation: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getUser().then(res => {
        console.log(res);
        if (res.status == 200) {
          this.userList = res.data.data;
        }
      });
    },
    addUser() {
      this.dialogFormVisible = true;
      this.post_put = "post";
      this.userForm = {
        email: "",
        password: "",
        password_confirmation: ""
      };
    },
    editUser(row) {
      this.dialogFormVisible = true;
      this.post_put = "put";
      this.putId = row.id;
      this.userForm.email = row.email;
      console.log(row);
      this.$nextTick(() => {
        this.$refs["userForm"].clearValidate();
      });
    },
    delUser() {
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
    addSave() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          this.$confirm("确认保存吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              saveUser(this.userForm).then(res => {
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
        } else {
          return false;
        }
      });
    },
    editSave() {
      console.log(this.userForm);
      this.$confirm("确定修改保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          putUser(this.userForm, this.putId).then(res => {
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
    }
  }
};
</script>

<style lang="less" scoped>
.btnBox {
  margin: 0 0 20px 0;
}
.businessImg {
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
</style>
