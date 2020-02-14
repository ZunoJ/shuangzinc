<template>
  <div>
    <div style="height: 620px;display: flex;">
      <div style="margin: auto;">
        <i class="el-icon-edit" style="font-size:50px;"></i>
        <p>还没有填写经历，可以通知小明填写哦~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "selfResume",
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
