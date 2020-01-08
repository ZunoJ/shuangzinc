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
            <article>
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
            </article>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      value1: 50,
      squareUrl:
        "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png",
      chatVisibles: [],
      chatBody: ""
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
    }
  }
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
  .posts-expand {
    padding-top: 40px;
    .post-title {
      text-align: center;
      word-break: break-word;
      font-weight: 400;
      font-size: 22px;
    }
    .post-meta {
      margin: 3px 0 60px 0;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
    .post-body {
      text-align: justify;
      p {
        font-size: 14px;
        line-height: 28px;
      }
    }
    .post-button {
      margin-top: 40px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      cursor: pointer;
      padding: 0 20px;
      font-size: 14px;
      color: #555;
      background: #fff;
      border: 2px solid #555;
      text-decoration: none;
      border-radius: 2px;
      transition-property: background-color;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      line-height: 2;
      &:hover {
        color: #fff;
        background-color: #555;
      }
    }
    .post-footer {
      display: block;
      margin: 80px auto 60px;
      width: 8%;
      height: 1px;
      background: #ccc;
      text-align: center;
    }
    .post-typea {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #222;
      }
    }
  }
}
</style>
