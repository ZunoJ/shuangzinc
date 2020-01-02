<template>
  <div class="home">
    <el-slider v-model="value1"></el-slider>
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
  }
};
</script>
