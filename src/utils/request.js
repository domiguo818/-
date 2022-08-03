// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getTokenTime } from "./auth";
import router from "@/router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}); // 创建一个axios的实例
// token过期处理超时封装
const isTimeout = () => {
  const currentTime = Date.now();
  const tokenTime = getTokenTime();
  const tomeout = 2 * 60 * 6 * 1000;
  return currentTime - tokenTime > tomeout;
};
service.interceptors.request.use(async (config) => {
  // console.log(config);
  if (store.state.user.token) {
    if (isTimeout()) {
      // console.log("跳到登录页");
      await store.dispatch("user/logout");
      router.push("/login");
      return Promise.reject(new Error("登陆过期"));
    } else {
      config.headers.Authorization = "Bearer " + store.state.user.token;
    }
    // console.log(store.state.user.token);
  }
  return config;
}); // 请求拦截器
service.interceptors.response.use(
  (res) => {
    const { data, success, message } = res.data;
    if (success) {
      return data;
    }
    Message.error(message);
    return Promise.reject(new Error(message));
  },
  async (error) => {
    if (error?.response?.status === 401) {
      Message.error("登录过期");
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default service; // 导出axios实例
