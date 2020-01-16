<template>
  <div id="app">
    <vue-canvas-nest
      :config="{ color: '102, 95, 95', count: 100 }"
      :el="'#world'"
    ></vue-canvas-nest>
    <router-view />
  </div>
</template>

<script>
import vueCanvasNest from "vue-canvas-nest";
import { mapMutations } from "vuex";

export default {
  name: "",
  components: { vueCanvasNest },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("user", ["setuserinfo"])
  },
  created() {
    if (localStorage.getItem("userinfo")) {
      let userinfo = JSON.parse(localStorage.getItem("userinfo"));
      this.setuserinfo(userinfo);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#world {
  margin: 0;
  background-color: #f5f7f9;
  color: #555;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
