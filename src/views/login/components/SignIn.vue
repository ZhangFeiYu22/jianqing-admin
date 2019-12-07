<template>
  <main>
    <h2 class="title">用户登录</h2>
    <el-form :model="form" :rules="rules" ref="form" status-icon>
      <el-form-item prop="mobile">
        <el-input v-model.number.trim="form.mobile" maxlength="11" placeholder="请输入手机号" clearable></el-input>
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
import { loginBy } from "@/api/login";
import { setToken, setsite_child_id } from "@/utils/auth";

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
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else if (value.length < 6) {
        callback(new Error("密码不能少于 6 位"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      rules: {
        mobile: [{ validator: checkMobile, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          loginBy(this.form).then(res => {
            if (res.data.code == 0) {
              setToken(res.data.data.access_token);
              setsite_child_id(res.data.data.site_child_id);
              this.$message.success({
                message: res.data.message,
                duration: 1000
              });
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
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

