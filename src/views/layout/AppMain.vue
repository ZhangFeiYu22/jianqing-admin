<template>
  <section class="app-main">
    <bread-crumb></bread-crumb>
    <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
export default {
  name: "AppMain",
  components: { BreadCrumb }
};
</script>

<style scoped>
.app-main {
  padding: 0 15px 15px 15px;
  background: #f2f2f2;
}
</style>
