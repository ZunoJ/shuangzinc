let mock = require("./mock/index.js");

module.exports = {
  devServer: {
    port: 8080,
    proxy: "http://localhost"
    // before(app){
    //     mock.init(app);
    // }
  }
};
