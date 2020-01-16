<template>
  <div>
    <div class="el-form-item">
      <label class="el-form-item__label must" style="width:80px"
        >文章标题</label
      >
      <div class="el-form-item__content" style="margin-left:80px">
        <el-input v-model="articletitle"></el-input>
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label must" style="width:80px"
        >文章类型</label
      >
      <div
        class="el-form-item__content"
        style="margin-left:80px;text-align: left;"
      >
        <el-select v-model="articletype">
          <el-option label="文章" value="1"></el-option>
          <el-option label="杂谈" value="2"></el-option>
        </el-select>
      </div>
    </div>
    <div class="el-form-item">
      <label class="el-form-item__label must" style="width:80px"
        >文章简介</label
      >
      <div class="el-form-item__content" style="margin-left:80px">
        <el-input type="textarea" :rows="6" v-model="articleintro"></el-input>
      </div>
    </div>
    <p style="text-align: left;font-size: 14px;" class="must">文章内容：</p>
    <div id="wangeditor">
      <div ref="editorElem" style="text-align:left;"></div>
    </div>
    <el-button
      type="primary"
      style="margin-top:20px"
      @click="publisharticle"
      size="mini"
      >发 布</el-button
    >
  </div>
</template>

<script>
import E from "wangeditor";
import httpserve from "../serve/api";
import * as moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "publisharticle",
  data() {
    return {
      editor: null,
      editorContent: "",
      articletype: "",
      articletitle: "",
      articleintro: "",
      articlecontent: ""
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData"], // 接收父组件的方法
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  methods: {
    publisharticle() {
      if (
        this.articletype === "" ||
        this.articletitle === "" ||
        this.articleintro === "" ||
        this.articlecontent === ""
      ) {
        this.$message.error("请完整填写内容！");
      } else {
        let params = {
          articletype: this.articletype,
          articletitle: this.articletitle,
          articleintro: this.articleintro,
          articlecontent: this.articlecontent,
          articletime: moment(new Date()).format("YYYY-MM-DD"),
          useraccount: this.userInfo.useraccount
        };
        httpserve.publishArticles(params).then(res => {
          if (res.flag === "S") {
            this.$message.success("发布成功!");
          }
        });
      }
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      if (this.editorContent !== "<p><br></p>") {
        this.articlecontent = this.editorContent;
      } else {
        this.articlecontent = "";
      }
      this.$emit("catchData", this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code" // 插入代码
      //"undo",  撤销
      //"redo"  重复
    ];
    this.editor.create(); // 创建富文本实例
  }
};
</script>

<style lang="scss" scoped>
.must::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
