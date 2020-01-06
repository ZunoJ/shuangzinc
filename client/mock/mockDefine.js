const mockList = require("./data/list.json");
module.exports.init = function(app) {
  app.post("/mms/v2/manager/coupon/index.do", (req, res) => {
    res.json(mockList);
  });
};
