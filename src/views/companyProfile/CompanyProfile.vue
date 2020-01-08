<template>
  <div class="container">
    <h5>公司简介编辑：</h5>

    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="公司简介：">
        <el-col :span="20">
          <myeditor @getContent="fetchContent" :content="editorContent"></myeditor>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getIntroduction,
  postIntroduction
} from "../../api/apis";
import myeditor from "@/components/myeditor.vue";
export default {
  components: {
    myeditor
  },
  data() {
    return {
      editorContent: "",
      form: {
        content: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
      getIntroduction().then(res=>{
        if(res.status == 200){
          console.log(res)
          this.editorContent = res.data.content
        }
      })
    },
    // 富文本编辑器
    fetchContent(content) {
      this.form.content = content;
    },
    onSubmit() {
      this.$confirm("确定保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postIntroduction(this.form).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
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