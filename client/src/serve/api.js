import { post } from "./http";

export default {
  obtainCheckcode: p => post("/api/checkcode", p)
};
