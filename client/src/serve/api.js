import { post } from "./http";

export default {
  obtainCheckcode: p => post("/api/checkcode", p), // 获取验证码
  registeredMember: p => post("/api/registeredMember", p), // 用户注册
  loginSystem: p => post("/api/loginSystem", p) // 用户登录
};
