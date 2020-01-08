<template>
  <div class="publish-box">
    <!-- 富文本 -->
    <div class="publish-box-wrap">
      <div class="publish-toolbar" id="publishToolbar">

        <div class='tooltip' title="撤销" :class="[toolStates.undo == 1 ? 'tool-bar-selected' : '', toolStates.undo == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-701bianjiqi_chexiao" @click="execCommand('undo')"></i>
        </div>

        <div class='tooltip' title="重做" :class="[toolStates.redo == 1 ? 'tool-bar-selected' : '', toolStates.redo == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-702bianjiqi_zhongzuo" @click="execCommand('redo')"></i>
        </div>

        <div class='tooltip' title="标题" :class="[toolStates.Paragraph == 1 ? 'tool-bar-selected' : '', toolStates.Paragraph == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-725bianjiqi_biaoti" @click="execCommand('Paragraph')"></i>
        </div>

        <div class='tooltip' title="加粗" :class="[toolStates.bold == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-bold" @click="execCommand('bold')"></i>
        </div>

        <div class='tooltip' title="斜体" :class="[toolStates.italic == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-italic" @click="execCommand('italic')"></i>
        </div>

        <div class='tooltip' title="下划线" :class="[toolStates.underline == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-underline" @click="execCommand('underline')"></i>
        </div>

        <div class='tooltip' title="字符边框" :class="[toolStates.fontborder == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-706bianjiqi_azifubiankuang" @click="execCommand('fontborder')"></i>
        </div>

        <div class='tooltip' title="删除线" :class="[toolStates.strikethrough == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-707bianjiqi_shanchuxian" @click="execCommand('strikethrough')"></i>
        </div>

        <div class='tooltip' title="下标" :class="[toolStates.subscript == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-709bianjiqi_xiabiao" @click="execCommand('subscript')"></i>
        </div>

        <div class='tooltip' title="上标" :class="[toolStates.superscript == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-708bianjiqi_shangbiao" @click="execCommand('superscript')"></i>
        </div>

        <div class='tooltip' title="局左对齐" :class="[toolStates.justifyleft == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-732bianjiqi_zuoduiqi" @click="execCommand('justify','left')"></i>
        </div>

        <div class='tooltip' title="居中对齐" :class="[toolStates.justifycenter == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-733bianjiqi_juzhongduiqi" @click="execCommand('justify','center')"></i>
        </div>

        <div class='tooltip' title="居右对齐" :class="[toolStates.justifyright == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-734bianjiqi_youduiqi" @click="execCommand('justify','right')"></i>
        </div>

        <div class='tooltip' title="两端对齐" :class="[toolStates.justifyjustify == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-735bianjiqi_liangduanduiqi" @click="execCommand('justify','justify')"></i>
        </div>

        <div class='tooltip' title="清除格式" :class="[toolStates.removeformat == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-710bianjiqi_qingchugeshi" @click="execCommand('removeformat','strong','color','width')"></i>
        </div>

        <div class='tooltip' title="格式刷" :class="[toolStates.formatmatch == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-711bianjiqi_geshishua" @click="execCommand('formatmatch')"></i>
        </div>

        <div class='tooltip' title="引用" :class="[toolStates.blockquote == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-713bianjiqi_yinyong" @click="execCommand('blockquote')"></i>
        </div>

        <div class='tooltip' title="纯文本粘贴" :class="[toolStates.pasteplain == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-714bianjiqi_chunwenbenniantie" @click="execCommand('pasteplain')"></i>
        </div>

        <!-- 颜色选择器 -->
        <el-color-picker title="字体颜色选择" v-model="fontColor" @change="execCommand('forecolor',fontColor)" size="small"></el-color-picker>

        <div class='tooltip' title="字体颜色" :class="[toolStates.forecolor == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-716bianjiqi_zitiyanse" @click="execCommand('forecolor',fontColor)"></i>
        </div>

        <div class='tooltip' title="清空" :class="[toolStates.cleardoc == 1 ? 'tool-bar-selected' : '', toolStates.bold == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-721bianjiqi_qingkongwendang" @click="execCommand('cleardoc')"></i>
        </div>

        <div class='tooltip' title="无序列表" :class="[toolStates.insertunorderedlist == 1 ? 'tool-bar-selected' : '', toolStates.insertunorderedlist == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-719bianjiqi_wuxuliebiao" @click="execCommand('insertunorderedlist')"></i>
        </div>

        <div class='tooltip' title="有序列表" :class="[toolStates.insertorderedlist == 1 ? 'tool-bar-selected' : '', toolStates.insertorderedlist == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-718bianjiqi_youxuliebiao" @click="execCommand('insertorderedlist','decimal')"></i>
        </div>

        <div class='tooltip' title="插入图片" :class="[toolStates.insertImage == 1 ? 'tool-bar-selected' : '', toolStates.insertImage == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-745bianjiqi_tupianshangchuan" @click="imgUpload"></i>
        </div>

        <div class='tooltip' title="插入视频" :class="[toolStates.insertvideo == 1 ? 'tool-bar-selected' : '', toolStates.insertvideo == -1 ? 'tool-bar-disabled' : '' ]">
          <i class="public-icon icon-748bianjiqi_shipin" @click="videoUpload"></i>
        </div>
      </div>
      <div ref="editor"></div>
    </div>

    <!-- 图片上传 -->
    <el-dialog title="上传图片" :visible.sync="dialogImageVisible" width="40%" v-model="dialogImageVisible">
      <div class="view-content">
        <div class="clearfix">
          <div class="view-list" v-for="(item, index) in filepath" :key="index">
            <span class="cancel-btn" @click="delImg(index)">x</span>
            <img :src="item">
          </div>
          <div class="addbox">
            <input type="file" @change="getImage" ref="fileImage">
            <div class="addbtn">+</div>
          </div>
        </div>
        <span class="tips">{{warnText}}</span>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="insertImages">确 定</el-button>
        <el-button @click="dialogImageVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 视频上传 -->
    <el-dialog title="上传视频" :visible.sync="dialogVideoVisible" width="40%" v-model="dialogVideoVisible">
      <div class="view-content">
        <div class="clearfix" v-loading="loading">
          <div class="view-list" v-for="(item, index) in videopath" :key="index">
            <span class="cancel-btn" @click="delVideo(index)">x</span>
            <video :src="item" width="100" height="100"></video>
          </div>
          <div class="addbox">
            <input type="file" @change="getVideo" ref="fileVideo">
            <div class="addbtn">+</div>
          </div>
        </div>
        <span class="tips">{{warnInfo}}</span>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="insertVideos">确 定</el-button>
        <el-button @click="dialogVideoVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import "../../static/neditor/neditor.config.js";
import "../../static/neditor/neditor.all.js";
import "../../static/neditor/i18n/zh-cn/zh-cn.js";
import "../assets/fonts/iconfont.css"; // 富文本编辑器的图标
// 手动引入codemirror.js ZeroClipboard.js--解决ZeroClipboard is not defined的问题
import "../../static/neditor/third-party/codemirror/codemirror.js";
import "../../static/neditor/third-party/zeroclipboard/ZeroClipboard.js";
export default {
  props: ["content"],
  data() {
    return {
      id: Math.random(10) + "ueditorId",
      // token: localStorage.getItem('api_token'),
      url: `${process.env.BASE_API}/backend/upload`,
      configs: {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": localStorage.getItem('Authorization') 
        }
      },
      filepath: [],
      videopath: [],
      fontColor: "#000", // 颜色设置
      warnText: "支持绝大多数图片格式，单张图片最大支持3MB",
      warnInfo: "暂时只支持Mp4格式的视频",
      loading: false,
      dialogImageVisible: false,
      dialogVideoVisible: false,
      publishModal: {
        content: this.content,
        images: [],
        videos: []
      },
      // 工具烂的状态
      toolStates: {
        bold: 0,
        italic: 0,
        underline: 0,
        fontborder: 0,
        strikethrough: 0,
        removeformat: 0,
        subscript: 0,
        blockquote: 0,
        superscript: 0,
        justifyleft: 0,
        justifycenter: 0,
        justifyright: 0,
        justifyjustify: 0,
        formatmatch: 0,
        pasteplain: 0,
        forecolor: 0,
        cleardoc: 0,
        Paragraph: 0,
        underline: 0,
        insertImage: 0,
        insertvideo: 0,
        insertunorderedlist: 0,
        insertorderedlist: 0,
        undo: 0,
        redo: 0,
        removeFormate: 0
      },
      // 编辑器的初始化
      config: {
        toolbars: [[]],
        initialFrameWidth: null,
        initialFrameHeight: 400
      }
    };
  },
  watch: {
    content: function (val, oldVal) {
      this.editor.setContent(val); 
    }
  },
  created() {
    // if (window.addEventListener) {
    //   window.addEventListener("scroll", self.toolbarScroll, false);
    // } else if (window.attachEvent) {
    //   window.attachEvent("onscroll", self.toolbarScroll);
    // } else {
    //   window["onscroll"] = self.toolbarScroll;
    // }
    this.$nextTick(() => {
      this.$refs.editor.id = this.id;
      this.editor = UE.getEditor(this.id, this.config);
      let timer = setInterval(() => {
        if (this.content) {
          this.editor.setContent(this.content);
          clearInterval(timer);
        }
      }, 200);
      this.editor.addListener("contentChange", () => {
        const wordCount = this.editor.getContentLength(true);
        this.publishModal.content = this.editor.getContent();
        const plainTxt = this.editor.getPlainTxt();
        this.$emit("getContent", this.editor.getContent());
      });
      this.editor.addListener("selectionchange", () => {
        const stateList = Object.keys(this.toolStates);
        let i = -1;
        while (i++ < stateList.length - 1) {
          this.toolStates[stateList[i]] = this.editor.queryCommandState(
            stateList[i]
          );
          if (stateList[i] === "Paragraph") {
            if (this.editor.queryCommandValue(stateList[i]) == "h2") {
              this.toolStates[stateList[i]] = 1;
            } else {
              this.toolStates[stateList[i]] = 0;
            }
          } else if (stateList[i] === "justifycenter") {
            if (this.toolStates[stateList[i]] == -1) {
              this.toolStates[stateList[i]] = 1;
            } else {
              this.toolStates[stateList[i]] = -1;
            }
          } else if (stateList[i] === "justifyright") {
            if (this.toolStates[stateList[i]] == -1) {
              this.toolStates[stateList[i]] = 1;
            } else {
              this.toolStates[stateList[i]] = -1;
            }
          } else if (stateList[i] === "justifyleft") {
            if (this.toolStates[stateList[i]] == -1) {
              this.toolStates[stateList[i]] = 1;
            } else {
              this.toolStates[stateList[i]] = 0;
            }
          } else if (stateList[i] === "justifyjustify") {
            if (this.toolStates[stateList[i]] == -1) {
              this.toolStates[stateList[i]] = 1;
            } else {
              this.toolStates[stateList[i]] = -1;
            }
          }
        }
      });
    });
  },
  methods: {
    // toolbarScroll() {
    //   let IO = document.getElementById("publishToolbar"),
    //     Y = IO,
    //     H = 0;
    //   if (IO) {
    //     while (Y) {
    //       H += Y.offsetTop;
    //       Y = Y.offsetParent;
    //     }
    //     const s = Math.max(
    //       document.documentElement.scrollTop,
    //       document.body.scrollTop
    //     );
    //     if (s > 230 && s < 780) {
    //       IO.style.cssText = "top:0px;position:fixed;";
    //     } else {
    //       IO.style.cssText = "";
    //     }
    //   }
    // },
    execCommand(name, state) {
      if (name == "Paragraph") {
        this.toolStates.Paragraph
          ? this.editor.execCommand("Paragraph", "p")
          : this.editor.execCommand("Paragraph", "h2");
      } else {
        this.editor.execCommand(name, state);
      }
    },
    // 图片上传展示
    imgUpload() {
      this.dialogImageVisible = true;
      this.filepath = []; //清除上次上传图片显示
    },
    // 显示图片
    getImage(e) {
      if (/jpeg|jpg|gif|png$/.test(e.target.files[0].type)) {
        this.warnText = "支持绝大多数图片格式，单张图片最大支持3MB";
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        console.log('999---',this.configs)
        axios.post(this.url, formData, this.configs).then(res => {
          // this.filepath.push(process.env.BASE_API + res.data.data.filepath);
          this.filepath.push(res.data.file_path);
        });
        this.$refs.fileImage.value = null;
      } else {
        this.warnText = "请选择正确的图片格式";
        this.$refs.fileImage.value = null;
      }
    },
    // 插入图片
    insertImages() {
      let imageHtml = "";
      for (let i in this.filepath) {
        imageHtml +=
          '<p><img src="' +
          this.filepath[i] +
          '" data-src="' +
          this.filepath[i] +
          '"></p>';
        this.publishModal.images.push(this.filepath[i]);
      }
      this.editor.execCommand("inserthtml", imageHtml);
      this.dialogImageVisible = false;
    },
    // 删除图片
    delImg(index) {
      this.filepath.splice(index, 1);
      this.warnText = "支持绝大多数图片格式，单张图片最大支持3MB";
    },
    // 视频上传展示
    videoUpload() {
      this.dialogVideoVisible = true;
      this.videopath = []; //清除上次上传视频显示
    },
    // 显示视频
    getVideo(e) {
      if (e.target.files[0].type == "video/mp4") {
        this.warnInfo = "视频上传较慢，请耐心等待";
        this.loading = true;
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios.post(this.url, formData, this.configs).then(res => {
          this.videopath.push(process.env.BASE_API + res.data.data.filepath);
          this.warnInfo = "视频上传完成";
          this.loading = false;
        });
        this.$refs.fileVideo.value = null;
      } else {
        this.warnInfo = "请选择正确的视频格式";
        this.$refs.fileVideo.value = null;
      }
    },
    // 插入视频
    insertVideos() {
      let videoHtml = "";
      for (let i in this.videopath) {
        videoHtml +=
          '<p><video width="100%" height="100%" src="' +
          this.videopath[i] +
          '" data-src="' +
          this.videopath[i] +
          '"></video></p>';
        this.publishModal.videos.push(this.videopath[i]);
      }
      this.editor.execCommand("inserthtml", videoHtml);
      this.dialogVideoVisible = false;
    },
    // 删除视频
    delVideo(index) {
      this.videopath.splice(index, 1);
      this.warnInfo = "暂时只支持Mp4格式的视频";
    }
  }
};
</script>
<style lang="scss">
/* 隐藏字数提示 */
.publish-box .edui-editor-toolbarbox,
.publish-box .edui-default .edui-editor,
.publish-box .edui-editor-bottomContainer {
  display: none;
}

/* 富文本 */
.publish-box {
  width: 80%;
  .publish-box-wrap {
    position: relative;
    border: 1px solid #e9e9e9;
  }
}
// 富文本按钮
.publish-toolbar {
  width: 100%;
  padding: 5px 20px;
  border-bottom: 1px solid #e9e9e9;
  background: #eee;
  .tooltip {
    display: inline-block;
    height: 30px;
  }
  .public-icon {
    display: inline-block;
    height: 30px;
    width: 36px;
    line-height: 30px;
    text-align: center;
    vertical-align: top;
    color: #999;
    /* 字体抗锯齿 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  // 选中的时的颜色
  .tool-bar-selected {
    height: 30px;
    background: rgba(255, 255, 255, 0.8);
  }
  // 禁用时的颜色
  .tool-bar-disabled .public-icon {
    color: #ccc;
  }
  // 颜色选择器
  .el-color-picker {
    position: relative;
    top: 7px;
  }
}

/* 上传 */
.el-dialog__wrapper .view-content {
  position: relative;
  width: 100%;
  min-height: 320px;
  max-height: 400px;
  padding: 15px;
  text-align: center;
  border: 2px dashed #b5b5b5;
  overflow: auto;
  .tips {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.view-list {
  position: relative;
  float: left;
  height: 100px;
  width: 100px;
  margin: 10px 10px 0 0;
  img {
    width: 100%;
    height: 100%;
  }
  .cancel-btn {
    position: absolute;
    right: -5px;
    top: -5px;
    z-index: 99999;
    display: block;
    width: 20px;
    height: 20px;
    color: #fff;
    line-height: 18px;
    text-align: center;
    background: #c40000;
    border-radius: 50%;
    cursor: pointer;
  }
}

.addbox {
  float: left;
  position: relative;
  height: 100px;
  width: 100px;
  margin-top: 10px;
  text-align: center;
  input {
    position: absolute;
    left: 0;
    height: 100px;
    width: 100px;
    opacity: 0;
  }
  .addbtn {
    float: left;
    height: 100px;
    width: 100px;
    line-height: 95px;
    color: #00b38a;
    font-size: 40px;
    background: #f2f2f2;
    border-radius: 10px;
  }
}
</style>