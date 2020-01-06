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
      value1: 50
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
  .nav {
    width: 240px;
  }
  .site-meta {
    padding: 30px 0;
    color: #fff;
    background: #222;
  }
  .el-menu-vertical {
    border: none;
  }
}
</style>
