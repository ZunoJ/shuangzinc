export default {
  namespaced: true,
  state: {
    userinfo: {
      useraccount: "",
      username: "",
      userhead: "",
      usertoken: "",
      articles: "",
      essays: "",
      tags: ""
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
