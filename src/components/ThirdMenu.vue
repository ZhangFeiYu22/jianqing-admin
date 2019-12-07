<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="third-menu">
      <el-tab-pane v-for='(item,index) in menulists' :key='index' :label="item.name" :name="item.activeName">
      </el-tab-pane>
    </el-tabs>
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ThirdMenu",
  props: {
    menulists: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push({ name: this.menulists[tab.index].pathname });
    }
  },
  created() {
    this.menulists.map(list => {
      if (this.$route.name == list.pathname) {
        this.activeName = list.activeName;
      }
    });
  }
};
</script>

<style scoped>
.third-menu {
  position: fixed;
  top: 0;
  z-index: 1600;
  height: 50px;
  line-height: 50px;
}
</style>


