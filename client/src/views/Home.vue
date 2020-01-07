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
      <div class="content-wrap"></div>
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
        "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
}
</style>
