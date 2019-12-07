<template>
  <div class="app-container">
    <sidebar></sidebar>
    <div :class="classObject">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>

</template>

<script>
import AppMain from "./AppMain";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    classObject() {
      return this.$route.name == "daskBoard" ? "main-active" : "main";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100%;
  width: 100%;
  .main {
    min-width: 800px;
    margin-left: 100px;
    margin-top: 50px;
  }
  .main-active {
    margin-left: 100px;
    margin-top: 50px;
    min-width: 800px;
  }
}
</style>
