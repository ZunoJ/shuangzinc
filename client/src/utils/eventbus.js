let eventbus = {};

eventbus.install = function(Vue, options) {
  console.log(options);
  Vue.prototype.$eventBus = new Vue();
};

export default eventbus;
