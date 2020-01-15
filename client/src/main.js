import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "../element-variables.scss";
import "@/icons/index.js";

Vue.config.productionTip = false;

Vue.use(ElementUI);

// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   next();
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
