import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: "/", // 基础路径
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 比如添加token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 如果相应成功，将直接返回data，否者直接通过promise.reject抛出错误让调用者通过try catch捕获
    // if (response.data?.code == 200) {
    if (response.status == 200) {
      return response.data;
    } else {
      return Promise.reject(response.data.message || "请求失败");
    }
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
