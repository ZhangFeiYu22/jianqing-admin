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
      <el-table-column prop="time" label="创建时间"></el-table-column>
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
            <div class="imgBox">
              <img src="../../assets/images/login.jpg" alt />
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
          <myeditor @getContent="fetchContent" :content="articleList.content"></myeditor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myeditor from "@/components/myeditor.vue";
import imgUpload from "../../utils/common";
import { getArticleList } from "../../api/apis";
export default {
  components: {
    myeditor
  },
  data() {
    return {
      articleList: [
        {
          title: "王小虎",
          time: "2019-12-12",
          content: ""
        }
      ],
      dialogFormVisible: false,
      imgOneList: [],
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
        console.log(res);
      });
    },
    addArticle() {
      this.dialogFormVisible = true;
    },
    editArticle(row) {
      this.dialogFormVisible = true;
      console.log(row);
    },
    delArticle() {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
      this.articleList.content = content;
    },
    addImg(e) {
      // 通过DOM取文件数据
      console.log(event);
      imgUpload.getPicData(e.target.files[0], this.imgOneList);
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
