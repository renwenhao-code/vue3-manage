// import Mock from "mockjs";

import MockAdapter from "axios-mock-adapter"; //引入axios-mock-adapter
import request from "@/utils/request"; //引入axios
const Mock = new MockAdapter(request); //创建MockAdapter实例，传入axios实例

import { tokens, users } from "./user";

import type { UserInfo, LoginResponse } from "@/type";

import brands from "./brands";

console.log("mock品牌数据", brands);

Mock.onPost("/user/login").reply((config) => {
  const { name, password } = JSON.parse(config.data);
  if (tokens.has(name) && users.get(tokens.get(name)).password === password) {
    return [
      200,
      {
        code: 200,
        message: "登录成功",
        data: {
          token: tokens.get(name),
          userInfo: users.get(tokens.get(name)),
        },
      },
    ];
  } else {
    return [
      400,
      {
        code: 400,
        message: "用户名或密码错误",
      },
    ];
  }
});

Mock.onGet("/user/info").reply((config) => {
  const token = config.headers?.Authorization;
  console.log("mock用户信息");
  if (users.has(token)) {
    return [
      200,
      {
        code: 200,
        message: "获取用户信息成功",
        data: users.get(token),
      },
    ];
  } else {
    return [
      400,
      {
        code: 400,
        message: "获取用户信息失败",
      },
    ];
  }
});

Mock.onGet("/api/brands").reply(200, {
  code: 200,
  data: brands,
  message: "获取品牌数据成功",
});
