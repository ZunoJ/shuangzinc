let eventbus = {};

eventbus.install = function(Vue) {
  Vue.prototype.$eventBus = new Vue();
};

export default eventbus;
