<template>
  <header :class="[{active:$route.name == 'daskBoard'},'navbar']">
    <ul>
      <li>后台管理系统</li>
      <li class="sign-out" @click="signOut">退出</li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem('Authorization');
      this.$router.push("/login/signin");
    }
  }
};
</script>

<style lang='scss' scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  // left: 201px;
  left: 101px;
  z-index: 10;
  height: 50px;
  line-height: 50px;
  background: #fff;
  ul {
    display: flex;
    justify-content: flex-end;
    color: #666;
    .sign-out {
      margin: 0 30px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}

</style>
