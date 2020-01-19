<template>
  <div></div>
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
