export default {
  namespaced: true,
  state: {
    userinfo: {
      useraccount: "",
      username: "",
      userhead: "",
      usertoken: ""
    }
  },
  getters: {
    userInfo: state => {
      return state.userinfo;
    }
  },
  mutations: {
    setuserinfo(state, userinfo) {
      state.userinfo = Object.assign(state.userinfo, userinfo);
    }
  },
  actions: {}
};
