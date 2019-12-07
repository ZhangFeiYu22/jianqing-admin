<template>
  <aside>
    <!--一级路由-->
    <div class="first-warpper">
      <div class="logo"><img src="@/assets/images/logoName.png"></div>
      <ul class="first-menu">
        <router-link v-for="(menu,index) in menus" :key="index" :to="menu.path" @click.native="toggle(index)" class="first-list" tag="li">
          <i :class="menu.icon"></i>
          {{menu.title}}
        </router-link>
      </ul>
    </div>
    <!--二级路由-->
    <!-- <div class="second-warpper" v-for="(menu,index) in menus" :key="index" v-show="isShow(index)">
      <h5>{{menu.lists[0].name}}</h5>
      <ul class="second-menu">
        <router-link v-for="(list,$index) in menu.lists" :key="$index" :to="menu.path + '/' + list.path" class="second-list" tag="li">
          {{list.name}}
        </router-link>
      </ul>
    </div> -->
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      num: 0,
      menus: [
        {
          title: "首页管理",
          icon: "iconfont el-icon-shujufenxi",
          path: "/home",
          lists: [{ name: "首页管理", path: "home" }]
        },
        {
          title: "公司简介",
          icon: "iconfont el-icon-shujufenxi",
          path: "/companyProfile",
          lists: [{ name: "公司简介", path: "companyProfile" }]
        },
        {
          title: "业务范围",
          icon: "iconfont el-icon-shujufenxi",
          path: "/businessScope",
          lists: [{ name: "业务范围", path: "businessScope" }]
        },
        {
          title: "案例展示",
          icon: "iconfont el-icon-shujufenxi",
          path: "/caseShows",
          lists: [{ name: "案例展示", path: "caseShows" }]
        },
        {
          title: "联系我们",
          icon: "iconfont el-icon-shujufenxi",
          path: "/contactUs",
          lists: [{ name: "联系我们", path: "contactUs" }]
        },
        {
          title: "用户管理",
          icon: "el-icon-setting",
          path: "/userManage",
          lists: [
            { name: "用户管理", path: "userManage" }
          ]
        }
      ]
    };
  },
  methods: {
    // isShow(index) {
    //   return this.$route.name == "daskBoard" || this.num != index
    //     ? false
    //     : true;
    // },
    toggle(index) {
      this.num = index;
      sessionStorage.setItem("num", this.num);
    }
  },
  created() {
    if (this.num == null) {
      this.num = 0;
    } else {
      this.num = sessionStorage.getItem("num");
    }
  },
  watch: {
    // 路由监听  工作台点击的跳转   激活二级路由
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.query.activeNum) {
          this.num = this.$route.query.activeNum;
        }
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.first-warpper {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100px;
  height: 100%;
  background: #444;
  .logo {
    width: 40px;
    height: 40px;
    margin: 12px auto;
    img {
      width: 100%;
    }
  }
  .first-menu {
    position: relative;
    width: 100px;
    color: #fff;
    .first-list {
      margin-bottom: 14px;
      padding-left: 8px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      cursor: pointer;
      color: #cacaca;
    }
    .first-list:hover,
    .router-link-active {
      color: #333;
      background: #fff;
    }
  }
}

.second-warpper {
  position: fixed;
  left: 90px;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 110px;
  border-right: 1px solid #eee;
  background: #fff;
  h5 {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    letter-spacing: 2px;
  }
  .second-menu {
    padding: 14px 10px;
    .second-list {
      height: 36px;
      margin-bottom: 14px;
      padding: 0 10px;
      line-height: 36px;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
    }
    .router-link-active {
      background: #f2f2f2;
      color: #333;
    }
  }
}
</style>
