import { post } from "./http";

export default {
  obtainCheckcode: p => post("/api/checkcode", p), // 获取验证码
  registeredMember: p => post("/api/registeredMember", p), // 用户注册
  loginSystem: p => post("/api/loginSystem", p), // 用户登录
  publishArticles: p => post("/api/publishArticles", p), // 发布文章
  queryArticles: p => post("/api/queryArticles", p), // 查询文章
  publishComments: p => post("/api/publishComments", p), // 发布评论
  queryComments: p => post("/api/queryComments", p), // 查询评论
  addBooks: p => post("/api/addBooks", p), // 添加书籍
  queryBooks: p => post("/api/queryBooks", p) // 查询书籍
};
