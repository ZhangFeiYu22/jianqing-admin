<template>
  <div class="container">
    <h5>公司简介编辑：</h5>
     <myeditor @getContent="fetchContent" :content="companyContent"></myeditor>
  </div>
</template>

<script>
import myeditor from "@/components/myeditor.vue";
export default {
  components: {
      myeditor
    },
  data() {
    return {
     companyContent: ''
    };
  },
  created() {
  },
  methods: {
    // 富文本编辑器
      fetchContent(content) {
        this.companyContent = content;
      },
  }
};
</script>

<style lang="less" scoped>
.container {
  h5 {
    height: 50px;
    line-height: 50px;
  }
}
</style>