<template>
  <div class="box" ref="roll">
    <el-scrollbar>
      <div class="home">
        <div class="content">
          <div class="nav">
            <transition appear appear-to-class="animated fadeInDown">
              <div>
                <div class="site-meta">
                  <span>DOUBLE's Blog</span>
                </div>
                <el-menu default-active="1" class="el-menu-vertical">
                  <el-menu-item index="1" @click="menuOpen('1')">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">我的文章</span>
                  </el-menu-item>
                  <el-menu-item index="2" @click="menuOpen('2')">
                    <i class="el-icon-magic-stick"></i>
                    <span slot="title">我的杂谈</span>
                  </el-menu-item>
                  <el-menu-item index="3" @click="menuOpen('3')">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">我的书屋</span>
                  </el-menu-item>
                  <el-menu-item index="4" @click="menuOpen('4')">
                    <i class="el-icon-time"></i>
                    <span slot="title">我的经历</span>
                  </el-menu-item>
                </el-menu>
              </div>
            </transition>
            <transition appear appear-to-class="animated fadeInDown">
              <div class="sidebar-inner sticky">
                <el-avatar shape="square" :src="squareUrl"></el-avatar>
                <p class="site-author-name">{{ username }}</p>
                <p class="site-login" v-if="!isLogin">
                  <a class="site-login-a" @click="showLogin('regist')">注册</a>
                  <a class="site-login-a" @click="showLogin('login')">登录</a>
                </p>
                <nav class="site-nav">
                  <div v-if="isLogin">
                    <div class="site-state-item" @click="menuOpen('1')">
                      <span>{{ articles }}</span>
                      <p>articles</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="site-state-item" @click="menuOpen('2')">
                      <span>{{ essays }}</span>
                      <p>essays</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="site-state-item" @click="tagOpen()">
                      <span>{{ tags }}</span>
                      <p>tags</p>
                    </div>
                  </div>
                  <div class="links-of-author-item">
                    <a href="https://github.com/ZunoJ" target="_blank">
                      <svg-icon
                        icon-class="github"
                        class-name="svg-style"
                      ></svg-icon>
                      Github
                    </a>
                    <a>
                      <svg-icon
                        icon-class="man"
                        class-name="svg-style"
                      ></svg-icon>
                      Medium
                    </a>
                    <a>
                      <svg-icon
                        icon-class="zhihu"
                        class-name="zhihu-style"
                      ></svg-icon>
                      Zhihu
                    </a>
                    <a>
                      <svg-icon
                        icon-class="email"
                        class-name="zhihu-style"
                      ></svg-icon>
                      E-Mail
                    </a>
                  </div>
                </nav>
                <a
                  style="font-size: 12px;margin: 5px 0;display: block;width: 100%;"
                  rel="nofollow"
                  href="http://www.beian.miit.gov.cn"
                  target="_blank"
                >
                  湘ICP备20002676号-1
                </a>
                <p style="font-size: 12px;margin-top:5px;margin-bottom:0;">
                  ©2020 DOUBLE·Powered by Zinc
                </p>
              </div>
            </transition>
          </div>
          <div class="content-wrap">
            <div>
              <richEditor
                @catchData="receivingHtml"
                v-if="pagetType === '5'"
              ></richEditor>
              <selfArticle
                :articletype.sync="pagetType"
                @offline="isLogin = false"
                v-if="pagetType === '1' || pagetType === '2'"
              ></selfArticle>
              <bookHome v-if="pagetType === '3'"></bookHome>
              <selfResume v-if="pagetType === '4'"></selfResume>
            </div>
          </div>
        </div>
        <div
          class="el-backtop"
          style="bottom: 100px;right: 40px;border-radius: 0;font-size: 12px;font-weight: 800;"
          @click="pagetType = '5'"
          v-if="isLogin"
        >
          发文
        </div>
        <div
          class="el-backtop"
          style="bottom: 40px;right: 40px;"
          v-if="btnFlag"
          @click="backTop"
        >
          <i class="el-icon-caret-top"></i>
        </div>
        <el-dialog
          :title="loginType === 'regist' ? '注册' : '登录'"
          :visible.sync="loginVisible"
          width="450px"
          center
          @closed="resetLogin"
        >
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            label-width="80px"
            size="mini"
          >
            <el-form-item label="账号" prop="useraccount">
              <el-input
                v-model="loginForm.useraccount"
                placeholder="请输入账号"
                minlength="5"
                maxlength="10"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userpwd">
              <el-input
                v-model="loginForm.userpwd"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="reuserpwd"
              v-if="loginType === 'regist'"
            >
              <el-input
                v-model="loginForm.reuserpwd"
                placeholder="请再次输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户昵称"
              prop="username"
              v-if="loginType === 'regist'"
            >
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户昵称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户头像"
              prop="userhead"
              v-if="loginType === 'regist'"
            >
              <el-upload
                class="avatar-uploader"
                action="/api/headupload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="handleAvatarChange"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="loginForm.userhead"
                  :src="loginForm.userhead"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item
              label="用户标签"
              prop="tagList"
              v-if="loginType === 'regist'"
            >
              <el-input
                v-model="loginForm.usertags"
                placeholder="请添加标签"
                style="width:79%;margin-right:10px"
                maxlength="6"
                show-word-limit
              ></el-input>
              <el-button
                type="primary"
                @click="addTag"
                :disabled="loginForm.tagList.length >= 5"
                >添加</el-button
              >
              <el-tag
                v-for="item in loginForm.tagList"
                :key="item"
                effect="dark"
                size="mini"
                style="margin-left:5px"
                closable
                @close="deleteTag(item)"
              >
                {{ item }}
              </el-tag>
            </el-form-item>
            <el-form-item label="验证码" prop="checkcode">
              <el-input
                v-model="loginForm.checkcode"
                placeholder="请输入验证码"
                style="width:74%;margin-right:11px"
              ></el-input>
              <img
                style="height: 28px;position: absolute;cursor:pointer;"
                :src="checkCodeImg"
                @click="obtainCheckcode"
              />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="loginVisible = false" size="mini"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="registeredMember"
              v-if="loginType === 'regist'"
              size="mini"
              >确 定</el-button
            >
            <el-button
              type="primary"
              @click="loginSystem"
              v-if="loginType === 'login'"
              size="mini"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import httpServe from "../serve/api";
import { uploadImgToBase64 } from "../utils";
import { mapMutations, mapGetters } from "vuex";
import richEditor from "../components/publishArticle";
import selfArticle from "../components/selfArticle";
import bookHome from "../components/bookHome";
import selfResume from "../components/selfResume";
import md5 from "js-md5";

export default {
  name: "home",
  components: { richEditor, selfArticle, bookHome, selfResume },
  data() {
    return {
      isLogin: false,
      pagetType: "1", // 发文 5 看文 1 杂谈 2 书屋 3 经历 4
      btnFlag: false,
      loginType: "",
      loginRules: {
        useraccount: [
          {
            required: true,
            message: "请输入用户账户",
            trigger: "blur"
          }
        ],
        userpwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        reuserpwd: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户昵称", trigger: "blur" }
        ],
        userhead: [{ required: true, message: "请上传头像", trigger: "blur" }],
        tagList: [
          { required: true, message: "请添加用户标签", trigger: "change" }
        ],
        checkcode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      value1: 50,
      squareUrl:
        "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
      username: "",
      chatVisibles: [],
      chatBody: "",
      loginVisible: false,
      loginForm: {
        useraccount: "",
        userpwd: "",
        reuserpwd: "",
        username: "",
        usertags: "",
        userhead: "",
        checktoken: "",
        checkcode: "",
        tagList: []
      },
      checkCodeImg: "",
      rollBox: {},
      essays: "",
      articles: "",
      tags: ""
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  methods: {
    ...mapMutations("user", ["setuserinfo"]),
    menuOpen(index) {
      this.pagetType = index;
    },
    makeComment(index) {
      this.$set(this.chatVisibles, index, false);
    },
    handleAvatarChange(file) {
      uploadImgToBase64(file.raw).then(res => {
        this.loginForm.userhead = res;
      });
    },
    addTag() {
      if (
        this.loginForm.usertags !== "" &&
        this.loginForm.tagList.length <= 5
      ) {
        this.loginForm.tagList.push(this.loginForm.usertags);
        this.loginForm.usertags = "";
      }
    },
    deleteTag(item) {
      this.loginForm.tagList = this.loginForm.tagList.filter(res => {
        return res !== item;
      });
    },
    handleAvatarSuccess(res, file) {
      this.loginForm.userhead = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    obtainCheckcode() {
      httpServe.obtainCheckcode({}).then(res => {
        if (res.flag === "S") {
          this.checkCodeImg = res.data.img;
          this.loginForm.checktoken = res.data.checktoken;
        }
      });
    },
    showLogin(type) {
      this.loginType = type;
      this.obtainCheckcode();
      this.loginVisible = true;
    },
    loginSystem() {
      const params = {
        useraccount: this.loginForm.useraccount,
        userpwd: md5(this.loginForm.userpwd),
        checktoken: this.loginForm.checktoken,
        checkcode: this.loginForm.checkcode
      };
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          httpServe.loginSystem(params).then(res => {
            if (res.flag === "S") {
              this.$message.success("登录成功!");
              this.setuserinfo({
                useraccount: res.data.useraccount,
                username: res.data.username,
                userhead: res.data.userhead,
                usertoken: res.data.usertoken,
                usertags: res.data.usertags,
                essays: res.data.essays,
                articles: res.data.articles,
                tags: res.data.usertags.split(",").length
              });
              localStorage.setItem(
                "userinfo",
                JSON.stringify({
                  useraccount: res.data.useraccount,
                  username: res.data.username,
                  userhead: res.data.userhead,
                  usertoken: res.data.usertoken,
                  usertags: res.data.usertags,
                  essays: res.data.essays,
                  articles: res.data.articles,
                  tags: res.data.usertags.split(",").length
                })
              );
              this.isLogin = true;
              this.squareUrl = this.userInfo.userhead;
              this.username = this.userInfo.username;
              this.tags = this.userInfo.tags;
              this.articles = this.userInfo.articles;
              this.essays = this.userInfo.essays;
              this.loginVisible = false;
            } else {
              this.$message.error("登录失败!");
            }
          });
        } else {
          return false;
        }
      });
    },
    registeredMember() {
      const params = {
        useraccount: this.loginForm.useraccount,
        userpwd: md5(this.loginForm.userpwd),
        reuserpwd: md5(this.loginForm.reuserpwd),
        username: this.loginForm.username,
        usertags: this.loginForm.tagList.join(","),
        userhead: this.loginForm.userhead,
        checktoken: this.loginForm.checktoken,
        checkcode: this.loginForm.checkcode
      };
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          if (this.loginForm.userpwd !== this.loginForm.reuserpwd) {
            this.$message.error("两次输入密码不一致！");
            return;
          }
          httpServe.registeredMember(params).then(res => {
            if (res.flag === "S") {
              this.$message.success("注册成功!");
              this.setuserinfo({
                useraccount: res.data.useraccount,
                username: res.data.username,
                userhead: res.data.userhead,
                usertoken: res.data.usertoken,
                usertags: res.data.usertags,
                essays: "0",
                articles: "0",
                tags: res.data.usertags.split(",").length
              });
              localStorage.setItem(
                "userinfo",
                JSON.stringify({
                  useraccount: res.data.useraccount,
                  username: res.data.username,
                  userhead: res.data.userhead,
                  usertoken: res.data.usertoken,
                  usertags: res.data.usertags,
                  essays: "0",
                  articles: "0",
                  tags: res.data.usertags.split(",").length
                })
              );
              this.isLogin = true;
              this.squareUrl = this.userInfo.userhead;
              this.username = this.userInfo.username;
              this.tags = this.userInfo.tags;
              this.articles = this.userInfo.articles;
              this.essays = this.userInfo.essays;
              this.loginVisible = false;
            } else {
              this.$message.error("注册失败!");
            }
          });
        } else {
          return false;
        }
      });
    },
    resetLogin() {
      this.loginForm = {
        useraccount: "",
        userpwd: "",
        reuserpwd: "",
        username: "",
        usertags: "",
        userhead: "",
        checktoken: "",
        checkcode: "",
        tagList: []
      };
      this.checkCodeImg = "";
      this.$refs["loginForm"].resetFields();
    },
    receivingHtml() {},
    tagOpen() {
      let tags = this.userInfo.usertags;
      this.$message({
        showClose: true,
        message: tags
      });
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.getElementsByClassName(
          "el-scrollbar__wrap"
        )[0].scrollTop = document.getElementsByClassName(
          "el-scrollbar__wrap"
        )[0].scrollTop = that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        document.getElementsByClassName("el-scrollbar__wrap")[0].pageYOffset ||
        document.getElementsByClassName("el-scrollbar__wrap")[0].scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  },
  watch: {
    userInfo(newValue) {
      if (newValue.useraccount !== "") {
        this.isLogin = true;
        this.squareUrl = newValue.userhead;
        this.username = newValue.username;
      } else {
        this.isLogin = false;
        this.squareUrl = "";
        this.username = "";
        this.usertags = "";
        this.tags = "";
        this.articles = "";
        this.essays = "";
      }
    }
  },
  created() {
    if (this.userInfo.useraccount !== "") {
      this.isLogin = true;
      this.squareUrl = this.userInfo.userhead;
      this.username = this.userInfo.username;
      this.usertags = this.userInfo.usertags;
      this.tags = this.userInfo.tags;
      this.articles = this.userInfo.articles;
      this.essays = this.userInfo.essays;
    }
  },
  destroyed() {
    document
      .getElementsByClassName("el-scrollbar__wrap")[0]
      .removeEventListener("scroll", this.scrollToTop);
  },
  mounted() {
    document
      .getElementsByClassName("el-scrollbar__wrap")[0]
      .addEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
}
.home {
  display: flex;
}

/deep/ .el-scrollbar {
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow-y: scroll;
  overflow-x: auto !important;
  width: 110%;
  height: 100%;
}
.content {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  .nav {
    width: 240px;
    display: inline-block;
    margin-right: 30px;
  }
  .site-meta {
    padding: 30px 0;
    color: #fff;
    background: #222;
    font-weight: 600;
  }
  .sidebar-inner {
    box-sizing: border-box;
    width: 240px;
    background: #fff;
    margin-top: 14px;
    padding: 20px 10px;
    .links-of-author-item {
      margin-top: 20px;
    }
    a {
      display: inline-block;
      text-decoration: none;
      cursor: pointer;
      width: 50%;
      color: #555;
      border-radius: 3px;
      font-size: 13px;
      margin-bottom: 5px;
      text-align: center;
      &:hover {
        background-color: rgba(241, 239, 239, 0.5);
      }
    }
  }
  .site-nav {
    margin-top: 20px;
    .site-state-item {
      display: inline-block;
      cursor: pointer;
    }
    span {
      color: rgb(85, 85, 85);
      font-weight: 600;
      font-size: 16px;
    }
    p {
      margin: 5px 0;
      font-size: 13px;
      color: #999;
    }
    .el-divider--vertical {
      height: 2.5em;
      position: relative;
      bottom: 0.7em;
    }
  }
  .site-author-name {
    margin: 0;
    margin-top: 5px;
    text-align: center;
    color: #222;
    font-weight: 600;
  }
  .el-menu-vertical {
    border: none;
  }
  .svg-style {
    width: 1.2em;
    height: 1.2em;
  }
  .zhihu-style {
    width: 1.2em;
    height: 1.2em;
    margin-right: 2px;
  }
  .content-wrap {
    display: inline-block;
    box-sizing: border-box;
    padding: 40px;
    width: 700px;
    background: #fff;
    min-height: 700px;
    box-shadow: initial;
    border-radius: initial;
  }
  .site-login {
    border-top: 1px dotted #ccc;
    border-bottom: 1px dotted #ccc;
    .site-login-a {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px !important;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>
