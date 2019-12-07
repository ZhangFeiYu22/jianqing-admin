<template>
  <div class="login-container">
    <div class="top-logo">
      简轻后台管理系统
    </div>
    <transition name="el-fade-in" mode="out-in">
      <router-view class="wrapper"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(../../assets/images/login.jpg) no-repeat center/cover;
  // 顶部
  .top-logo {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    font-size: 22px;
    color: #333;
  }
  // 主体
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    padding: 40px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    // 穿透作用域,作用子组件
    /deep/ .title {
      margin-bottom: 25px;
      font-size: 25px;
      font-weight: 400;
      text-align: center;
    }
    /deep/ .footer {
      font-size: 14px;
    }
  }
  // 底部信息
  .bottom-about {
    position: fixed;
    left: 30px;
    bottom: 20px;
    color: #ccc;
  }
}
</style>
