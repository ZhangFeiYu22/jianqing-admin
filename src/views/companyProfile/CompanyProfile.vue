<template>
  <div class="container">
    <h5>公司简介编辑：</h5>
    
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="公司简介：">
        <el-col :span="20">
          <myeditor @getContent="fetchContent" :content="companyContent"></myeditor>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
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
      companyContent: ""
    };
  },
  created() {},
  methods: {
    // 富文本编辑器
    fetchContent(content) {
      this.companyContent = content;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  h5 {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    font-size: 18px;
  }
}
</style>