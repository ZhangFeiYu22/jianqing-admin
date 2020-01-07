<template>
  <div class="container">
    <el-row :gutter="20" class="btnBox">
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addArticle">添加</el-button>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-table border :data="articleList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="180"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editArticle(scope.row)" type="primary" plain size="small">编辑</el-button>
          <el-button @click="delArticle(scope.row)" type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加文章" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="articleForm">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="articleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章头图" :label-width="formLabelWidth">
          <div>
            <div class="imgBox" v-if="headImg.length!==0">
              <img :src="this.headImg[0]" alt />
            </div>
            <div class="imgBoxList">
              <div class="plus">
                <p>+</p>
                <input @change="addImg" type="file" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <myeditor @getContent="fetchContent" :content="editorContent"></myeditor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveArticle" v-if="post_put == 'post'">添加保存</el-button>
        <el-button type="primary" @click="putArticle(putId)" v-else>修改保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myeditor from "@/components/myeditor.vue";
import {
  getArticleList,
  saveArticle,
  putArticle,
  delArticle
} from "../../api/apis";
import imgUpload from "../../utils/common";
export default {
  components: {
    myeditor
  },
  data() {
    return {
      articleList: [],
      dialogFormVisible: false,
      headImg: [],
      post_put: "post",
      putId: "", //修改ID
      editorContent: "",
      articleForm: {
        title: "",
        file_path: "",
        content: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchArticleList();
  },
  methods: {
    fetchArticleList() {
      getArticleList().then(res => {
        if (res.status == 200) {
          this.articleList = res.data.data;
        }
      });
    },
    addArticle() {
      this.dialogFormVisible = true;
      this.articleForm = {};
      this.headImg = [];
      this.post_put = "post";
      this.editorContent = "  ";
    },
    editArticle(row) {
      this.dialogFormVisible = true;
      this.post_put = "put";
      this.putId = row.id;
      this.articleForm.title = row.title;
      // this.articleForm.file_path = row.file_path,
      this.headImg.splice(0, 1, row.file_path);
      this.articleForm.content = row.content;
      this.editorContent = row.content;
    },
    delArticle(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delArticle(row.id).then(res => {
            console.log(res);
            if (res.status == 200) {
              this.fetchArticleList();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 富文本编辑器
    fetchContent(content) {
      this.articleForm.content = content;
    },
    addImg(e) {
      imgUpload.getPicData(e.target.files[0], this.headImg);
    },
    saveArticle() {
      this.articleForm.file_path = this.headImg[0];
      this.$confirm("确定添加保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          saveArticle(this.articleForm).then(res => {
            if (res.status == 200) {
              this.dialogFormVisible = false;
              this.fetchArticleList();
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
    },
    putArticle() {
      this.articleForm.file_path = this.headImg[0];
      console.log(this.articleForm);
      this.$confirm("确定修改保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          putArticle(this.articleForm, this.putId).then(res => {
            if (res.status == 200) {
              this.dialogFormVisible = false;
              this.fetchArticleList();
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
.btnBox {
  margin: 0 0 20px 0;
}
.businessImg {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  img {
    width: 100%;
    height: 100%;
  }
  .plus {
    width: 100px;
    height: 100px;
    position: relative;
    p {
      font-size: 30px;
      height: 98px;
      line-height: 98px;
      width: 98px;
      text-align: center;
      color: #999;
      position: absolute;
    }
    input {
      width: 100px;
      height: 100px;
      position: absolute;
      opacity: 0;
    }
  }
}
.imgBox {
  margin-right: 10px;
  width: 100px;
  height: 100px;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
}

.imgBoxList {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
  .plus {
    width: 100px;
    height: 100px;
    position: relative;
    p {
      font-size: 30px;
      height: 98px;
      line-height: 98px;
      width: 98px;
      text-align: center;
      color: #999;
      position: absolute;
    }
    input {
      width: 100px;
      height: 100px;
      position: absolute;
      opacity: 0;
    }
  }
}
</style>
