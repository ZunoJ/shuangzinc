<template>
  <div>
    <div style="height: 620px;display: flex;">
      <div style="margin: auto;">
        <i class="el-icon-edit" style="font-size:50px;"></i>
        <p>还没有上传书籍，可以通知管理员上传哦~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "bookHome",
  data() {
    return {};
  },
  props: [], // 接收父组件的方法
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
