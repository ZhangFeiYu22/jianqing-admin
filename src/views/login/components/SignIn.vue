<template>
  <main>
    <h2 class="title">用户登录</h2>
    <!-- <el-form :model="form" :rules="rules" ref="form" status-icon>
      <el-form-item prop="mobile">
        <el-input v-model.number.trim="form.mobile" maxlength="11" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="login" style="width: 100%;">登 录</el-button>
      </el-form-item>
    </el-form>-->
    <el-form :model="form" :rules="rules" ref="form" status-icon>
      <el-form-item prop="email">
        <el-input v-model="form.email" type="text" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="login" style="width: 100%;">登 录</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
import { loginBy } from "@/api/apis";
import { mapMutations } from "vuex";
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else if (!/^1[0-9]{10}$/.test(this.form.mobile)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
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
    return {
      form: {},
      rules: {
        // mobile: [{ validator: checkMobile, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      var _this = this;
      _this.$refs["form"].validate(valid => {
        if (valid) {
          loginBy(_this.form).then(res => {
            if (res.status == 200) {
              if (res.data.code == 422) {
                _this.$message.info({
                  message: res.data.message,
                  duration: 1000
                });
              } else {
                localStorage.setItem("api_token", res.data.api_token);
                _this.userToken = "Bearer " + res.data.api_token;
                _this.changeLogin({ Authorization: _this.userToken });
                _this.$message.success({
                  message: res.data.message,
                  duration: 1000
                });
                _this.$router.push({ path: "/home" });
              }
            } else {
              _this.$message.error("用户名或密码错误，请重新输入");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

