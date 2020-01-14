<template>
  <div class="home">
    <div class="content">
      <div class="nav">
        <div class="site-meta">
          <span>DOUBLE's Blog</span>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
        <div class="sidebar-inner">
          <el-avatar shape="square" :src="squareUrl"></el-avatar>
          <p class="site-author-name">double</p>
          <p class="site-login">
            <a class="site-login-a" @click="showLogin('regist')">注册</a>
            <a class="site-login-a" @click="showLogin('login')">登录</a>
          </p>
          <nav class="site-nav">
            <div class="site-state-item">
              <span>10</span>
              <p>posts</p>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="site-state-item">
              <span>10</span>
              <p>categories</p>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="site-state-item">
              <span>10</span>
              <p>tags</p>
            </div>
            <div class="links-of-author-item">
              <a>
                <svg-icon icon-class="github" class-name="svg-style"></svg-icon>
                Github
              </a>
              <a>
                <svg-icon icon-class="man" class-name="svg-style"></svg-icon>
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
        </div>
      </div>
      <div class="content-wrap">
        <div>
          <section class="posts-expand">
            <!-- <article>
              <div>
                <header>
                  <h1 class="post-title">写给聪明人</h1>
                  <div class="post-meta">
                    <span>
                      <i class="el-icon-date"></i>
                      Posted on 2019-01-12
                    </span>
                    <el-divider direction="vertical"></el-divider>
                    <span>
                      <i class="el-icon-folder"></i>
                      In
                      <a class="post-typea">Article</a>
                    </span>
                    <el-divider direction="vertical"></el-divider>
                    <span>
                      <el-popover
                        placement="bottom"
                        width="160"
                        v-model="chatVisibles[index]"
                      >
                        <el-input type="textarea" :rows="3" v-model="chatBody">
                        </el-input>
                        <div
                          style="text-align: center; margin: 0; margin-top: 10px;"
                        >
                          <el-button
                            size="mini"
                            type="text"
                            @click="chatVisibles[index] = false"
                            >取消</el-button
                          >
                          <el-button
                            type="primary"
                            size="mini"
                            @click="makeComment(index)"
                            >评论</el-button
                          >
                        </div>
                        <i
                          class="el-icon-chat-square"
                          slot="reference"
                          style="cursor:pointer;"
                        ></i>
                      </el-popover>
                    </span>
                  </div>
                </header>
                <div class="post-body">
                  <p>
                    从武汉，到北京，再到广州，然后是英国，一路上说难不难，说容易也不容易。我的原生家庭不太能给我提供太多帮助，于是每到一个新地方，一切都得靠自己打拼，很多东西需要自己摸索。现在慢慢静下来，就想写一篇经验性的文章，给后辈里的聪明人看。因为我想，如果你是聪明人，一定能懂得这篇文章里的含义。
                  </p>
                  <div class="post-button">
                    <a class="btn">
                      Read more »
                    </a>
                  </div>
                </div>
                <footer>
                  <div class="post-footer"></div>
                </footer>
              </div>
            </article> -->
          </section>
        </div>
      </div>
    </div>
    <el-dialog
      title="登录"
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
        <el-form-item label="确认密码" prop="reuserpwd">
          <el-input
            v-model="loginForm.reuserpwd"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="userhead">
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
        <el-form-item label="用户标签" prop="tagList">
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
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false">取 消</el-button>
        <el-button type="primary" @click="registeredMember">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpServe from "../serve/api";
import { uploadImgToBase64 } from "../utils";

export default {
  name: "home",
  components: {},
  data() {
    return {
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
      checkCodeImg: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
      console.log(type);
      this.obtainCheckcode();
      this.loginVisible = true;
    },
    registeredMember() {
      const params = {
        useraccount: this.loginForm.useraccount,
        userpwd: this.loginForm.userpwd,
        reuserpwd: this.loginForm.reuserpwd,
        username: this.loginForm.username,
        usertags: this.loginForm.tagList.join(","),
        userhead: this.loginForm.userhead,
        checktoken: this.loginForm.checktoken,
        checkcode: this.loginForm.checkcode
      };
      console.log(params);
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          if (this.loginForm.userpwd !== this.loginForm.reuserpwd) {
            this.$message.error("两次输入密码不一致！");
            return;
          }
          httpServe.registeredMember(params).then(res => {
            if (res.flag === "S") {
              this.$message.error("注册成功!");
            } else {
              this.$message.error("注册失败!");
            }
          });
        } else {
          console.log("error submit!!");
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
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
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
</style>
